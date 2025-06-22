import { faker } from "@faker-js/faker";
import { flashSaleColumnsSchema } from "../../campaignSchemas";
faker.seed(123);

function generateSameDayDateRangeMinified() {
  const base = faker.date.recent({ days: 365 });
  const startH = faker.number.int({ min: 0, max: 22 });
  const startM = faker.number.int({ min: 0, max: 59 });

  const endH = faker.number.int({ min: startH + 1, max: 23 });
  let endM = faker.number.int({ min: 0, max: 59 });

  if (startH === endH && endM <= startM) {
    endM = faker.number.int({ min: startM + 1, max: 59 });
  }

  const startD = new Date(base);
  startD.setHours(startH, startM, 0, 0);

  const endD = new Date(base);
  endD.setHours(endH, endM, 0, 0);

  return {
    startDate: startD.toISOString(),
    endDate: endD.toISOString(),
  };
}

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
  const dateRange = generateSameDayDateRangeMinified();
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    ...discount,
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    banner: faker.image.urlPicsumPhotos(),
    startDate: new Date(dateRange.startDate),
    endDate: new Date(dateRange.endDate),
    minimumAmount: faker.number.int({ min: 100, max: 10000 }).toString(),
  };
}

export const data = flashSaleColumnsSchema.parse(
  faker.helpers.multiple(createRandomOrder, {
    count: 50,
  }),
);
