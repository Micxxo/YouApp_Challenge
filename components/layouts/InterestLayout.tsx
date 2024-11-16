import React from "react";
import MainLayout from "./MainLayout";

type interestLayoutProps = {
  children: React.ReactNode;
};

const InterestLayout = ({ children }: interestLayoutProps) => {
  return (
    <MainLayout>
      <div className="bg-auth-radial h-full overflow-y-auto no-scrollbar">
        {children}
      </div>
    </MainLayout>
  );
};

export default InterestLayout;
