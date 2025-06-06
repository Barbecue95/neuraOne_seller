import { faker } from "@faker-js/faker";
import { digitalColumnsSchema } from "../../paymentSchema";
faker.seed(123);
function createRandomDigital() {
  return {
    id: faker.number.int({ min: 1, max: 4 }),
    qrcode: faker.image.urlPicsumPhotos(),
    accountName: faker.internet.username(),
    accountNumber: faker.phone.number({ style: "international" }),
    status: faker.helpers.arrayElement(["active", "disabled"]),
  };
}

export const digitalData = digitalColumnsSchema.parse(
  faker.helpers.multiple(createRandomDigital, {
    count: 50,
  }),
);
