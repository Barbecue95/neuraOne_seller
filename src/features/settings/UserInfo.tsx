"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/store/hooks";
import type { User } from "@/types/users.types";
import { Button } from "@/components/ui/button";

const UserInfo = () => {
  const user: User = useAppSelector((state) => state.user);
  return (
    <div className="bg-card w-full rounded-[20px]">
      <h2 className="border-b p-5 text-xl font-medium">Personal Information</h2>
      <div className="flex h-full w-full flex-col gap-5 px-5 py-4 md:flex-row md:gap-14 md:py-10 md:pl-10">
        <div className="flex h-full w-full flex-col items-center gap-7 md:w-1/4">
          <Avatar className="size-44 border ">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
          <Button className="w-52">Change photo</Button>
        </div>
        <div className="grid h-full w-full grid-cols-1 gap-y-1 space-y-4 md:w-3/4 md:grid-cols-2 md:gap-x-7 md:gap-y-4">
          <div className="flex flex-col space-y-1 md:space-y-2.5">
            <label className="text-lg font-medium text-[#303030] dark:text-white">
              Name
            </label>
            <input
              className="h-auto rounded-[20px] border border-[#A1A1A1] p-3 text-lg font-normal text-[#A1A1A1]"
              placeholder="Name"
              value={user?.name}
            />
          </div>
          <div className="flex flex-col space-y-1 md:space-y-2.5">
            <label className="text-lg font-medium text-[#303030] dark:text-white">
              Phone Number
            </label>
            <input
              className="h-auto rounded-[20px] border border-[#A1A1A1] p-3 text-lg font-normal text-[#A1A1A1]"
              placeholder="Name"
              value={user?.phoneNumber?.toString()}
            />
          </div>
          <div className="flex flex-col space-y-1 md:space-y-2.5">
            <label className="text-lg font-medium text-[#303030] dark:text-white">
              Email
            </label>
            <input
              className="h-auto rounded-[20px] border border-[#A1A1A1] p-3 text-lg font-normal text-[#A1A1A1]"
              placeholder="Name"
              value={user?.email}
            />
          </div>
          <div className="col-span-1 flex w-full justify-end md:col-span-2">
            <Button className="w-36">Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
