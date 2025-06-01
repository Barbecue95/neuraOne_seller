export interface Product {
  id: string
  name: string
  category: string
  stock: number
  status: "Publish" | "Draft" | "Archived"
}

export interface PaginationInfo {
  page: number
  size: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface ProductsResponse {
  data: Product[]
  pagination: PaginationInfo
}

export interface GetDummyProductsParams {
  page: number
  size: number
  searchText?: string
  statusFilter?: string
  categoryFilter?: string
}
