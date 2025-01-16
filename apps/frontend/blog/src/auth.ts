import jwt, { JwtPayload } from "jsonwebtoken";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { Token } from "./app/_model/Token.model";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  session: {
    strategy: "jwt", // JWT 기반 세션
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await loginApi(
          credentials.username as string,
          credentials.password as string,
        );

        if (!authResponse.ok) {
          return null;
        }
        const user = await authResponse.json();
        const decodedToken: string | JwtPayload | null | Token = jwt.decode(
          user.access_token,
        );

        return {
          id: (decodedToken as Token).id || user.id,
          email: (decodedToken as Token).email || user.email,
          name: (decodedToken as Token).name || user.nickname,
          image: (decodedToken as Token).thumbnail || user.thumbnail,
          password: credentials.password,
          accessToken: user.access_token,
          refreshToken: user.refresh_token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // 사용자 정보가 존재하면 JWT에 추가
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      // JWT의 데이터를 세션 객체에 포함
      session.user.id = token.id as string;
      session.user.accessToken = token.accessToken as string;
      session.user.refreshToken = token.refreshToken as string;
      return session;
    },
  },
});

export async function loginApi(email: string, password: string) {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api.user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
}
