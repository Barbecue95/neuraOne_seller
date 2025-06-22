import { faker } from "@faker-js/faker";
import { notificationColumnsSchema } from "../notificationSchemas";
faker.seed(123);

function createRandomOrder() {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    name: faker.company.buzzPhrase(),
    audience: faker.name.jobTitle(),
    status: faker.helpers.arrayElement(["Sent", "Delivered", "Cancelled"]),
    sentDate: faker.date.past(),
  };
}

export const data = notificationColumnsSchema.parse(
  faker.helpers.multiple(createRandomOrder, {
    count: 50,
  }),
);
