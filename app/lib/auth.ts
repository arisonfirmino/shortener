import { db } from "@/app/lib/prisma";
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        identifier: { label: "identifier", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password)
          throw new Error("Identificador e senha são obrigatórios.");

        const user = await db.user.findFirst({
          where: {
            OR: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          },
        });

        if (!user) throw new Error("Usuário não encontrado.");

        if (credentials.password !== user.password)
          throw new Error("Senha incorreta.");

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
