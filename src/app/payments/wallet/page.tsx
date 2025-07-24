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
import { useGetPaymentMethods } from "@/queries/payment-method.queries";
import { CreateUpdatePaymentMethodPayload } from "@/types/payment-method.types";
import { PlusCircle } from "lucide-react";
import React from "react";

const Wallet = () => {
  const { data, isLoading } = useGetPaymentMethods();
  const bankData = data?.data?.filter(
    (item: CreateUpdatePaymentMethodPayload) => item.accountType == "BANK",
  );
  const digitalData = data?.data?.filter(
    (item: CreateUpdatePaymentMethodPayload) => item.accountType == "PAY",
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
            Wallet List
          </h2>
          <div className="flex flex-row items-center gap-2">
            <DialogTrigger asChild>
              <Button type="button" variant="default" className="rounded-full">
                <PlusCircle className="h-4 w-4" />
                Add new Wallet
              </Button>
            </DialogTrigger>
          </div>
        </div>
        <Tabs defaultValue="digital" className="w-full px-8">
          <div className="b rounded-2xl border px-4 pt-4 pb-6 shadow-sm">
            <TabsList className="mb-4 flex w-fit gap-2 rounded-full bg-transparent p-1">
              <TabsTrigger
                value="digital"
                className="rounded-full px-6 py-2 text-gray-500 transition data-[state=active]:border-blue-600 data-[state=active]:font-semibold"
              >
                Digital Wallet
              </TabsTrigger>
              <TabsTrigger
                value="bank"
                className="rounded-full px-6 py-2 text-gray-500 transition data-[state=active]:font-semibold"
              >
                Bank
              </TabsTrigger>
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
          </div>
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
