import React from "react";
import { Badge } from "../ui/badge";
import { twMerge } from "tailwind-merge";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";

interface GlassBadge {
  className?: string;
  title: string;
  onDelete: () => void;
}

const GlassBadge = ({ title, className, onDelete }: GlassBadge) => {
  return (
    <Badge
      className={twMerge(
        "flex items-center gap-1 !bg-[#FFFFFF1A] text-white py-5",
        className
      )}
    >
      <p className="font-semibold text-xs">{title}</p>
      <Button
        className="bg-transparent !h-fit !w-fit !p-0 hover:!bg-transparent"
        onClick={onDelete}
      >
        <Icon icon={"mdi:close"} fontSize={14} />
      </Button>
    </Badge>
  );
};

export default GlassBadge;
