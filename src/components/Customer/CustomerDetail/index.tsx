"use client";

import CustomerInfoCard from "./customer-info-card";
import OrderSummaryCard from "./order-summary-card";
import ActivityTimeline from "./activity-timeline";
import { useGetUserById } from "@/queries/users.queries";

interface CustomerDetailsPageProps {
  customerId: string;
}

export default function CustomerDetailsPage({
  customerId,
}: CustomerDetailsPageProps) {
  // Mock order data
  const orderData = {
    totalOrders: 20,
    totalSpend: "350,000 MMK",
    orders: [
      { id: "ORD-001", date: "2024-05-15" },
      { id: "ORD-002", date: "2024-05-14" },
      { id: "ORD-003", date: "2024-05-13" },
      { id: "ORD-004", date: "2024-05-12" },
      { id: "ORD-005", date: "2024-05-11" },
      { id: "ORD-006", date: "2024-05-10" },
      { id: "ORD-007", date: "2024-05-09" },
      { id: "ORD-008", date: "2024-05-08" },
    ],
  };

  // Mock activity data
  const activityData = [
    {
      id: "1",
      type: "wishlist" as const,
      description: "{customerName} added {productName} to wish list.",
      timestamp: "5/6/2024 at 11:30 AM",
      customerName: "Customer name",
      productName: "product name",
    },
    {
      id: "2",
      type: "wishlist" as const,
      description: "{customerName} added {productName} to wish list.",
      timestamp: "5/6/2024 at 11:30 AM",
      customerName: "Customer name",
      productName: "product name",
    },
    {
      id: "3",
      type: "wishlist" as const,
      description: "{customerName} added {productName} to wish list.",
      timestamp: "5/6/2024 at 11:30 AM",
      customerName: "Customer name",
      productName: "product name",
    },
    {
      id: "4",
      type: "wishlist" as const,
      description: "{customerName} added {productName} to wish list.",
      timestamp: "5/6/2024 at 11:30 AM",
      customerName: "Customer name",
      productName: "product name",
    },
    {
      id: "5",
      type: "wishlist" as const,
      description: "{customerName} added {productName} to wish list.",
      timestamp: "5/6/2024 at 11:30 AM",
      customerName: "Customer name",
      productName: "product name",
    },
  ];

  if (!customerId) return null;

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Customer Info */}
        <div className="lg:col-span-1">
          <CustomerInfoCard customerId={customerId} />
        </div>

        {/* Right Column - Orders and Activity */}
        <div className="space-y-6 lg:col-span-2">
          {/* Order Summary */}
          <OrderSummaryCard
            totalOrders={orderData.totalOrders}
            totalSpend={orderData.totalSpend}
            orders={orderData.orders}
          />

          {/* Activity Timeline */}
          <ActivityTimeline activities={activityData} />
        </div>
      </div>
    </div>
  );
}
