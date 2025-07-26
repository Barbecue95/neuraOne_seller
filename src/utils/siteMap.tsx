//types
import { SiteMapGroup } from "@/types/sidebar.types";

import {
  BadgePercent,
  ReceiptText,
  Store,
  UsersRound,
  Package,
  LayoutDashboard,
  TicketPercent,
  Wallet,
  ArrowRightLeft,
  Settings,
  Bell,
  CreditCard,
  PcCase,
  AlignLeft,
  Shapes,
} from "lucide-react";

// exported for Navbar component
export const siteMap: SiteMapGroup[] = [
  {
    id: 1,
    name: "overview",
    items: [
      { id: 1, name: "Dashboard", icon: <LayoutDashboard />, path: "/" },
      {
        id: 2,
        name: "Product Management",
        path: "/products",
        icon: <Package />,
        subPath: [
          {
            id: 1,
            name: "Products List",
            icon: <AlignLeft />,
            path: "/products",
          },
          {
            id: 2,
            name: "Product Category List",
            icon: <Shapes />,
            path: "/products/category",
          },
          // {
          //   id: 3,
          //   name: "brand List",
          //   icon: <Package />,
          //   path: "/products/brand",
          // },
        ],
      },
      {
        id: 3,
        name: "Order Management",
        icon: <PcCase />,
        path: "/orders",
      },
      {
        id: 4,
        name: "Customer Management",
        icon: <UsersRound />,
        path: "/customers",
      },
      // {
      //   id: 5,
      //   name: "Analytics & Reports",
      //   icon: <ChartNoAxesColumn />,
      //   path: "/reports",
      // },
      // {
      //   id: 6,
      //   name: "Campaign & Flash Sales",
      //   icon: <BadgePercent />,
      //   path: "/campaign",
      //   subPath: [
      //     {
      //       id: 1,
      //       name: "Campaigns",
      //       icon: <BadgePercent />,
      //       path: "/campaign",
      //     },
      //     {
      //       id: 2,
      //       name: "Coupons",
      //       icon: <TicketPercent />,
      //       path: "/campaign/coupon",
      //     },
      //   ],
      // },
    ],
  },
  {
    id: 2,
    name: "Finance",
    items: [
      {
        id: 1,
        name: "Wallet Setup",
        path: "/payments/wallet",
        icon: <CreditCard />,
        // path: "/payments",
        // subPath: [
        //   {
        //     id: 1,
        //     name: "All Transaction",
        //     icon: <ArrowRightLeft className="size-6" />,
        //     path: "/payments",
        //   },
        //   {
        //     id: 2,
        //     name: "Wallet",
        //     icon: <Wallet />,
        //     path: "/payments/wallet",
        //   },
        // ],
      },

      // {
      //   id: 2,
      //   name: "Shipping & Delivery",
      //   path: "/delivery",
      //   icon: <Package />,
      // },
    ],
  },
  {
    id: 3,
    name: "System",
    items: [
      // {
      //   id: 1,
      //   name: "User role & Authentication",
      //   icon: <Store />,
      //   path: "/roles",
      // },
      {
        id: 2,
        name: "Notification",
        icon: <Bell />,
        path: "/notification",
      },
      {
        id: 3,
        name: "settings",
        icon: <Settings />,
        path: "/settings",
        subPath: [
          {
            id: 1,
            name: "Accont Settings",
            icon: <ArrowRightLeft className="size-6" />,
            path: "/settings",
          },
          {
            id: 2,
            name: "Storefront Settings",
            icon: <Wallet />,
            path: "/settings/storefront",
          },
        ],
      },
    ],
  },
];
