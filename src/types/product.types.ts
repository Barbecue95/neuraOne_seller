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
  SCHEDULED = "SCHEDULE",
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

export interface ProductVariant {
  id?: number;
  name: string;
  purchasePrice: number;
  sellingPrice: number;
  quantity: number;
  sku: string;
  // barcode?: string | null
  // promoteInfo: PromoteInfo;
}

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

