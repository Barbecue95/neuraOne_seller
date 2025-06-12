"use client";

import { data as rolesList } from "@/features/roles/Table/dummy-data";
import { usersSchema } from "@/features/roles/userRolesSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { z } from "zod/v4";

export default function page() {
  const params = useParams();

  const form = useForm({
    resolver: zodResolver(usersSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      rolesId: Number(params.id),
    },
  });
  const [role] = rolesList.filter((role) => role.id === Number(params.id)) || [
    {
      id: 0,
      name: "",
      TotalUsers: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  const onSubmit = (data: z.infer<typeof usersSchema>) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-row gap-4 p-5"
      >
        <div className="bg-accent flex w-1/2 flex-col gap-4 p-5">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
            User Details
          </h2>
          <div className="flex flex-col items-center gap-4">
            <div className="bg-primary size-32 rounded-full" />
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormControl>
                    <Input {...field} placeholder="Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormControl>
                    <Input {...field} placeholder="Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phone"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormControl>
                    <Input {...field} placeholder="Phone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem className="w-1/2">
              <FormControl>
                <Input
                  placeholder="Roles"
                  defaultValue={`Role (${role.name})`}
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            <div className="flex w-1/2 flex-row items-center justify-between gap-2">
              <Button variant="outline" className="w-1/2">
                Cancel
              </Button>
              <Button type="submit" className="w-1/2">
                Save
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-accent flex w-1/2 flex-col gap-4 p-5">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Permission
          </h2>
          <div className="bg-accent-foreground text-accent px-5 py-2.5">
            <div className="w-full">
              <h3 className="mb-2 scroll-m-20 text-lg font-semibold tracking-tight">
                DashBoard
              </h3>
              <div className="flex flex-row justify-between gap-2 px-5 py-2">
                <div className="flex flex-row items-center text-lg capitalize">
                  <Checkbox className="border-accent border" />
                  &nbsp;View
                </div>
                <div className="flex flex-row items-center text-lg capitalize">
                  <Checkbox className="border-accent border" />
                  &nbsp;Create&nbsp;/&nbsp;Edit
                </div>
                <div className="flex flex-row items-center text-lg capitalize">
                  <Checkbox className="border-accent border" />
                  &nbsp;Delete
                </div>
              </div>
              <Separator className="bg-accent" />
            </div>
            <div className="w-full">
              <h3 className="mb-2 scroll-m-20 text-lg font-semibold tracking-tight">
                DashBoard
              </h3>
              <div className="flex flex-row justify-between gap-2 px-5 py-2">
                <div className="flex flex-row items-center text-lg capitalize">
                  <Checkbox className="border-accent border" />
                  &nbsp;View
                </div>
                <div className="flex flex-row items-center text-lg capitalize">
                  <Checkbox className="border-accent border" />
                  &nbsp;Create&nbsp;/&nbsp;Edit
                </div>
                <div className="flex flex-row items-center text-lg capitalize">
                  <Checkbox className="border-accent border" />
                  &nbsp;Delete
                </div>
              </div>
              <Separator className="bg-accent" />
            </div>
            <div className="w-full">
              <h3 className="mb-2 scroll-m-20 text-lg font-semibold tracking-tight">
                DashBoard
              </h3>
              <div className="flex flex-row justify-between gap-2 px-5 py-2">
                <div className="flex flex-row items-center text-lg capitalize">
                  <Checkbox className="border-accent border" />
                  &nbsp;View
                </div>
                <div className="flex flex-row items-center text-lg capitalize">
                  <Checkbox className="border-accent border" />
                  &nbsp;Create&nbsp;/&nbsp;Edit
                </div>
                <div className="flex flex-row items-center text-lg capitalize">
                  <Checkbox className="border-accent border" />
                  &nbsp;Delete
                </div>
              </div>
              <Separator className="bg-accent" />
            </div>
            <div className="w-full">
              <h3 className="mb-2 scroll-m-20 text-lg font-semibold tracking-tight">
                DashBoard
              </h3>
              <div className="flex flex-row justify-between gap-2 px-5 py-2">
                <div className="flex flex-row items-center text-lg capitalize">
                  <Checkbox className="border-accent border" />
                  &nbsp;View
                </div>
                <div className="flex flex-row items-center text-lg capitalize">
                  <Checkbox className="border-accent border" />
                  &nbsp;Create&nbsp;/&nbsp;Edit
                </div>
                <div className="flex flex-row items-center text-lg capitalize">
                  <Checkbox className="border-accent border" />
                  &nbsp;Delete
                </div>
              </div>
              <Separator className="bg-accent" />
            </div>
            <div className="w-full">
              <h3 className="mb-2 scroll-m-20 text-lg font-semibold tracking-tight">
                DashBoard
              </h3>
              <div className="flex flex-row justify-between gap-2 px-5 py-2">
                <div className="flex flex-row items-center text-lg capitalize">
                  <Checkbox className="border-accent border" />
                  &nbsp;View
                </div>
                <div className="flex flex-row items-center text-lg capitalize">
                  <Checkbox className="border-accent border" />
                  &nbsp;Create&nbsp;/&nbsp;Edit
                </div>
                <div className="flex flex-row items-center text-lg capitalize">
                  <Checkbox className="border-accent border" />
                  &nbsp;Delete
                </div>
              </div>
              <Separator className="bg-accent" />
            </div>
            <div className="w-full">
              <h3 className="mb-2 scroll-m-20 text-lg font-semibold tracking-tight">
                DashBoard
              </h3>
              <div className="flex flex-row justify-between gap-2 px-5 py-2">
                <div className="flex flex-row items-center text-lg capitalize">
                  <Checkbox className="border-accent border" />
                  &nbsp;View
                </div>
                <div className="flex flex-row items-center text-lg capitalize">
                  <Checkbox className="border-accent border" />
                  &nbsp;Create&nbsp;/&nbsp;Edit
                </div>
                <div className="flex flex-row items-center text-lg capitalize">
                  <Checkbox className="border-accent border" />
                  &nbsp;Delete
                </div>
              </div>
              <Separator className="bg-accent" />
            </div>
            <div className="w-full">
              <h3 className="mb-2 scroll-m-20 text-lg font-semibold tracking-tight">
                DashBoard
              </h3>
              <div className="flex flex-row justify-between gap-2 px-5 py-2">
                <div className="flex flex-row items-center text-lg capitalize">
                  <Checkbox className="border-accent border" />
                  &nbsp;View
                </div>
                <div className="flex flex-row items-center text-lg capitalize">
                  <Checkbox className="border-accent border" />
                  &nbsp;Create&nbsp;/&nbsp;Edit
                </div>
                <div className="flex flex-row items-center text-lg capitalize">
                  <Checkbox className="border-accent border" />
                  &nbsp;Delete
                </div>
              </div>
              <Separator className="bg-accent" />
            </div>
            <div className="w-full">
              <h3 className="mb-2 scroll-m-20 text-lg font-semibold tracking-tight">
                DashBoard
              </h3>
              <div className="flex flex-row justify-between gap-2 px-5 py-2">
                <div className="flex flex-row items-center text-lg capitalize">
                  <Checkbox className="border-accent border" />
                  &nbsp;View
                </div>
                <div className="flex flex-row items-center text-lg capitalize">
                  <Checkbox className="border-accent border" />
                  &nbsp;Create&nbsp;/&nbsp;Edit
                </div>
                <div className="flex flex-row items-center text-lg capitalize">
                  <Checkbox className="border-accent border" />
                  &nbsp;Delete
                </div>
              </div>
              <Separator className="bg-accent" />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
