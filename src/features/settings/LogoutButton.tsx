"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { LogoutModal } from "./LogoutModal";

const LogoutButton = () => {
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  return (
    <>
      <div className="flex w-full justify-center p-4 md:p-7">
        <Button
          onClick={() => setOpenLogoutModal(true)}
          className="w-full bg-[#FFDBDB] text-[#FF3333] hover:bg-[#FF3333] hover:text-white md:w-1/3"
        >
          Log Out
        </Button>
      </div>

      {/* Modals */}
      <LogoutModal
        isOpen={openLogoutModal}
        onClose={() => setOpenLogoutModal(false)}
      />
    </>
  );
};

export default LogoutButton;
