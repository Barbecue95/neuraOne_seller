import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Mail, Smartphone } from "lucide-react";

const CustomerDetail = () => {
  return (
    <div className="bg-card space-y-5 rounded-t-md pb-5">
      <h3 className="text-custom-dark-gray border-b p-5 text-xl font-medium">
        Customer details
      </h3>

      <div className="flex items-center gap-3 px-5">
        <Avatar className="h-18 w-18">
          <AvatarImage
            src="/placeholder.svg?height=70&width=70"
            alt="John Doe"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <span className="text-custom-dark-gray text-lg font-medium">
          John Doe
        </span>
      </div>

      <div className="space-y-2.5 px-5">
        <div className="flex items-center gap-2.5">
          <Mail className="text-custom-dark-gray h-6 w-6" />
          <span className="text-custom-dark-gray text-base font-normal">
            user@example.com
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <Smartphone className="text-custom-dark-gray h-6 w-6" />
          <span className="text-custom-dark-gray text-base font-normal">
            09123456789
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
