import { Badge } from "@/components/ui/badge"

type StatusType = "pending" | "delivering" | "packaging" | "processing" | "delivered"

interface StatusBadgeProps {
  status: StatusType
}

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  },
  delivering: {
    label: "Delivering",
    className: "bg-orange-100 text-orange-800 hover:bg-orange-100",
  },
  packaging: {
    label: "Packaging",
    className: "bg-purple-100 text-purple-800 hover:bg-purple-100",
  },
  processing: {
    label: "Processing",
    className: "bg-cyan-100 text-cyan-800 hover:bg-cyan-100",
  },
  delivered: {
    label: "Delivered",
    className: "bg-green-100 text-green-800 hover:bg-green-100",
  },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <Badge variant="secondary" className={`${config.className} font-medium px-2.5 py-1`}>
      {config.label}
    </Badge>
  )
}
