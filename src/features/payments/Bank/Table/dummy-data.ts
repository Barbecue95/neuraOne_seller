import { faker } from "@faker-js/faker";
import { bankColumnsSchema } from "../../paymentSchema";

faker.seed(123);
function createRandomDigital() {
  return {
    id: faker.number.int({ min: 1, max: 4 }),
    accountName: faker.internet.username(),
    accountNumber: faker.finance.accountNumber(10),
    status: faker.helpers.arrayElement(["active", "disabled"]),
  };
}

export const bankData = bankColumnsSchema.parse(
  faker.helpers.multiple(createRandomDigital, {
    count: 50,
  }),
);
