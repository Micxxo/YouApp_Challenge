import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React from "react";

const InterestPicker = () => {
  return (
    <div className="w-full bg-midnight-blue px-5 rounded-2xl min-h-[110px] py-5">
      <div className="flex items-center justify-between">
        <h1 className="text-sm font-bold">Interest</h1>
        <Link href={"/interest"}>
          <Icon icon="line-md:edit" color="#FFFFFF" fontSize={18} />
        </Link>
      </div>
      <div className="mt-5">
        <p className="text-white/55 font-medium text-sm">
          Add in your interest to find a better match
        </p>
      </div>
    </div>
  );
};

export default InterestPicker;
