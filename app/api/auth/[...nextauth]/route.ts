import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";  // use bcryptjs for Next.js
import User from "@/models/User";
import Staff from "@/models/staff";
import { dbConnect } from "@/lib/db";

// Extend Session and JWT to include role
declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    };
  }

  interface User {
    role?: string | null;
  }
}

const handler = NextAuth({
  providers: [
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
          return {
            id: "0",
            name: "Admin",
            email,
            role: "admin",
          };
        }

        // ✅ Staff collection
        const staff = await Staff.findOne({ email });
        if (staff && (await bcrypt.compare(password!, staff.password))) {
          return {
            id: staff._id.toString(),
            name: staff.name,
            email: staff.email,
            role: "staff",
          };
        }

        // ✅ Users collection
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password!, user.password))) {
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role || "customer",
          };
        }

        throw new Error("Invalid credentials");
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.role = (user as any).role || null;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };
