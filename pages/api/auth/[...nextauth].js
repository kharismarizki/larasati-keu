import prisma from "@/libs/prisma";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const user = await prisma.user.findFirst({
          where: { username: credentials.username },
        });
        if (!user) return null;
        //if valid password return null
        const isValidPassword = argon2.verify(
          user.password,
          credentials.password
        );
        if (!isValidPassword) return null;
        const accessToken = jwt.sign(
          { id: user.id, role: user.role },
          process.env.NEXTAUTH_SECRET,
          { expiresIn: "15d" }
        );
        // user.accessToken = accessToken;
        return {
          id: user.id,
          username: user.username,
          role: user.role,
          accessToken: accessToken,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      if (token) {
        session.user = token;
      }
      return session;
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 15 * 24 * 30 * 60, // 15 days
  },
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);
