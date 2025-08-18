"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import logoutImg from "@/assets/setting/logout.png";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const onLogout = () => {
    console.log("Log out");
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="gap-0 rounded-2xl border-0 bg-white p-0 shadow-xl dark:bg-gray-800 sm:max-w-md"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="dark:hover:gray-600 absolute right-4 top-4 z-10 cursor-pointer rounded-full p-1 transition-colors hover:bg-gray-100"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        {/* Modal content */}
        <div className="flex flex-col items-center px-6 py-8 text-center">
          {/* Logout Icon */}
          <div className="relative mb-4">
            <div className="h-20 w-20 overflow-hidden rounded-full">
              <Image
                src={logoutImg}
                alt="logout"
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Confirmation text */}
          <p className="mb-6 text-lg font-medium text-black dark:text-white">
            Do you want to log out?
          </p>

          {/* Action buttons */}
          <div className="flex w-full gap-3">
            <Button
              onClick={onClose}
              variant="secondary"
              className="flex-1 cursor-pointer rounded-full border-0 bg-gray-400 py-3 font-medium text-white hover:bg-gray-500"
            >
              Cancel
            </Button>
            <Button
              onClick={onLogout}
              className="flex-1 cursor-pointer rounded-full border-0 bg-red-500 py-3 font-medium text-white hover:bg-red-600"
            >
              Log out
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
