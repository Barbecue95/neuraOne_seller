import type { Product, GetDummyProductsParams } from "@/types/product.types"

// Generate dummy products
const dummyProducts: Product[] = Array.from({ length: 87 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  quantity: Math.floor(Math.random() * 100),
  sellingPrice: Math.floor(Math.random() * 1000) + 100,
  status: ["PUBLISH", "DRAFT", "SCHEDULE"][i % 3] as "PUBLISH" | "DRAFT" | "SCHEDULE",
  mainCategory: {
    id: (i % 4) + 1,
    name: ["Men's Shoe", "Women's Shoe", "Running Shoe", "Casual Shoe"][i % 4],
  },
}))

export const getDummyProducts = ({
  page,
  size,
  searchText = "",
  statusFilter = "all",
  categoryFilter = "all",
}: GetDummyProductsParams) => {
  let filtered = dummyProducts

  // Apply search filter to name or category
  if (searchText.trim()) {
    const search = searchText.toLowerCase()
    filtered = filtered.filter(
      (product) => product.name.toLowerCase().includes(search) || product.mainCategory.name.toLowerCase().includes(search),
    )
  }

  // Apply status filter
  if (statusFilter !== "all") {
    filtered = filtered.filter((product) => product.status === statusFilter)
  }

  // Apply category filter
  if (categoryFilter !== "all") {
    filtered = filtered.filter((product) => product.mainCategory.name === categoryFilter)
  }

  // Paginate
  const total = filtered.length
  const totalPages = Math.ceil(total / size)
  const start = (page - 1) * size
  const end = start + size
  const paginatedData = filtered.slice(start, end)

  return {
    data: paginatedData,
    pagination: {
      page,
      size,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  }
}

// Get unique categories for filter dropdown
export const getProductCategories = () => {
  const categories = [...new Set(dummyProducts.map((product) => product.mainCategory.name))]
  return categories.sort()
}
