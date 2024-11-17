"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

type providersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: providersProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
