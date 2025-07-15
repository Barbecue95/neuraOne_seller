"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddNewWallet from "@/features/payments/AddNewWallet";
import Bank from "@/features/payments/Bank";
import Digital from "@/features/payments/Digital";
import { useGetBanks } from "@/queries/bank.queries";
import { CreateUpdateBankPayload } from "@/types/bank.types";
import React from "react";

const Wallet = () => {
  const { data, isLoading } = useGetBanks();
  const bankData = data?.data?.filter(
    (item: CreateUpdateBankPayload) => item.accountType == "BANK",
  );
  const digitalData = data?.data?.filter(
    (item: CreateUpdateBankPayload) => item.accountType == "PAY",
  );
  if (isLoading) {
    return (
      <div className="mx-8 my-4 space-y-4">
        <Skeleton className="h-10 w-40" />
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }
  console.log("original data", data, "filtered data", bankData);
  return (
    <Dialog>
      <div>
        <div className="text-primary flex w-full flex-row items-center justify-between px-8 py-4">
          <h2 className="text-accent-foreground text-lg font-semibold capitalize">
            Wallet
          </h2>
          <div className="flex flex-row items-center gap-2">
            <DialogTrigger asChild>
              <Button type="button" variant="default">
                Add new Wallet
              </Button>
            </DialogTrigger>
          </div>
        </div>
        <Tabs defaultValue="digital" className="w-full">
          <TabsList className="mx-8">
            <TabsTrigger value="digital">Digital Wallet</TabsTrigger>
            <TabsTrigger value="bank">Bank</TabsTrigger>
          </TabsList>
          <TabsContent value="digital">
            <Digital
              data={digitalData}
              isLoading={isLoading}
              pagination={data?.meta}
            />
          </TabsContent>
          <TabsContent value="bank">
            <Bank data={bankData} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Wallet</DialogTitle>
          </DialogHeader>
          <AddNewWallet />
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default Wallet;
