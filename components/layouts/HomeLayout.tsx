import React from "react";
import MainLayout from "./MainLayout";

type HomeLayoutProps = {
  children: React.ReactNode;
};

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <MainLayout>
      <div className="h-full bg-dark text-white px-5 py-10 overflow-y-auto no-scrollbar">
        {children}
      </div>
    </MainLayout>
  );
};

export default HomeLayout;
