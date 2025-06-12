import { faker } from "@faker-js/faker";
import { citiesColumsSchema, deliveryColumnsSchema } from "../deliverySchema";
faker.seed(221);

function createRandomOrder() {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    companyInfo: {
      companyName: faker.company.name(),
      email: faker.internet.email(),
      phoneNo: faker.phone.number({ style: "international" }),
      postalCode: faker.location.zipCode(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
    },
    isFreeDelivery: false,
    deliveryType: faker.helpers.arrayElement(["Flat", "Weight", "Size"]),
    deliveryCities: faker.helpers.multiple(
      () => {
        return {
          id: faker.number.int({ min: 1, max: 1000 }),
          cityName: faker.location.city(),
          duration: faker.date
            .future({ years: 1 })
            .toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            }),
          deliveryFee: faker.number.int({ min: 1, max: 1000 }),
          weightFee: faker.helpers.multiple(
            () => {
              return {
                id: faker.number.int({ min: 1, max: 1000 }),
                fee: faker.number.int({ min: 1, max: 1000 }),
                weight: faker.helpers.arrayElement([
                  "Under 3kg",
                  "Equal 3kg",
                  "Over 3kg",
                ]),
              };
            },
            { count: 3 },
          ),
          sizeFee: faker.helpers.multiple(
            () => {
              return {
                id: faker.number.int({ min: 1, max: 1000 }),
                fee: faker.number.int({ min: 1, max: 1000 }),
                size: faker.helpers.arrayElement([
                  "small",
                  "medium",
                  "large",
                  "extra large",
                ]),
              };
            },
            { count: 4 },
          ),
        };
      },
      { count: 5 },
    ),
  };
}
function createRandomCity() {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    cityName: faker.location.city(),
    duration: faker.date.future({ years: 1 }).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }),
    deliveryFee: faker.number.int({ min: 1, max: 1000 }),
  };
}
export const citiesData = citiesColumsSchema.parse(
  faker.helpers.multiple(createRandomCity, {
    count: 5,
  }),
);
export const data = deliveryColumnsSchema.parse(
  faker.helpers.multiple(createRandomOrder, {
    count: 20,
  }),
);
