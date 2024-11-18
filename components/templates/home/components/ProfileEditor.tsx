import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { profileSchema } from "../validations/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  useCreateProfile,
  useUpdateProfile,
} from "../services/fetchProfile.service";
import { ProfilePostProps } from "@/types/service";
import { useProfileStore } from "../stores/profileStore";
import toastHelper from "@/helpers/toastHelper";
import { useSession } from "next-auth/react";
import { getAgeHelper } from "@/helpers/getAgeHelper";
import { useQueryClient } from "react-query";
import {
  getStorageDataByEmail,
  updateStoreDataByEmail,
} from "@/helpers/storageHelper";

const ProfileEditor = () => {
  const queryClient = useQueryClient();
  const { data: session, update: sessionUpdate } = useSession();

  const existedPfp = getStorageDataByEmail(session?.user.email ?? "")?.pfp;
  const existedGender = getStorageDataByEmail(
    session?.user.email ?? ""
  )?.gender;

  const [accordionItemOpen, setAccordionOpenItem] = useState<
    string | undefined
  >(undefined);
  const profileStore = useProfileStore();
  const [profileImage, setProfileImage] = useState<string | null>(
    existedPfp ?? profileStore.profile.picture ?? null
  );
  const updateProfile = useUpdateProfile();

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      profile: existedPfp ?? profileStore.profile.picture ?? "",
      birthday: profileStore.profile.birthday
        ? new Date(profileStore.profile.birthday)
        : undefined,
      gender: existedGender ?? profileStore.profile.gender ?? "",
      height: parseInt(profileStore.profile.height) ?? undefined,
      name: profileStore.profile.name ?? "",
      weight: parseInt(profileStore.profile.weight) ?? "",
      zodiac: profileStore.profile.zodiac ?? "",
      horoscope: profileStore.profile.horoscope ?? "",
    },
  });

  const isProfileCreated =
    profileStore.profile.birthday &&
    profileStore.profile.horoscope !== "" &&
    profileStore.profile.zodiac !== "" &&
    profileStore.profile.height !== "" &&
    profileStore.profile.weight !== "";

  const handleProfileSubmit = (value: z.infer<typeof profileSchema>) => {
    const loadingToast = toastHelper("updating...", "loading");

    const payload: ProfilePostProps = {
      birthday: format(new Date(value.birthday.toString()), "MM-dd-yyyy"),
      height: value.height,
      interests: profileStore.profile.interests,
      username: value.name,
      name: value.name,
      weight: value.weight,
    };

    updateProfile.mutateAsync(payload, {
      onSuccess: (data) => {
        const dataToStore: Profile = {
          ...data.data,
          gender: profileForm.getValues().gender,
          picture: profileForm.getValues().profile,
        };

        profileStore.setProfile(dataToStore);
        updateStoreDataByEmail(session?.user.email ?? "", {
          gender: dataToStore.gender ?? "",
          pfp: dataToStore.picture ?? "",
        });

        sessionUpdate({
          ...session,
          user: {
            ...session?.user,
            gender: dataToStore.gender,
          },
        });

        queryClient.invalidateQueries();
        toastHelper(data.message, "success", "", loadingToast);
      },
      onError: (error) => {
        console.error("Error updating profile:", error);
        toastHelper("Error updating profile", "error", "", loadingToast);
      },
    });
  };

  return (
    <Form {...profileForm}>
      <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)}>
        <Accordion
          type="single"
          value={accordionItemOpen}
          onValueChange={setAccordionOpenItem}
          collapsible={accordionItemOpen === "profile" ? false : true}
        >
          <AccordionItem
            value="profile"
            className="border-none bg-midnight-blue px-5 rounded-2xl"
          >
            <AccordionTrigger
              className="items-start !no-underline py-4"
              icon={
                accordionItemOpen === "profile" ? (
                  <div className="flex items-center gap-2">
                    <Button
                      type="submit"
                      className="!p-0 !h-fit !w-fit !bg-transparent"
                    >
                      <p className="gradient-golden-text text-xs font-medium">
                        Save & Update
                      </p>
                    </Button>
                    <div className="w-[2px] h-2 bg-gray-200 "></div>
                    <Button
                      type="button"
                      onClick={() => setAccordionOpenItem("")}
                      className="!p-0 !h-fit !w-fit !bg-transparent"
                    >
                      <p className="text-red-500 text-xs font-medium">Cancel</p>
                    </Button>
                  </div>
                ) : (
                  <Icon icon="line-md:edit" color="#FFFFFF" fontSize={18} />
                )
              }
            >
              <div>
                <h1 className="text-sm font-bold">About</h1>

                {accordionItemOpen !== "profile" && (
                  <>
                    {isProfileCreated ? (
                      <div className="space-y-2 mt-3">
                        <h1 className="text-xs font-medium text-white/30">
                          Birthday:{" "}
                          <span className="text-white font-medium text-xs">
                            {format(
                              new Date(
                                profileStore.profile.birthday.toString()
                              ),
                              "MM-dd-yyyy"
                            )}{" "}
                            (Age {getAgeHelper(profileStore.profile.birthday)})
                          </span>
                        </h1>
                        <h1 className="text-xs font-medium text-white/30">
                          Horoscope:{" "}
                          <span className="text-white font-medium text-xs">
                            {profileStore.profile.horoscope}
                          </span>
                        </h1>
                        <h1 className="text-xs font-medium text-white/30">
                          Zodiac:{" "}
                          <span className="text-white font-medium text-xs">
                            {profileStore.profile.zodiac}
                          </span>
                        </h1>
                        <h1 className="text-xs font-medium text-white/30">
                          Height:{" "}
                          <span className="text-white font-medium text-xs">
                            {profileStore.profile.height} cm
                          </span>
                        </h1>
                        <h1 className="text-xs font-medium text-white/30">
                          Weight:{" "}
                          <span className="text-white font-medium text-xs">
                            {profileStore.profile.weight}
                          </span>
                        </h1>
                      </div>
                    ) : (
                      <div className="mt-3">
                        <p className="font-medium text-sm text-white/50">
                          Add in your to help others know you better
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className={"pt-4"}>
              <div className="space-y-4">
                <FormField
                  control={profileForm.control}
                  name="profile"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center w-full gap-5 relative">
                          <FormLabel
                            htmlFor="profile"
                            className="bg-white/10 relative flex items-center justify-center rounded-[17px] w-14 h-14 cursor-pointer"
                          >
                            {profileImage ? (
                              <Image
                                src={profileImage}
                                layout="fill"
                                className="object-cover rounded-[17px]"
                                alt="profile"
                              />
                            ) : (
                              <Icon
                                icon="fluent:add-24-filled"
                                fontSize={28}
                                color="#94783E"
                              />
                            )}
                          </FormLabel>
                          <FormLabel
                            htmlFor="profile"
                            className="text-xs w-32 font-medium text-white cursor-pointer "
                          >
                            {profileImage ? "Update image" : "Add image"}
                          </FormLabel>
                          <input
                            id="profile"
                            type="file"
                            accept=".png,.jpg,.jpeg,.webp"
                            className="absolute left-0 -z-50 opacity-0"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = () => {
                                  const base64 = reader.result as string;
                                  setProfileImage(base64);
                                  field.onChange(base64);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            onBlur={field.onBlur}
                            name={field.name}
                            ref={field.ref}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={profileForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center w-full">
                          <FormLabel
                            htmlFor="name"
                            className="text-xs w-32 font-medium text-white/35"
                          >
                            Display name:
                          </FormLabel>
                          <Input
                            id="name"
                            type="text"
                            variant="secondary"
                            containerClass="flex-1"
                            className="py-3 px-4 text-right"
                            placeholder="Enter name"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-right" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center w-full">
                        <FormLabel className="text-xs w-32 font-medium text-white/35">
                          Gender
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                role="combobox"
                                className={cn(
                                  "flex-1 justify-end !bg-[#D9D9D90F] border !border-[#FFFFFF38] rounded-[8px] !h-fit py-3 capitalize",
                                  field.value !== ""
                                    ? "text-white"
                                    : "!text-[#575A5C]"
                                )}
                              >
                                {field.value !== "" ? field.value : "Gender"}
                                <ChevronsUpDown className="opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-[300px] p-0 !bg-[#D9D9D90F] border !border-[#FFFFFF38] rounded-[8px] !text-[#575A5C]">
                            <Command className="!bg-[#D9D9D90F] border !border-[#FFFFFF38]">
                              <CommandList>
                                <CommandGroup>
                                  <CommandItem
                                    value={"male"}
                                    className="text-white"
                                    onSelect={() => {
                                      profileForm.setValue("gender", "male");
                                    }}
                                  >
                                    Male
                                    {field.value === "male" && (
                                      <Check className="ml-auto" />
                                    )}
                                  </CommandItem>
                                  <CommandItem
                                    value={"female"}
                                    className="text-white"
                                    onSelect={() => {
                                      profileForm.setValue("gender", "female");
                                    }}
                                  >
                                    Female
                                    {field.value === "female" && (
                                      <Check className="ml-auto" />
                                    )}
                                  </CommandItem>
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </div>
                      <FormMessage className="text-right" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="birthday"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center w-full">
                        <FormLabel className="text-xs w-32 font-medium text-white/35">
                          Birthday
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                className={cn(
                                  "flex-1 py-3 !h-fit justify-end text-left font-normal !bg-[#D9D9D90F] border !border-[#FFFFFF38] rounded-[8px]",
                                  field.value ? "text-white" : "!text-[#575A5C]"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>HH MM YYYY</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(value) =>
                                value && profileForm.setValue("birthday", value)
                              }
                              initialFocus
                              defaultMonth={
                                field.value || new Date("2000-01-01")
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <FormMessage className="text-right" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="horoscope"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center w-full">
                          <Label
                            htmlFor="horoscope"
                            className="text-xs w-32 font-medium text-white/35"
                          >
                            Horoscope
                          </Label>
                          <Input
                            id="horoscope"
                            type="text"
                            variant="secondary"
                            containerClass="flex-1"
                            disabled
                            className="py-3 px-4 !w-full text-right"
                            placeholder="Horoscope"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-right" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="zodiac"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center w-full">
                          <Label
                            htmlFor="zodiac"
                            className="text-xs w-32 font-medium text-white/35"
                          >
                            Zodiac
                          </Label>
                          <Input
                            id="zodiac"
                            type="text"
                            variant="secondary"
                            containerClass="flex-1"
                            className="py-3 px-4 !w-full text-right"
                            placeholder="Zodiac"
                            disabled
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-right" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center w-full">
                          <Label
                            htmlFor="height"
                            className="text-xs w-32 font-medium text-white/35"
                          >
                            Height
                          </Label>
                          <div className="flex items-center flex-1">
                            <Input
                              id="height"
                              type="number"
                              variant="secondary"
                              containerClass="flex-1"
                              className="py-3 pl-4 pr-0 !w-full text-right !rounded-tr-none !rounded-br-none !border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                              placeholder="Height"
                              value={field.value || ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(
                                  value === "" ? undefined : Number(value)
                                );
                              }}
                            />
                            <div
                              className={cn(
                                "rounded-tr-[8px] rounded-br-[8px] bg-[#D9D9D90F] border border-[#FFFFFF38] py-3 px-2 !border-l-0",
                                field.value === undefined
                                  ? "text-[#565A5C]"
                                  : "text-white"
                              )}
                            >
                              cm
                            </div>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-right" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center w-full">
                          <Label
                            htmlFor="weight"
                            className="text-xs w-32 font-medium text-white/35"
                          >
                            Weight
                          </Label>
                          <div className="flex items-center flex-1">
                            <Input
                              id="weight"
                              type="number"
                              variant="secondary"
                              containerClass="flex-1"
                              className="py-3 pl-4 pr-0 !w-full text-right !rounded-tr-none !rounded-br-none !border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                              placeholder="weight"
                              value={field.value || ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(
                                  value === "" ? undefined : Number(value)
                                );
                              }}
                            />
                            <div
                              className={cn(
                                "rounded-tr-[8px] rounded-br-[8px] bg-[#D9D9D90F] border border-[#FFFFFF38] py-3 px-2 !border-l-0",
                                field.value === undefined
                                  ? "text-[#565A5C]"
                                  : "text-white"
                              )}
                            >
                              kg
                            </div>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-right" />
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form>
    </Form>
  );
};

export default ProfileEditor;
