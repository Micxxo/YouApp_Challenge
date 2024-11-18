import Image from "next/image";
import React from "react";
import { twMerge } from "tailwind-merge";
import { Card, CardContent } from "../ui/card";
import ProfileBadge from "../molecules/ProfileBadge";
import { useProfileStore } from "../templates/home/stores/profileStore";
import { getAgeHelper } from "@/helpers/getAgeHelper";
import { useSession } from "next-auth/react";
import {
  getHoroscopeIconHelper,
  getZodiacIconHelper,
} from "@/helpers/getZodiacIconHelper";
import { getStorageDataByEmail } from "@/helpers/storageHelper";

type ProfileViewerProps = {
  className?: string;
};

const ProfileViewer = ({ className }: ProfileViewerProps) => {
  const { data: session } = useSession();
  const profileStore = useProfileStore();
  const existedPfp = getStorageDataByEmail(session?.user.email ?? "")?.pfp;
  const existedGender = getStorageDataByEmail(
    session?.user.email ?? ""
  )?.gender;
  return (
    <Card
      className={twMerge(
        "w-full h-full bg-dark-grey rounded-2xl text-white border-none",
        className
      )}
    >
      <CardContent className="relative w-full h-full p-0">
        <div className="relative w-full h-full rounded-2xl">
          {(existedPfp || profileStore.profile.picture) && (
            <Image
              src={existedPfp ?? profileStore.profile.picture ?? ""}
              layout="fill"
              alt="test"
              className="object-cover rounded-2xl"
            />
          )}
        </div>
        <div className="absolute bottom-5 left-5 space-y-2 z-[999] opacity-100">
          <h1 className="font-bold">
            @{profileStore.profile.name ?? profileStore.profile.username ?? ""}
            {profileStore.profile.birthday
              ? ", " + getAgeHelper(profileStore.profile.birthday)
              : ""}
          </h1>
          <p className="font-medium text-sm">
            {existedGender ?? profileStore.profile.gender ?? ""}
          </p>
          {profileStore.profile.zodiac && profileStore.profile.horoscope && (
            <div className="flex items-center gap-2">
              <ProfileBadge
                icon={
                  getZodiacIconHelper(
                    profileStore.profile.zodiac?.toLocaleLowerCase()
                  ) ?? ""
                }
                title={profileStore.profile.zodiac}
              />
              <ProfileBadge
                icon={getHoroscopeIconHelper(
                  profileStore.profile.horoscope?.toLocaleLowerCase()
                )}
                title={profileStore.profile.horoscope}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileViewer;
