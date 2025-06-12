import { faker } from "@faker-js/faker";
import { standardCampaignColumnsSchema } from "../../campaignSchemas";
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
    ...discount,
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    banner: faker.image.urlPicsumPhotos(),
    startDate: faker.date.past(),
    endDate: faker.date.future(),
  };
}

export const data = standardCampaignColumnsSchema.parse(
  faker.helpers.multiple(createRandomOrder, {
    count: 50,
  }),
);
