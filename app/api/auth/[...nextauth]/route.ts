import checkIsEmailHelper from "@/helpers/checkIsEmailHelper";
import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        keyword: {
          label: "Email/Username",
          type: "text",
          placeholder: "Enter Email/Username",
        },
        password: { label: "Enter Password", type: "password" },
      },

      async authorize(credentials) {
        const isEmail = checkIsEmailHelper(credentials?.keyword ?? "");
        const res = await fetch(`${baseURL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: isEmail ? credentials?.keyword : "",
            username: isEmail ? "" : credentials?.keyword,
            password: credentials?.password,
          }),
        });

        localStorage.setItem("tes", JSON.stringify(res));
        const data = await res.json();
        if (data) localStorage.setItem("tes", JSON.stringify(data));

        if (res.ok && data.access_token) {
          const user: User = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            email: isEmail ? credentials?.keyword ?? "" : "dummyemail@com",
            name: isEmail ? "dummy name" : credentials?.keyword ?? "",
            access_token: data.access_token,
          };

          return user;
        } else {
          throw new Error(data.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        if (session?.user.name) token.name = session?.user.name;
        if (session?.user.email) token.email = session?.user.email;
        if (session?.user.access_token)
          token.accessToken = session?.user.access_token;
      }

      if (user) {
        token.accessToken = user.access_token;
        token.email = user.email;
        token.name = user.name;
      }

      return token;
    },
    async session({ session, token, trigger, newSession }) {
      if (token) {
        session.user = {
          name: token.name as string,
          access_token: token.accessToken as string,
          email: token.email as string,
        };
      }

      if (trigger === "update") {
        if (newSession?.user.name) session.user.name = newSession?.user.name;
        if (newSession?.user.access_token)
          session.user.access_token = newSession?.user.access_token;
        if (newSession?.user.email) session.user.email = newSession?.user.email;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
