import React from "react";
import UserInfo from "@/features/settings/UserInfo";
import SettingsThemeButton from "@/features/settings/SettingsThemeButton";
import SubNavbar from "@/components/SubNavbar";

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
      <UserInfo />
      <div className="flex flex-col gap-2 px-5 py-2.5">
        <div className="dark:border-accent-foreground border-secondary-foreground w-full border px-4 py-2">
          <span className="scroll-m-20 text-xl font-semibold tracking-tight">
            Change Password
          </span>
        </div>
        <div className="dark:border-accent-foreground border-secondary-foreground w-full border px-4 py-2">
          <span className="scroll-m-20 text-xl font-semibold tracking-tight">
            Language
          </span>
        </div>
        <SettingsThemeButton />
        <div className="dark:border-accent-foreground border-secondary-foreground w-full border px-4 py-2">
          <span className="scroll-m-20 text-xl font-semibold tracking-tight">
            Log out
          </span>
        </div>
        <div className="dark:border-accent-foreground border-secondary-foreground w-full border px-4 py-2">
          <span className="scroll-m-20 text-xl font-semibold tracking-tight">
            Delete Account
          </span>
        </div>
      </div>
    </div>
  );
}
