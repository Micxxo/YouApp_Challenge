import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";
import { Card, CardContent } from "../ui/card";
import ProfileBadge from "../molecules/ProfileBadge";

type ProfileViewerProps = {
  className?: string;
};

const ProfileViewer = ({ className }: ProfileViewerProps) => {
  return (
    <Card
      className={twMerge(
        "w-full h-full bg-dark-grey rounded-2xl text-white border-none",
        className
      )}
    >
      <CardContent className="relative w-full h-full p-0">
        <div className="relative w-full h-full rounded-2xl">
          {/* <Image
            src={"/images/icons/test.png"}
            layout="fill"
            alt="test"
            className="object-cover rounded-2xl"
          /> */}
        </div>
        <div className="absolute bottom-5 left-5 space-y-2 z-[9999] opacity-100">
          <h1 className="font-bold">@ambasing, 28</h1>
          <p className="font-medium text-sm">Male</p>
          <div className="flex items-center"></div>
          <ProfileBadge icon="" title="Muwani" />
          <ProfileBadge icon="" title="Muwani" className="ml-3" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileViewer;
