import { faker } from "@faker-js/faker";
import { couponCodeColumnsSchema } from "../../campaignSchemas";
faker.seed(123);

function createRandomOrder() {
  let discount = {
    discount: faker.number.int({ min: 1, max: 99 }).toString(),
    discountUnit: "percentage",
  };
  if (faker.datatype.boolean()) {
    discount = {
      discount: faker.number.int({ min: 1, max: 1000 }).toString(),
      discountUnit: "amount",
    };
  }
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    couponCode: faker.string.alphanumeric(10).toUpperCase(),
    expiredDate: faker.date.past(),
    limit: faker.number.int({ min: 1, max: 1000 }).toString(),
    ...discount,
    status: faker.helpers.arrayElement(["Public", "Private"]),
    minimumAmount: faker.number.int({ min: 100, max: 10000 }).toString(),
  };
}

export const data = couponCodeColumnsSchema.parse(
  faker.helpers.multiple(createRandomOrder, {
    count: 50,
  }),
);
