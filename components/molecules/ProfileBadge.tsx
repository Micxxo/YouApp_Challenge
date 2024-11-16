import React from "react";
import { Badge } from "../ui/badge";
import { Icon } from "@iconify/react/dist/iconify.js";
import { twMerge } from "tailwind-merge";

interface ProfileBadge {
  className?: string;
  icon: string;
  title: string;
}

const ProfileBadge = ({ icon, title, className }: ProfileBadge) => {
  return (
    <Badge
      className={twMerge(
        "bg-[#1E221E] backdrop-blur-[50px] text-white py-2 px-4 rounded-[100px]",
        className
      )}
    >
      <Icon icon={icon} />
      <p className="font-semibold text-sm">{title}</p>
    </Badge>
  );
};

export default ProfileBadge;
