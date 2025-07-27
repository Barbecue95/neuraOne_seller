import { Order } from "@/types/order.types";
import { OrderStatus } from "../OrderDetail/order-status-badge";

type Params = {
  page: number;
  size: number;
};

type OrderListResponse = {
  data: Order[];
  meta: {
    page: number;
    size: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

const customerNames = [
  "Alice Johnson",
  "Bob Smith",
  "Charlie Davis",
  "Diana Lee",
  "Ethan Brown",
  "Fiona Wilson",
  "George King",
  "Hannah Scott",
];

function getRandomDate() {
  const start = new Date(2023, 0, 1);
  const end = new Date();
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
    .toISOString()
    .split("T")[0];
}

function getRandomEnumValue<T extends Record<string, string | number>>(
  enumObj: T
): T[keyof T] {
  const values = Object.values(enumObj) as T[keyof T][];
  return values[Math.floor(Math.random() * values.length)];
}

export const getDummyOrderList = ({
  page,
  size,
}: Params): OrderListResponse => {
  const total = 100; // simulate 100 total orders
  const totalPages = Math.ceil(total / size);

  const start = (page - 1) * size + 1;
  const end = Math.min(start + size - 1, total);

  const orders: Order[] = [];

  for (let i = start; i <= end; i++) {
    orders.push({
      orderId: `ORD-${i.toString().padStart(5, "0")}`,
      customerName:
        customerNames[Math.floor(Math.random() * customerNames.length)],
      orderDate: getRandomDate(),
      totalAmount: parseFloat((Math.random() * 500 + 50).toFixed(2)),
      quantity: Math.floor(Math.random() * 5) + 1,
      orderStatus: getRandomEnumValue(OrderStatus),
    });
  }

  return {
    data: orders,
    meta: {
      page,
      size,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};
