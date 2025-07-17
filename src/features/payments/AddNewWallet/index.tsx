import { Tabs, TabsContent } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import NewDigital from "./NewDigital";
import NewBank from "./NewBank";

const AddNewWallet = () => {
  const [activeTab, setActiveTab] = useState("digital");

  return (
    <div className="space-y-4">
      <RadioGroup
        value={activeTab}
        onValueChange={setActiveTab}
        className="grid grid-cols-3 gap-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="digital" id="digital" />
          <Label htmlFor="digital">Digital Wallet</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="bank" id="bank" />
          <Label htmlFor="bank">Bank</Label>
        </div>
      </RadioGroup>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsContent value="digital">
          <NewDigital />
        </TabsContent>
        <TabsContent value="bank">
          <NewBank />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AddNewWallet;
