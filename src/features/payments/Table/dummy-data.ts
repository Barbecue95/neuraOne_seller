import { faker } from "@faker-js/faker";
import { transactionColumnsSchema } from "../paymentSchema";
faker.seed(123);
function createRandomTransaction() {
  return {
    id: faker.number.int({ min: 1, max: 10000 }),
    orderId: faker.number.int({ min: 1, max: 1000 }),
    amount: faker.number.int({ min: 1000, max: 100000 }),
    method: faker.helpers.arrayElement([
      "Paypal",
      "Stripe",
      "Kpay",
      "Credit Card",
    ]),
    status: faker.helpers.arrayElement([
      "Paid",
      "Unpaid",
      "Refunded",
      "Pending",
    ]),
    date: faker.date.past(),
  };
}

export const transactionData = transactionColumnsSchema.parse(
  faker.helpers.multiple(createRandomTransaction, {
    count: 50,
  }),
);
