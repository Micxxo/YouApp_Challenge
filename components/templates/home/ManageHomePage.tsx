"use client";
import HomeLayout from "@/components/layouts/HomeLayout";
import ProfileViewer from "@/components/organism/ProfileViewer";
import React, { useEffect, useState } from "react";
import ProfileEditor from "./components/ProfileEditor";
import InterestPicker from "./components/InterestPicker";
import { signIn, signOut, useSession } from "next-auth/react";
import { useGetProfile } from "./services/fetchProfile.service";
import { Skeleton } from "@/components/ui/skeleton";
import { useProfileStore } from "./stores/profileStore";
import {
  getStorageDataByEmail,
  updateStoreDataByEmail,
} from "@/helpers/storageHelper";
import { Button } from "@/components/ui/button";

const ManageHomePage = () => {
  const { data: session, status, update } = useSession();
  const profileStore = useProfileStore();

  const { data, isFetching, isLoading } = useGetProfile({
    enabled: status === "authenticated",
  });

  useEffect(() => {
    if (data?.data && session) {
      update({
        ...session,
        user: {
          ...session.user,
          name: data.data.username,
          email: data.data.email,
        },
      });

      profileStore.setProfile(data.data);
      const existedData = getStorageDataByEmail(data.data.email);

      if (!existedData) {
        updateStoreDataByEmail(data.data.email, {
          email: data.data.email,
          gender: "",
          pfp: "",
        });
      }
    }
  }, [data]);

  return (
    <HomeLayout>
      <div className="w-full h-[90%] flex flex-col">
        {isFetching || isLoading || status === "loading" ? (
          <Skeleton className="h-5 w-20 mx-auto relative" />
        ) : (
          <div className="flex items-center justify-between w-[60%] ml-auto pr-3">
            <p className="text-center font-semibold text-sm">
              @{data?.data.name ?? data?.data.username ?? ""}
            </p>

            <Button
              type="button"
              onClick={() => signOut()}
              className="!p-0 !h-fit !w-fit !bg-transparent"
            >
              <p className="text-red-500 text-xs font-medium">Signout</p>
            </Button>
          </div>
        )}
        <div className="mt-7 flex-1">
          <div className="w-full h-[30%]">
            {isFetching || isLoading || status === "loading" ? (
              <Skeleton className="w-full h-full rounded-xl" />
            ) : (
              <ProfileViewer />
            )}
          </div>
          <div className="w-full my-5 space-y-5">
            {isFetching || isLoading || status === "loading" ? (
              <Skeleton className="w-full h-20 rounded-xl" />
            ) : (
              <ProfileEditor />
            )}
            {isFetching || isLoading || status === "loading" ? (
              <Skeleton className="w-full h-20 rounded-xl" />
            ) : (
              <InterestPicker />
            )}
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default ManageHomePage;
