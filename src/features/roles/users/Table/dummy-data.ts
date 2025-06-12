import { faker } from "@faker-js/faker";
import { usersColumnsSchema } from "../../userRolesSchemas";
faker.seed(123);

function createRandomOrder() {
  const date = faker.date.past();
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: "international" }),
    rolesId: faker.number.int({ min: 1, max: 50 }),
    createdAt: date,
    updatedAt: date,
  };
}

export const data = usersColumnsSchema.parse(
  faker.helpers.multiple(createRandomOrder, {
    count: 50,
  }),
);
