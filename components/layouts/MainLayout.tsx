import React from "react";
import Section from "../molecules/Section";
import { Toaster } from "sonner";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Section className="h-full relative">
      {children}
      <Toaster richColors closeButton position="bottom-center" />
    </Section>
  );
};

export default MainLayout;
