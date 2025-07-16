import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "./status-badge";
import OrderAction from "./order-action";

export interface Order {
  id: string;
  created: string;
  total: string;
  payment: string;
  status: "pending" | "delivering" | "packaging" | "processing" | "delivered";
}

interface OrderTableProps {
  orders: Order[];
}

export function OrderTable({ orders }: OrderTableProps) {
  return (
    <div className="rounded-[20px] border bg-white">
      <Table>
        <TableHeader>
          <TableRow className="border-b bg-[#EEEEEE] text-lg">
            <TableHead className="px-5 py-2.5 text-gray-700 rounded-tl-[20px]">Order ID</TableHead>
            <TableHead className="px-5 py-2.5 text-gray-700">Created</TableHead>
            <TableHead className="px-5 py-2.5 text-gray-700">Total</TableHead>
            <TableHead className="px-5 py-2.5 text-gray-700">Payment</TableHead>
            <TableHead className="px-5 py-2.5 text-gray-700">Status</TableHead>
            <TableHead className="w-12 rounded-tr-[20px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <TableRow
              key={`${order.id}-${index}`}
              className="border-b text-lg font-normal last:border-b-0 cursor-pointer"
            >
              <TableCell className="px-5 py-2.5 text-gray-600">
                {order.id}
              </TableCell>
              <TableCell className="px-5 py-2.5 text-gray-600">
                {order.created}
              </TableCell>
              <TableCell className="px-5 py-2.5 text-gray-600">
                {order.total}
              </TableCell>
              <TableCell className="px-5 py-2.5 text-gray-600">
                {order.payment}
              </TableCell>
              <TableCell className="px-5 py-2.5">
                <StatusBadge status={order.status} />
              </TableCell>
              <TableCell className="px-5 py-2.5">
                <OrderAction />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
