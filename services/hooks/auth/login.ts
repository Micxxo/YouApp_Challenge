import { signIn } from "next-auth/react";

type loginProps = {
  keyword: string;
  password: string;
};

export const loginHooks = async ({ keyword, password }: loginProps) => {
  const signInPromise = signIn("credentials", {
    redirect: false,
    keyword: keyword,
    password: password,
  });

  localStorage.setItem("tes", JSON.stringify(signInPromise));
  return signInPromise;
};
