import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import Staff from "@/models/staff";
import { dbConnect } from "@/lib/db";
import { Session } from "next-auth";

// Extend the default Session type to include the role property
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

        // Hardcoded admin
        if (email === "admin@gmail.com" && password === "admin1234") {
          return { id: "0", name: "Admin", email, role: "admin" };
        }

        // Staff lookup
        const staff = await Staff.findOne({ email });
        if (staff && (await bcrypt.compare(password!, staff.password))) {
          return { id: staff._id.toString(), name: staff.name, email: staff.email, role: "staff" };
        }

        // User lookup
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password!, user.password))) {
          return { id: user._id.toString(), name: user.name, email: user.email, role: user.role || "customer" };
        }

        throw new Error("Invalid credentials");
      },
    }),
  ],

  pages: {
    signIn: "/signup", // <--- ensure NextAuth redirects to your signup page (not the default)
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = (user as any).name;
        token.email = (user as any).email;
        token.role = (user as any).role || null;
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
