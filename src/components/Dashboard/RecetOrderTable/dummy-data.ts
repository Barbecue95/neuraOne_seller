import { orderColumnsSchema } from "./columns";
import { faker } from "@faker-js/faker";
faker.seed(123);
function createRandomOrder() {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    customerName: faker.internet.username(),
    orderDate: faker.date.past(),
    method: faker.helpers.arrayElement([
      "Paypal",
      "Stripe",
      "Kpay",
      "Credit Card",
    ]),
    status: faker.helpers.arrayElement([
      "Paid",
      "Unpaid",
      "Delivered",
      "Pending",
    ]),
    orderStatus: faker.helpers.arrayElement([
      "Shipped",
      "Delivered",
      "Cancelled",
      "Pending",
    ]),
  };
}

export const Orderdata = orderColumnsSchema.parse(
  faker.helpers.multiple(createRandomOrder, {
    count: 50,
  }),
);
