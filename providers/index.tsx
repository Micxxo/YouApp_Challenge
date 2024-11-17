"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { QueryProvider } from "./QueryProvider";

type providersProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: providersProps) => {
  return (
    <SessionProvider refetchOnWindowFocus>
      <QueryProvider>{children}</QueryProvider>
    </SessionProvider>
  );
};

export default Providers;
