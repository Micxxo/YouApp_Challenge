import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    name: string;
    email: string;
    access_token: string;
  }

  interface Session {
    user: {
      name: string;
      email: string;
      access_token: string;
    };
    access_token: string;
  }

  interface JWT {
    accessToken: string;
    user: {
      name: string;
      email: string;
    };
  }
}
