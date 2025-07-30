import React from "react";

interface DashboardCardProps {
  label: string;
  value: string;
  Icon:
    | React.FC<React.SVGProps<SVGSVGElement>>
    | React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
export default function DashboardCard({
  label,
  value,
  Icon,
}: DashboardCardProps) {
  return (
    <div className="bg-card min-h-20 md:min-h-28 md:max-w-2xs flex w-fit flex-1 items-start justify-between gap-4 rounded-[20px] p-4 md:p-5">
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold md:text-[28px]">{value}</h2>
        <span className="text-xs md:text-base">{label}</span>
      </div>
      <span className="bg-card rounded-xl p-2.5 shadow md:p-3">
        <Icon className="text-primary size-5 md:size-6" />
      </span>
    </div>
  );
}
