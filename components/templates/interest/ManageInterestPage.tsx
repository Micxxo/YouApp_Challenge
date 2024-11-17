"use client";
import GlassBadge from "@/components/molecules/GlassBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useUpdateProfile } from "../home/services/fetchProfile.service";
import toastHelper from "@/helpers/toastHelper";
import { useQueryClient } from "react-query";
import { ApiResponse, ProfilePostProps } from "@/types/service";
import { useRouter } from "next/navigation";

const ManageInterestPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const getExistedData: ApiResponse<Profile> | undefined =
    queryClient.getQueryData("getProfile");
  const existedInterest = getExistedData?.data.interests;

  const [inputValue, setInputValue] = useState<string>("");
  const [selectables, setSelectables] = useState<Array<string>>(
    existedInterest ?? []
  );
  const updateProfile = useUpdateProfile();

  const handleUpdateSelectables = () => {
    setInputValue("");
    setSelectables((prev) => [...prev, inputValue]);
  };

  const alreadySelectedData = selectables.find(
    (selectable) => selectable === inputValue
  );

  const handleRemoveSelectable = (itemToRemove: string) => {
    setSelectables((prev) => prev.filter((item) => item !== itemToRemove));
  };

  const handleSubmit = async () => {
    const loadingToast = toastHelper("updating...", "loading");

    const payload: ProfilePostProps = {
      interests: selectables,
    };

    updateProfile.mutateAsync(payload, {
      onSuccess: (data) => {
        queryClient.invalidateQueries();
        router.push("/");
        toastHelper(data.message, "success", "", loadingToast);
      },
      onError: (error) => {
        console.error("Error updating profile:", error);
        toastHelper("Error updating profile", "error", "", loadingToast);
      },
    });
  };

  useEffect(() => {
    console.log(getExistedData);
  }, [getExistedData]);

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <Link href={"/"}>
          <Button className="!bg-transparent !w-fit !h-fit !p-0 flex items-center gap-1">
            <Icon icon={"ion:chevron-back"} fontSize={28} fontWeight={"bold"} />
            <p className="text-sm font-bold">Back</p>
          </Button>
        </Link>
        <Button
          onClick={handleSubmit}
          className="!bg-transparent !w-fit !h-fit !p-0"
        >
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
            {selectables.map((item, key) => {
              return (
                <GlassBadge
                  key={key}
                  onDelete={() => handleRemoveSelectable(item)}
                  title={item}
                />
              );
            })}
          </div>
          <Input
            variant="transparent"
            className="!py-2 !w-full focus-visible:ring-0 focus-visible:ring-offset-0 mt-1"
            onChange={(event) => setInputValue(event.target.value)}
            value={inputValue}
            autoFocus
          />
        </div>
        {inputValue !== "" && (
          <div
            onClick={() =>
              !alreadySelectedData ? handleUpdateSelectables() : null
            }
            className="w-full bg-[#D9D9D90F] hover:bg-white/15 duration-200 rounded-[10px] px-4 py-3 mt-3 cursor-pointer"
          >
            {alreadySelectedData ? (
              <h1 className="text-sm text-white font-semibold">
                Value already selected
              </h1>
            ) : (
              <h1 className="text-sm text-white font-semibold">{inputValue}</h1>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ManageInterestPage;
