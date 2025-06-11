import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BuyXGetX from "@/features/campaign/BuyXGetX";
import FlashSale from "@/features/campaign/flashSale";
import StandardCampaign from "@/features/campaign/standard";
import Link from "next/link";
export default function Home() {
  return (
    <div className="h-full">
      <Tabs defaultValue="1">
        <div className="flex w-full flex-row items-center justify-between gap-2 p-5">
          <TabsList>
            <TabsTrigger value="1">Standard</TabsTrigger>
            <TabsTrigger value="2">Flash Sale</TabsTrigger>
            <TabsTrigger value="3">Buy X get Y free</TabsTrigger>
          </TabsList>
          <Button variant="default" asChild>
            <Link href="/campaign/new">Add New Campaign</Link>
          </Button>
        </div>
        <TabsContent value="1">
          <StandardCampaign />
        </TabsContent>
        <TabsContent value="2">
          <FlashSale />
        </TabsContent>
        <TabsContent value="3">
          <BuyXGetX />
        </TabsContent>
      </Tabs>
    </div>
  );
}
