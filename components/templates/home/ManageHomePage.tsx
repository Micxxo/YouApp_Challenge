"use client";
import HomeLayout from "@/components/layouts/HomeLayout";
import ProfileViewer from "@/components/organism/ProfileViewer";
import React, { useEffect, useState } from "react";
import ProfileEditor from "./components/ProfileEditor";
import InterestPicker from "./components/InterestPicker";

const ManageHomePage = () => {
  return (
    <HomeLayout>
      <div className="w-full h-[90%] flex flex-col">
        <p className="text-center font-semibold text-sm">@ambasing</p>
        <div className="mt-7 flex-1">
          <div className="w-full h-[30%]">
            <ProfileViewer />
          </div>
          <div className="w-full my-5 space-y-5">
            <ProfileEditor />
            <InterestPicker />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default ManageHomePage;
