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
    <div className="bg-card flex min-h-28 w-full max-w-2xs items-start justify-between gap-4 rounded-[20px] p-5">
      <div className="flex flex-col gap-3">
        <h2 className="text-[28px] font-semibold">{value}</h2>
        <span className="text-base">{label}</span>
      </div>
      <span className="bg-card rounded-xl p-3 shadow">
        <Icon className="text-primary size-6" />
      </span>
    </div>
  );
}
