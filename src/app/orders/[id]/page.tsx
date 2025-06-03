"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import SubNavbar from "@/components/SubNavbar";
import { useParams } from "next/navigation";

const OrderDetails = () => {
  const { id } = useParams();
  // Define buttons for SubNavbar
  const navbarButtons = [
    {
      title: "Restock",
      action: () => {
        // TODO: Implement restock functionality
        console.log("Restock clicked");
      },
    },
    {
      title: "History Log",
      action: () => {
        // TODO: Implement history log functionality
        console.log("History Log clicked");
      },
    },
  ];

  return (
    <div className="bg-background flex min-h-screen flex-col p-0">
      <SubNavbar title="Order Details" buttons={navbarButtons} />
      <div className="flex flex-col">
        <div className="flex-1 overflow-auto p-4">
          <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-3">
            {/* Left 2/3 */}
            <div className="col-span-2 flex flex-col gap-4">
              {/* Order ID and Product */}
              <div className="bg-card p-4">
                <div className="text-card-foreground mb-1 text-lg font-semibold">
                  Order ID - {id}
                </div>
                <div className="text-muted-foreground mb-2 text-xs">
                  order time 11/5/2025 at 11:10 AM
                </div>
                <div className="border-border my-2 border-t" />
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-card-foreground font-medium">Product</h2>
                  <span className="bg-accent text-accent-foreground px-4 py-2 text-xs">
                    Pending
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-muted h-20 w-20" />
                  <div className="flex-1">
                    <div className="text-card-foreground font-medium">
                      Nike Air
                    </div>
                    <div className="text-card-foreground mt-2 flex items-center gap-2 text-xs">
                      <span className="shadow-accent mr-1 inline-block h-3 w-3 bg-black shadow-md" />
                      <span>Black</span>
                      <span className="ml-4">40</span>
                      <span className="ml-4">Qty:2</span>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col items-end">
                    <span className="text-card-foreground text-lg font-semibold">
                      500,000 Ks
                    </span>
                  </div>
                </div>
              </div>
              {/* Order summary */}
              <div className="bg-card min-h-52 flex-1 p-4">
                <div className="text-card-foreground mb-2 font-medium">
                  Order summary
                </div>
              </div>
              {/* Payment details */}
              <div className="bg-card min-h-20 p-4">
                <div className="text-card-foreground mb-2 font-medium">
                  Payment details
                </div>
              </div>
            </div>
            {/* Right 1/3 */}
            <div className="flex h-full flex-col gap-4">
              <div className="bg-card h-1/4 flex-1 p-4">
                <div className="text-card-foreground mb-2 font-medium">
                  Note
                </div>
              </div>
              <div className="bg-card h-1/4 flex-1 p-4">
                <div className="text-card-foreground mb-2 font-medium">
                  Shipping address
                </div>
              </div>
              <div className="bg-card h-1/4 flex-1 p-4">
                <div className="text-card-foreground mb-2 font-medium">
                  Customer details
                </div>
              </div>
              <div className="bg-card h-1/4 flex-1 p-4">
                <div className="text-card-foreground mb-2 font-medium">
                  Delivery Service
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Sticky action buttons at the bottom */}
        <div className="border-border bg-background sticky bottom-0 left-0 z-10 flex w-full justify-center gap-8 border-t py-6">
          <Button
            variant="outline"
            className="border-input hover:bg-accent hover:text-accent-foreground w-40"
          >
            Reject
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-40">
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
// The action buttons are now always visible, sticky at the bottom of the main content area, and the layout fits the screen with scrollable content.
