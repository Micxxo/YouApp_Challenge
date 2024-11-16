import InterestLayout from "@/components/layouts/InterestLayout";
import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const layout = ({ children }: LayoutProps) => {
  return (
    <InterestLayout>
      <div className="pt-10 px-6 text-white">{children}</div>
    </InterestLayout>
  );
};

export default layout;
