// Product End Points
const PRODUCT_BASE_PATCH = "/products";
export const productEndpoints = {
  products: PRODUCT_BASE_PATCH,
};

// Category End Points
const CATEGORY_BASE_PATH = "/categories";
export const categoryEndpoints = {
  categories: CATEGORY_BASE_PATH,
  variants: `${CATEGORY_BASE_PATH}/variants`,
  createVariants: `${CATEGORY_BASE_PATH}/createVariants`,
  updateVariants: `${CATEGORY_BASE_PATH}/updateVariants`,
  deleteVariants: `${CATEGORY_BASE_PATH}/deleteVariants`,
  deleteVariantValue: `${CATEGORY_BASE_PATH}/deleteVariantValue`,
};

// User End points
const USER_BASE_PATH = "/users";
export const userEndpoints = {
  users: USER_BASE_PATH,
  login: `${USER_BASE_PATH}/login`,
  register: `${USER_BASE_PATH}/register`,
  refreshToken: `${USER_BASE_PATH}/refreshToken`,
  updateStatus: `${USER_BASE_PATH}/status`,

  // seller
  sellers: `${USER_BASE_PATH}/sellers`,
  loginSeller: `${USER_BASE_PATH}/loginSeller`,
  createSellerAccount: `${USER_BASE_PATH}/createSellerAccount`,
  resetSellerPassword: `${USER_BASE_PATH}/resetSellerPassword`,
};

// Brand End Points
const BRAND_BASE_PATH = "/brands";
export const brandEndpoints = {
  brands: BRAND_BASE_PATH,
};

// Order End Points
const ORDER_BASE_PATH = "/orders";
export const orderEndpoints = {
  orders: ORDER_BASE_PATH,
  status: `${ORDER_BASE_PATH}/status`,
};

// Bank End Points
const BANK_BASE_PATH = "/banks";
export const bankEndpoints = {
  banks: BANK_BASE_PATH,
};

// Location End Points
const LOCATION_BASE_PATH = "/locations";
export const locationEndpoints = {
  regions: `${LOCATION_BASE_PATH}/region`,
  cities: `${LOCATION_BASE_PATH}/city`,
  townships: `${LOCATION_BASE_PATH}/township`,
};
