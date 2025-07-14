"use client";

import Image from "next/image";
import IconLogoDark from "../icons/IconLogoDark";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { isAfternoon, isEvening, isMorning } from "@/utils/timeHelpers";
import IconLogoWhite from "../icons/IconLogoWhite";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useLogin } from "@/queries/auth-queries";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { mutate: login, isLoading } = useLogin();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    login({ email, password }, {
      onError: (error: any) => {
        setLoginError(error.message || "Login failed. Please try again.");
      }
    });
  };

  return (
    <div
      className={cn(
        "h-full",
        isMorning() || isAfternoon() ? "bg-white" : "bg-[#303030]",
      )}
    >
      <header className="absolute top-0 left-0 p-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {isEvening() ? <IconLogoDark /> : <IconLogoWhite />}
        </h1>
      </header>
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="container mx-auto grid grid-cols-1 items-center lg:grid-cols-2">
          <div className="flex justify-center">
            <Image
              alt="Illustration of people interacting with charts and data visualizations"
              className="w-full max-w-lg"
              src="/login-night.png"
              width={603}
              height={446}
            />
          </div>
          <div className="flex justify-center">
            <div
              className={cn(
                "w-full max-w-md rounded-[20px] border-2 border-[#616FF5] px-8 py-12 shadow-lg 2xl:max-w-xl 2xl:px-14 2xl:py-24",
                isMorning()
                  ? "bg-[#616FF54D] text-[#303030]"
                  : isAfternoon()
                    ? "bg-[#616FF5] text-white"
                    : "bg-[#616FF54D] text-white",
              )}
            >
              <div className="text-center">
                <h2 className={cn("mb-2 text-2xl font-bold 2xl:text-3xl")}>
                  Login to Account
                </h2>
                <p className="mb-8 2xl:text-lg">
                  Please enter your email and password to continue
                </p>
              </div>
              <form onSubmit={handleLogin} className="">
                <div className="mb-4">
                  <label
                    className="mb-2 block text-sm font-medium"
                    htmlFor="email"
                  >
                    Email address:
                  </label>
                  <Input
                    className={cn(
                      "h-auto w-full rounded-2xl border px-3 py-2 focus:outline-none 2xl:rounded-[20px] 2xl:px-4 2xl:py-3",
                      isMorning()
                        ? "border-[#3C3C3C] placeholder:text-[#3C3C3C]"
                        : "border-white placeholder:text-white",
                    )}
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    type="email"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="mb-2 block text-sm font-medium"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <Input
                      className={cn(
                        "h-auto w-full rounded-2xl border px-3 py-2 pr-10 focus:outline-none 2xl:rounded-[20px] 2xl:px-4 2xl:py-3",
                        isMorning()
                          ? "border-[#3C3C3C] placeholder:text-[#3C3C3C]"
                          : "border-white placeholder:text-white",
                      )}
                      id="password"
                      name="password"
                      placeholder="Enter password"
                      type={showPassword ? "text" : "password"}
                      minLength={8}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 transform"
                    >
                      {showPassword ? (
                        <Eye className="size-4" />
                      ) : (
                        <EyeOff className="size-4" />
                      )}
                    </button>
                  </div>
                </div>
                <Button
                  className={cn(
                    "h-auto w-full rounded-[20px] px-3 py-2 font-bold transition duration-300 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none 2xl:px-4 2xl:py-3",
                    isAfternoon()
                      ? "bg-white text-[#616FF5]"
                      : "bg-[#616FF5] text-white",
                  )}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
              {loginError && (
                <p className="mt-4 text-sm text-red-500">{loginError}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
