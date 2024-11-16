import React from "react";
import MainLayout from "./MainLayout";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <MainLayout>
      <div className="bg-auth-radial h-full pt-40 px-5 overflow-y-auto no-scrollbar">
        {children}
      </div>
    </MainLayout>
  );
};

export default AuthLayout;
