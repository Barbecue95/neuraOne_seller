import { faker } from "@faker-js/faker";
import { userRolesColumnsSchema } from "../userRolesSchemas";
faker.seed(221);

function createRandomOrder() {
  return {
    id: faker.number.int({ min: 1, max: 50 }),
    name: faker.person.jobDescriptor(),
    TotalUsers: faker.number.int({ min: 1, max: 50 }),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
  };
}

export const data = userRolesColumnsSchema.parse(
  faker.helpers.multiple(createRandomOrder, {
    count: 20,
  }),
);
