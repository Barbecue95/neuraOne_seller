"use client";
import Loading from "@/components/common/Loading";
import DashboardChart from "@/components/Dashboard/Chart/DashboardChart";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import RecentOrderTable from "@/components/Dashboard/RecetOrderTable";
import TopSellingCard from "@/components/Dashboard/TopSellingCard";
import useDashboard from "@/features/dashboard/useDashboard";
import SortByButton from "@/utils/SortByButton";
import {
  ChartLineIcon,
  NotepadTextIcon,
  Package,
  UsersRound,
} from "lucide-react";

export default function Home() {
  const { dashboardData, isDashboardLoading } = useDashboard();

  if (isDashboardLoading || !dashboardData) return <Loading />;

  const fmt = (v: unknown) => {
    const n = typeof v === "string" ? Number(v) : (v as number) ?? 0;
    return new Intl.NumberFormat().format(Number.isFinite(n) ? n : 0);
  };

  const cards = [
    {
      label: "Total Orders",
      value: fmt(dashboardData.data.totalOrder),
      Icon: NotepadTextIcon,
    },
    {
      label: "Total pending orders",
      value: fmt(dashboardData.data.totalPendingOrder),
      Icon: NotepadTextIcon,
    },
    {
      label: "Total revenue",
      value: fmt(dashboardData.data.totalRevenue),
      Icon: ChartLineIcon,
    },
    {
      label: "Total customers",
      value: fmt(dashboardData.data.totalUser),
      Icon: UsersRound,
    },
    {
      label: "Total products",
      value: fmt(dashboardData.data.totalProduct),
      Icon: Package,
    },
  ];

  return (
    <div className="h-fit w-full space-y-8  px-4 py-3 md:px-6 md:py-5">
      <div className="flex flex-col gap-4 md:gap-5">
        <div className="flex flex-col gap-4 md:gap-5">
          <div className="flex justify-end">
            <SortByButton
              customFilterOptions={[
                { label: "Today", value: "today" },
                { label: "yesterday", value: "yesterday" },
                { label: "Weekly", value: "weekly" },
                { label: "Monthly", value: "monthly" },
              ]}
            />
          </div>
          <div className="space-x-auto flex w-full flex-row flex-wrap justify-between gap-4 md:gap-5">
            {cards.map((item, index) => (
              <DashboardCard
                key={index}
                label={item.label}
                value={item.value}
                Icon={item.Icon}
              />
            ))}
          </div>
        </div>
        <div className="flex h-full w-full flex-col gap-4 md:gap-5 lg:flex-row lg:flex-wrap xl:flex-nowrap">
          <div className="bg-card h-fit w-fit rounded-[20px] p-4 shadow md:p-5">
            <DashboardChart sales={dashboardData.data.sales} />
          </div>
          <div className="bg-card min-h-full w-full rounded-[20px] p-4 md:p-5">
            <h2 className="text-xl font-medium">Top selling products</h2>
            <ul className="flex w-full flex-col gap-3 pt-4 md:mt-5">
              {dashboardData.data.topSellingProducts.map((item, index) => (
                <TopSellingCard key={index} product={item} />
              ))}
            </ul>
          </div>
        </div>
      </div>
      <RecentOrderTable />
    </div>
  );
}
