import InterestLayout from "@/components/layouts/InterestLayout";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React from "react";

interface layotutProps {
  children: React.ReactNode;
  onSave: () => void;
}

const layout = ({ children, onSave }: layotutProps) => {
  return (
    <InterestLayout>
      <div className="pt-10 px-6 text-white">
        <div className="flex items-center justify-between w-full">
          <Link href={"/"}>
            <Button className="!bg-transparent !w-fit !h-fit !p-0 flex items-center gap-1">
              <Icon
                icon={"ion:chevron-back"}
                fontSize={28}
                fontWeight={"bold"}
              />
              <p className="text-sm font-bold">Back</p>
            </Button>
          </Link>
          <Button
            onClick={onSave}
            className="!bg-transparent !w-fit !h-fit !p-0"
          >
            <p className="text-sm font-semibold gradient-blue-text">Save</p>
          </Button>
        </div>
        {children}
      </div>
    </InterestLayout>
  );
};

export default layout;
