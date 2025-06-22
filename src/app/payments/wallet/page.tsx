"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddNewWallet from "@/features/payments/AddNewWallet";
import Bank from "@/features/payments/Bank";
import Digital from "@/features/payments/Digital";
import React from "react";

const Wallet = () => {
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
            <Digital />
          </TabsContent>
          <TabsContent value="bank">
            <Bank />
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
