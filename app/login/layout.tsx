import AuthLayout from "@/components/layouts/AuthLayout";
import React from "react";

type layoutProps = {
  children: React.ReactNode;
};

const layout = ({ children }: layoutProps) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default layout;
