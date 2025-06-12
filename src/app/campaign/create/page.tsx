import SubNavbar from "@/components/SubNavbar";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import CreateBuyXGetX from "@/features/campaign/BuyXGetX/Create";
import CreateFlashSale from "@/features/campaign/flashSale/Create";
import CreateStandardCampaign from "@/features/campaign/standard/Create";
import {} from "@radix-ui/react-tabs";
import React from "react";

export default function page() {
  return (
    <div>
      <SubNavbar title="Create Campaign" />
      <div className="flex w-full flex-col px-8 pb-4">
        <div className="flex flex-col gap-4">
          <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Campaign Type
          </h2>
          <Tabs defaultValue="1">
            <TabsList>
              <TabsTrigger value="1">Standard</TabsTrigger>
              <TabsTrigger value="2">Flash Sale</TabsTrigger>
              <TabsTrigger value="3">Buy X get Y free</TabsTrigger>
            </TabsList>
            <TabsContent value="1">
              <CreateStandardCampaign />
            </TabsContent>
            <TabsContent value="2">
              <CreateFlashSale />
            </TabsContent>
            <TabsContent value="3">
              <CreateBuyXGetX />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
