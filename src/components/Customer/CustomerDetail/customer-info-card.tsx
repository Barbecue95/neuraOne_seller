"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUserById } from "@/queries/users.queries";
import Locationarrow from "./Locationarrow";

interface CustomerInfo {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  joinedDate: string;
  avatar?: string;
}

interface CustomerInfoCardProps {
  customerId: string;
}

export default function CustomerInfoCard({
  customerId,
}: CustomerInfoCardProps) {
  // need to uncomment
  const { data, isLoading: fetchingUserDetail } = useGetUserById(customerId);
  console.log(data);
  const rawCustomerData = data?.data;

  const customer = {
    id: rawCustomerData?.id,
    name: rawCustomerData?.name,
    phone: rawCustomerData?.phoneNumber,
    email: rawCustomerData?.email,
    address:
      rawCustomerData?.floorNo +
      ", " +
      rawCustomerData?.unit +
      ", " +
      rawCustomerData?.address +
      ", " +
      rawCustomerData?.township?.name +
      ", " +
      rawCustomerData?.city?.name +
      ", " +
      rawCustomerData?.region?.name,
    joinedDate: rawCustomerData?.createdAt,
    status: rawCustomerData?.status,
    gender: rawCustomerData?.gender,
    avatar: "",
  };

  if (fetchingUserDetail) return null;

  // const customer = {
  //   id: 1234,
  //   name: "Jared Padalecki",
  //   phone: "09987654321",
  //   email: "johnDOe@gmail.com",
  //   address:
  //     "Shwe Taung Street, Kamayut Township, Yangon NO 123 SHWE TAUNG STREET, ##04-05",
  //   joinedDate: "20 July 2025",
  //   status: "Active",
  //   gender: "Male",
  //   avatar: "",
  // };

  const status = customer?.status as "ACTIVE" | "INACTIVE" | "SUSPENDED";

  const color =
    {
      ACTIVE: "bg-green-100 text-green-800",
      INACTIVE: "bg-yellow-100 text-yellow-800",
      SUSPENDED: "bg-red-100 text-red-800",
    }[status] ?? "bg-gray-100 text-gray-800";

  return (
    <div className="flex flex-col items-center justify-center rounded-[20px] bg-white py-4 text-base font-medium md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col items-center justify-center gap-5 p-5 md:w-[30%] md:flex-row md:p-10">
        <Avatar className="h-28 w-28">
          <AvatarImage
            src={customer.avatar || "/placeholder.svg"}
            alt={customer.name}
          />
          <AvatarFallback className="bg-gray-600 text-2xl text-white">
            {customer.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center gap-y-1 text-center md:items-start">
          <p>{customer?.name}</p>
          <span className="text-base text-[#3C3C3C]">{customer?.id}</span>
        </div>
      </div>
      <div className="flex h-full w-full flex-col justify-between space-y-2 p-5 md:w-[40%] md:border-x md:border-[#EEEEEE]">
        <div className="flex items-start justify-between">
          <span className="text-[#303030]">Phone Number</span>
          <p>{customer?.phone}</p>
        </div>
        <div className="flex items-start justify-between">
          <span className="text-[#303030]">Email</span>
          <p>{customer?.email}</p>
        </div>
        <div className="flex items-start justify-between">
          <span className="text-[#303030]">Gender</span>
          <p>{customer?.gender}</p>
        </div>
        <div className="flex items-start justify-between">
          <span className="text-[#303030]">Status</span>
          <span
            className={`inline-block w-24 rounded-full px-3 py-1 text-center text-sm font-normal ${color}`}
          >
            {customer?.status == "ACTIVE" ? "Active" : "Block"}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center gap-y-3 px-5 md:w-[30%]">
        <span className="text-[#303030]">Address</span>
        <p>{customer?.address}</p>
        <div className="flex items-start justify-center gap-1 text-[#303030]">
          <Locationarrow />
          <span>Near City Mart</span>
        </div>
      </div>
    </div>
  );
}
