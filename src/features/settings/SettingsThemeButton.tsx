"use client";
import React from "react";

const SettingsThemeButton = () => {
  return (
    <button
      className="dark:border-accent-foreground border-secondary-foreground hover:bg-accent w-full border px-4 py-2 text-left"
      onClick={() => {
        const theme =
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("theme="))
            ?.split("=")[1] === "true";
        console.log(theme);

        document.cookie = `theme=${!theme}; path=/; max-age=31536000`;
        window.location.reload();
      }}
    >
      <span className="scroll-m-20 text-xl font-semibold tracking-tight">
        Light/Dark
      </span>
    </button>
  );
};

export default SettingsThemeButton;
