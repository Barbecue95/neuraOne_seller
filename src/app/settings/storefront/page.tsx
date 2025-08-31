"use client";

import { BannersForm } from "@/components/StoreFront/Banner";
import { PrivacyPolicyForm } from "@/components/StoreFront/PrivacyPloicy";
import SideTab from "@/components/StoreFront/SideTab";
import { StoreInformationForm } from "@/components/StoreFront/StoreInformation";
import SubNavbar from "@/components/SubNavbar";
import { useIsMobile } from "@/hooks/use-mobile";
import React, { useState } from "react";

/**
 * Store Front Settings page component.
 * Displays storefront settings.
 *
 * @returns {React.ReactElement} The storefront setting page UI.
 */
export default function StoreFrontPage(): React.ReactElement {
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const isMobile = useIsMobile();
  return (
    <div className="h-full">
      <SubNavbar title="Storefront Settings" />

      {!isMobile ? (
        <div className="relative grid grid-cols-1 gap-5 px-8 md:grid-cols-3">
          <div className="sticky top-20 col-span-1">
            <SideTab
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </div>
          <div className="col-span-2">
            {selectedTab === 1 && <StoreInformationForm />}
            {selectedTab === 2 && <PrivacyPolicyForm />}
            {selectedTab === 3 && <BannersForm />}
          </div>
        </div>
      ) : (
        <div className="flex flex-col space-y-5 px-5">
          <StoreInformationForm />
          <PrivacyPolicyForm />
          <BannersForm />
        </div>
      )}
    </div>
  );
}
