import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter Username/Email",
        },
        password: { label: "Enter Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${baseURL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            keyword: credentials?.email,
            password: credentials?.password,
          }),
        });

        const data = await res.json();

        console.log(data);
        // if (res.ok && data.user) {
        //   const user: User = {
        //     id: data.user.id,
        //     name: data.user.fullname,
        //     email: data.user.email,
        //     role: data.user.role,
        //     division: {
        //       id: data.user.division.id,
        //     },
        //     number_handphone: data.user.number_handphone,
        //     accessToken: data.tokens.access.token,
        //     refreshToken: data.tokens.refresh.token,
        //     accessTokenExp: data.tokens.access.expires,
        //     refreshTokenExp: data.tokens.refresh.expires,
        //   };

        //   return user;
        // } else {
        //   if (res.status === 429) {
        //     throw new Error("Too many requests");
        //   }

        //   if (res.status === 401) {
        //     throw new Error("Invalid");
        //   }

        //   if (res.status === 409) {
        //     throw new Error(data.message ?? "Multi Login Detected");
        //   }
        //   return null;
        // }
        return null;
      },
    }),
  ],
  //   callbacks: {
  //     async jwt({ token, user, trigger, session }) {
  //       if (trigger === "update") {
  //         if (session?.user.name) {
  //           token.name = session?.user.name;
  //         }
  //         if (session?.user.accessToken) {
  //           token.accessToken = session?.user.accessToken;
  //         }
  //         if (session?.user.refreshToken) {
  //           token.refreshToken = session?.user.refreshToken;
  //         }
  //       }

  //       if (user) {
  //         token.id = user.id;
  //         token.accessToken = user.accessToken;
  //         token.refreshToken = user.refreshToken;
  //         token.division = user.division;
  //         token.email = user.email;
  //         token.number_handphone = user.number_handphone;
  //         token.name = user.name;
  //         token.role = user.role;
  //       }

  //       return token;
  //     },
  //     async session({ session, token, trigger, newSession }) {
  //       if (token) {
  //         session.user = {
  //           id: token.id as string,
  //           accessToken: token.accessToken as string,
  //           refreshToken: token.refreshToken as string,
  //           email: token.email as string,
  //           division: token.division as { id: string },
  //           number_handphone: token.number_handphone as string,
  //           name: token.name as string,
  //           role: token.role as string,
  //         };
  //       }

  //       if (trigger === "update") {
  //         if (newSession?.user.name) {
  //           session.user.name = newSession?.user.name;
  //         }
  //         if (newSession?.user.accessToken) {
  //           session.user.accessToken = newSession?.user.accessToken;
  //         }
  //         if (newSession?.user.refreshToken) {
  //           session.user.refreshToken = newSession?.user.refreshToken;
  //         }
  //       }

  //       return session;
  //     },
  //     async redirect({ url, baseUrl }) {
  //       if (url.startsWith("/")) return `${baseUrl}${url}`;
  //       if (new URL(url).origin === baseUrl) return url;
  //       return baseUrl;
  //     },
  //   },
  secret: process.env.NEXT_PUBLIC_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
