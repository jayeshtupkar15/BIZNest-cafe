import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import Staff from "@/models/staff";
import { dbConnect } from "@/lib/db";

// Extend the default Session type to include role
interface CustomSession extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string | null;
  };
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const email = credentials?.email;
        const password = credentials?.password;

        // ✅ Hardcoded Admin
        if (email === "admin@gmail.com" && password === "admin1234") {
          return { id: "0", name: "Admin", email, role: "admin" };
        }

        // ✅ Staff lookup
        const staff = await Staff.findOne({ email });
        if (staff && staff.password && (await bcrypt.compare(password!, staff.password))) {
          return {
            id: staff._id.toString(),
            name: staff.name,
            email: staff.email,
            role: "staff",
          };
        }

        // ✅ User lookup
        const user = await User.findOne({ email });
        if (user && user.password && (await bcrypt.compare(password!, user.password))) {
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role || "customer",
          };
        }

        return null; // ❌ invalid credentials
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = (user as any).name;
        token.email = (user as any).email;
        token.role = (user as any).role;

        // 🔑 Skip DB role lookup if it's hardcoded admin
        if (token.email === "admin@gmail.com") {
          token.role = "admin";
          return token;
        }

        await dbConnect();
        const dbUser = await User.findOne({ email: token.email });
        const dbStaff = await Staff.findOne({ email: token.email });

        if (dbUser) {
          token.role = dbUser.role || "customer";
        } else if (dbStaff) {
          token.role = "staff";
        } else {
          // If new Google/Facebook login → create customer
          await User.create({
            name: token.name,
            email: token.email,
            password: null,
            role: "customer",
          });
          token.role = "customer";
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session as CustomSession).user.name = token.name as string;
        (session as CustomSession).user.email = token.email as string;
        (session as CustomSession).user.role = token.role as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };
