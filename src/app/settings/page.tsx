"use client";
import SubNavbar from "@/components/SubNavbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/store/hooks";

export default function Home() {
  const user = useAppSelector((state) => state.user);
  return (
    <div className="h-full">
      <SubNavbar title="Account Settings" buttons={[]} />
      <div className="w-full px-5">
        <div className="bg-accent flex h-full w-full flex-row px-5 py-10">
          <div className="flex h-full w-1/3 flex-col items-center gap-3 py-10">
            <Avatar className="size-32">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name}</AvatarFallback>
            </Avatar>
            <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              {user.name}
            </h1>
          </div>
          <div className="flex h-full w-2/3 flex-col space-y-4">
            <div className="border-primary flex w-4/5 flex-row items-center gap-4 border px-4 py-2">
              <h2 className="w-1/5 text-lg font-semibold">Name</h2>
              <p>{user.name}</p>
            </div>
            <div className="border-primary flex w-4/5 flex-row items-center gap-4 border px-4 py-2">
              <h2 className="w-1/5 text-lg font-semibold">Role</h2>
              <p>{user.role}</p>
            </div>
            <div className="border-primary flex w-4/5 flex-row items-center gap-4 border px-4 py-2">
              <h2 className="w-1/5 text-sm font-semibold lg:text-lg">
                Phone Number
              </h2>
              <p>{user.phoneNumber}</p>
            </div>
            <div className="border-primary flex w-4/5 flex-row items-center gap-4 border px-4 py-2">
              <h2 className="w-1/5 text-lg font-semibold">Email</h2>
              <p>{user.email}</p>
            </div>
            <div className="border-primary flex w-4/5 flex-row items-center gap-4 border px-4 py-2">
              <h2 className="w-1/5 text-lg font-semibold">Bio</h2>
              <p>{user.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-5 py-2.5">
        <div className="border-primary w-full border px-4 py-2">
          <span className="scroll-m-20 text-xl font-semibold tracking-tight">
            Change Password
          </span>
        </div>
        <div className="border-primary w-full border px-4 py-2">
          <span className="scroll-m-20 text-xl font-semibold tracking-tight">
            Language
          </span>
        </div>
        <div className="border-primary w-full border px-4 py-2">
          <span className="scroll-m-20 text-xl font-semibold tracking-tight">
            Light/Dark
          </span>
        </div>
        <div className="border-primary w-full border px-4 py-2">
          <span className="scroll-m-20 text-xl font-semibold tracking-tight">
            Log out
          </span>
        </div>
        <div className="border-primary w-full border px-4 py-2">
          <span className="scroll-m-20 text-xl font-semibold tracking-tight">
            Delete Account
          </span>
        </div>
      </div>
    </div>
  );
}
