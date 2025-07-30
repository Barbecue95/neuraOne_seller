import DashboardChart from "@/components/Dashboard/Chart/DashboardChart";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import RecentOrderTable from "@/components/Dashboard/RecetOrderTable";
import TopSellingCard from "@/components/Dashboard/TopSellingCard";
import SortByButton from "@/utils/SortByButton";
import {
  ChartLineIcon,
  NotepadTextIcon,
  Package,
  UsersRound,
} from "lucide-react";

const data = [
  {
    label: "Total Orders",
    value: "2,935",
    Icon: NotepadTextIcon,
  },
  {
    label: "Total pending orders",
    value: "500",
    Icon: NotepadTextIcon,
  },
  {
    label: "Total revenue",
    value: "400,234",
    Icon: ChartLineIcon,
  },
  {
    label: "Total customers",
    value: "1,834",
    Icon: UsersRound,
  },
  {
    label: "Total products",
    value: "451",
    Icon: Package,
  },
];

export default function Home() {
  return (
    <div className="bg-background h-fit w-full space-y-8 px-6 py-5">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <div className="flex justify-end">
            <SortByButton
              customFilterOptions={[
                { label: "Today", value: "time" },
                { label: "yesterday", value: "yesterday" },
                { label: "Weekly", value: "day" },
                { label: "Monthly", value: "month" },
              ]}
            />
          </div>
          <div className="space-x-auto flex flex-row gap-5">
            {data.map((item, index) => (
              <DashboardCard
                key={index}
                label={item.label}
                value={item.value}
                Icon={item.Icon}
              />
            ))}
          </div>
        </div>
        <div className="flex h-full w-full gap-5">
          <div className="bg-card h-fit w-fit rounded-[20px] p-5 shadow">
            <DashboardChart />
          </div>
          <div className="bg-card h-full w-full rounded-[20px] p-5">
            <h2 className="text-xl font-medium">Top selling products</h2>
            <ul className="mt-5 flex w-full flex-col gap-3">
              <TopSellingCard />
              <TopSellingCard />
              <TopSellingCard />
              <TopSellingCard />
              <TopSellingCard />
            </ul>
          </div>
        </div>
      </div>
      <RecentOrderTable />
    </div>
  );
}
