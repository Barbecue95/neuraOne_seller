import {
  CreateUpdatePaymentMethodPayloadSchema,
  PaymentMethodTableSchema,
} from "@/types/payment-method.types";
import { faker } from "@faker-js/faker";
faker.seed(123);
function createRandomDigital() {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    name: faker.person.fullName(),
    qrCodeUrl: faker.image.urlLoremFlickr({ category: "business" }),
    accountType: faker.helpers.arrayElement(["BANK", "PAY"]),
    accountName: faker.internet.username(),
    accountNo: faker.phone.number({ style: "international" }),
    cashOnDelivery: faker.datatype.boolean(),
    imageUrl: faker.image.urlLoremFlickr({ category: "business" }),
  };
}

export const digitalData = PaymentMethodTableSchema.parse(
  faker.helpers.multiple(createRandomDigital, {
    count: 50,
  }),
);
