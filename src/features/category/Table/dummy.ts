import { faker } from "@faker-js/faker";
import { categoryColumnsSchema } from "./colums";
// Optional: Seed to get consistent data on each run
faker.seed(123);

function createRandomCategory() {
  return {
    categoryName: faker.commerce.department(), // e.g., Electronics, Toys
    product: faker.commerce.productName(), // e.g., Intelligent Cotton Keyboard
    status: faker.helpers.arrayElement(["Active", "Inactive", "Archived"]),
  };
}

// Generate 50 random product categories
export const categoryData = categoryColumnsSchema.parse(
  faker.helpers.multiple(createRandomCategory, {
    count: 50,
  }),
);
