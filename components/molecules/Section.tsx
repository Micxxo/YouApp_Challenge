import React from "react";
import { twMerge } from "tailwind-merge";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

const Section = ({ children, className }: SectionProps) => {
  return (
    <section className={twMerge("max-w-lg mx-auto", className)}>
      {children}
    </section>
  );
};

export default Section;
