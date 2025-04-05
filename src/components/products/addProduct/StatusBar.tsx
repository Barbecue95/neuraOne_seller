import { DollarSign, Eye, Network, Pencil } from "lucide-react";
import React from "react";

type Props = {};

const StatusBar = (props: Props) => {
  return (
    <div className="col-span-3 flex items-center justify-center p-10 bg-white rounded-xl">
      <div className="flex items-center justify-center w-4/5 relative">
        <div className="flex-1 flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white">
            <Pencil className="w-5 h-5" />
          </div>
          <div className="h-0.5 flex-1 bg-blue-500"></div>
          <div className="text-blue-500 text-sm font-medium absolute ml-[-30px] mt-16">
            Descriptions
          </div>
        </div>

        <div className="flex-1 flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white">
            <DollarSign className="w-5 h-5" />
          </div>
          <div className="h-0.5 flex-1 bg-blue-500"></div>
          <div className="text-blue-500 text-sm font-medium absolute ml-[-10px] mt-16">
            Pricing
          </div>
        </div>

        <div className="flex-1 flex items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white">
            <Network className="w-5 h-5" />
          </div>
          <div className="h-0.5 flex-1 bg-gray-200"></div>
          <div className="text-blue-500 text-sm font-medium absolute ml-[-10px] mt-16">
            Variants
          </div>
        </div>

        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-400">
          <Eye className="w-5 h-5" />
          <div className="text-gray-400 text-sm font-medium absolute ml-0 mt-16">
            Preview
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
