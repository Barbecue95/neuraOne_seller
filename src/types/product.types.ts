export interface Product {
  id: number;
  name: string;
  quantity: number;
  sellingPrice: number;
  status: "PUBLISH" | "SCHEDULE" | "DRAFT";
  mainCategory: {
    id: number;
    name: string;
  };
}

export interface PaginationInfo {
  page: number;
  size: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ProductsResponse {
  data: Product[];
  pagination: PaginationInfo;
}

export interface GetDummyProductsParams {
  page: number;
  size: number;
  searchText?: string;
  statusFilter?: string;
  categoryFilter?: string;
}

export enum ProductStatus {
  PUBLISHED = "PUBLISH",
  SCHEDULED = "SCHEDULED",
  DRAFT = "DRAFT",
}

export enum TaxType {
  TAX_EXCLUSIVE = "TAX_EXCLUSIVE",
  TAX_INCLUDED = "TAX_INCLUDED",
}

export enum ProductRelationType {
  TAG = "TAG",
  BRAND = "BRAND",
  CATEGORY = "CATEGORY",
}

export interface ImageUrl {
  url: string;
  isMain: boolean;
}

export interface TaxInfo {
  taxType: TaxType;
  taxAmount?: number;
  taxPercent?: number;
}

export interface PromoteInfo {
  promoteStatus: boolean;
  discountType?: "PERCENTAGE" | "AMOUNT";
  discountValue?: number;
  promotePercent?: number;
  promoteAmount?: number;
  startDate?: string;
  endDate?: string;
}

// export interface ProductVariant {
//   id?: number;
//   name: string;
//   : number;
//   sellingPrice: number;
//   quantity: number;
//   sku: string;
//   // barcode?: string | null
//   // promoteInfo: PromoteInfo;
// }

export enum ProductSortOption {
  NEWEST = "newest",
  OLDEST = "oldest",
  PRICE_LOW_HIGH = "priceLowHigh",
  PRICE_HIGH_LOW = "priceHighLow",
  NAME_ASC = "nameAsc",
  NAME_DESC = "nameDesc",
  CATEGORY_ASC = "categoryAsc",
  CATEGORY_DESC = "categoryDesc",
  QUANTITY_LOW_HIGH = "quantityLowHigh",
  QUANTITY_HIGH_LOW = "quantityHighLow",
  STATUS_ASC = "statusAsc",
  STATUS_DESC = "statusDesc",
}

interface meta {
  limit: number;
  page: number;
  total: number;
}
export interface GetProductsParams {
  sort?: ProductSortOption;
  page?: number;
  limit?: number;
  searchText?: string;
}

export interface GetProductsResponse {
  status: boolean;
  message: string;
  data: Product[];
  meta: meta;
}

export interface Category {
  id: number;
  name: string;
  discription: string;
  status: boolean;
  categoryVariantGroups: CategoryVariantGroup[];
}

export interface CategoryVarientValue {
  id: number;
  value: string;
}

export interface CategoryVariantGroup {
  id: number;
  name: string;
  values: CategoryVarientValue[];
}
export interface getCategoriesResponse {
  status: boolean;
  message: string;
  data: Category[];
  meta: meta;
}

export interface GetProductByIdResponse {
  status: boolean;
  message: string;
  data: Product;
}

export interface VariantCombination {
  id: string;
  name: string;
  sku: string;
  purchasePrice: number;
  sellingPrice: number;
  quantity: number;
  combination?: { [key: string]: string };
  weightValue?: number;
  weightUnit?: string;
  sizeValue?: string;
  sizeUnit?: string;
}

export interface VariantValue {
  id: string;
  value: string;
}

export interface VariantOption {
  id: string;
  name: string;
  values: VariantValue[];
}