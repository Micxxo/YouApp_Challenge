import React from "react";
import Section from "../molecules/Section";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return <Section className="h-full">{children}</Section>;
};

export default MainLayout;
