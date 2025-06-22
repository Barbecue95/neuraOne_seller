"use client";
import SubNavbar from "@/components/SubNavbar";
import { data as rolesList } from "@/features/roles/Table/dummy-data";
import Table from "@/features/roles/users/Table";
import { data as usersList } from "@/features/roles/users/Table/dummy-data";
import { useParams, useRouter } from "next/navigation";
import React from "react";

export default function page() {
  const params = useParams();
  const router = useRouter();
  const [role] = rolesList.filter((role) => role.id === Number(params.id)) || [
    {
      id: 0,
      name: "",
      TotalUsers: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  const user = usersList.filter((user) => user.rolesId === Number(params.id));
  return (
    <div>
      <SubNavbar
        title={role.name}
        buttons={[
          { title: "Sort By", action: () => {} },
          {
            title: "Add New user",
            action: () => {
              router.push(`/roles/${role.id}/create`);
            },
          },
        ]}
      />
      <Table data={user} />
    </div>
  );
}
