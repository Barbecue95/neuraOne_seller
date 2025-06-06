import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import NewDigital from "./NewDigital";
import NewBank from "./NewBank";

const AddNewWallet = () => {
  return (
    <Tabs>
      <TabsList>
        <TabsTrigger value="digital">Digital Wallet</TabsTrigger>
        <TabsTrigger value="bank">Bank</TabsTrigger>
      </TabsList>
      <TabsContent value="digital">
        <NewDigital />
      </TabsContent>
      <TabsContent value="bank">
        <NewBank />
      </TabsContent>
    </Tabs>
  );
};

export default AddNewWallet;
