"use client";
import GlassBadge from "@/components/molecules/GlassBadge";
import { Button } from "@/components/ui/button";
// import GlassBadge from "@/components/molecules/glassBadge";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React from "react";

const ManageInterestPage = () => {
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <Link href={"/"}>
          <Button className="!bg-transparent !w-fit !h-fit !p-0 flex items-center gap-1">
            <Icon icon={"ion:chevron-back"} fontSize={28} fontWeight={"bold"} />
            <p className="text-sm font-bold">Back</p>
          </Button>
        </Link>
        <Button className="!bg-transparent !w-fit !h-fit !p-0">
          <p className="text-sm font-semibold gradient-blue-text">Save</p>
        </Button>
      </div>
      <div className="pt-20">
        <h1 className="text-sm font-bold gradient-golden-text">
          Tell everyone about yourself
        </h1>
        <h1 className="font-bold text-xl mt-2 text-white">
          What interest you?
        </h1>
        <div className="mt-8 w-full bg-[#D9D9D90F] rounded-[10px] px-4 py-3">
          <div className="flex flex-wrap gap-1">
            <GlassBadge onDelete={() => console.log("hi")} title="Music" />
            <GlassBadge onDelete={() => console.log("hi")} title="Music" />
            <GlassBadge onDelete={() => console.log("hi")} title="Music" />
            <GlassBadge onDelete={() => console.log("hi")} title="Music" />
          </div>
          <Input
            variant="transparent"
            className="!py-2 !w-full focus-visible:ring-0 focus-visible:ring-offset-0 mt-1"
            autoFocus
          />
        </div>
        <div className="w-full bg-[#D9D9D90F] hover:bg-white/15 duration-200 rounded-[10px] px-4 py-3 mt-3 cursor-pointer">
          <h1 className="text-sm text-white font-semibold">Music</h1>
        </div>
      </div>
    </>
  );
};

export default ManageInterestPage;
