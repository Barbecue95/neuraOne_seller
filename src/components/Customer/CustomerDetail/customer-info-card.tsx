"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUserById } from "@/queries/users.queries";

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

export default function CustomerInfoCard({ customerId }: CustomerInfoCardProps) {
  const { data, isLoading: fetchingUserDetail } = useGetUserById(customerId);
  console.log(data);
  const rawCustomerData = data?.data;

  const customer = {
    id: rawCustomerData?.id,
    name: rawCustomerData?.name,
    phone: rawCustomerData?.phoneNumber,
    email: rawCustomerData?.email,
    address:
      rawCustomerData?.address +
      ", " +
      rawCustomerData?.township +
      ", " +
      rawCustomerData?.city +
      ", " +
      rawCustomerData?.region,
    joinedDate: rawCustomerData?.createdAt,
    avatar: "",
  };

  if (fetchingUserDetail) return null;

  return (
    <Card className="bg-gray-100">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Customer details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar */}
        <div className="flex justify-center">
          <Avatar className="h-24 w-24">
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
        </div>

        {/* Customer Information */}
        <div className="space-y-4">
          <div>
            <div className="mb-1 text-sm text-gray-600">Name</div>
            <div className="text-sm">{customer.name}</div>
          </div>

          <div>
            <div className="mb-1 text-sm text-gray-600">Phone</div>
            <div className="text-sm">{customer.phone}</div>
          </div>

          <div>
            <div className="mb-1 text-sm text-gray-600">Email</div>
            <div className="text-sm">{customer.email}</div>
          </div>

          <div>
            <div className="mb-1 text-sm text-gray-600">Address</div>
            <div className="text-sm">{customer.address}</div>
          </div>

          <div>
            <div className="mb-1 text-sm text-gray-600">Joined date</div>
            <div className="text-sm">{customer.joinedDate}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
