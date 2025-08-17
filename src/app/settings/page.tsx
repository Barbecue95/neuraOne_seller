import React from "react";
import UserInfo from "@/features/settings/UserInfo";
import SubNavbar from "@/components/SubNavbar";
import ChangePassword from "@/features/settings/ChangePassword";
import ChangePerferences from "@/features/settings/ChangePerferences";
import LogoutButton from "@/features/settings/LogoutButton";

/**
 * Account Settings page component.
 * Displays user profile and settings options.
 *
 * @returns {React.ReactElement} The settings page UI.
 */
export default function Home(): React.ReactElement {
  return (
    <div className="h-full">
      <SubNavbar title="Account Settings" />
      <div className="space-y-2.5 px-4 md:px-8">
        <UserInfo />
        <ChangePassword />
        <ChangePerferences />
      </div>
      <LogoutButton />
    </div>
  );
}
