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
  PERCENTAGE = "PERCENTAGE",
  AMOUNT = "AMOUNT",
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
  isPromoted: boolean;
  discountType?: "PERCENTAGE" | "AMOUNT";
  discountValue?: number;
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
  promoteInfo: PromoteInfo;
}

export interface CreateProductPayload {
  name: string;
  description: string;
  // brandId: number
  mainCategoryId: number;
  subCategoryId?: number | null;
  subOneCategoryId?: number | null;
  // tags?: string
  status: ProductStatus;
  scheduleDate?: string;
  imageUrl: ImageUrl[];
  purchasePrice: number;
  sellingPrice: number;
  sku?: string;
  // barcode?: string
  quantity: number;
  weightUnit?: string;
  weightValue?: number;
  taxStatus: boolean;
  // taxInfo?: TaxInfo
  promoteInfo: PromoteInfo;
  variantValues: number[];
  variants: ProductVariant[];
  productRelationType: ProductRelationType;
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

