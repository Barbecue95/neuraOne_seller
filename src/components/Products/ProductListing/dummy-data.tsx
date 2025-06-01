import type { Product, GetDummyProductsParams } from "@/types/product.types"

// Generate dummy products
const dummyProducts: Product[] = Array.from({ length: 87 }, (_, i) => ({
  id: `product-${i + 1}`,
  name: `Product ${i + 1}`,
  category: ["Men's Shoe", "Women's Shoe", "Running Shoe", "Casual Shoe"][i % 4],
  stock: Math.floor(Math.random() * 100),
  status: ["Publish", "Draft", "Archived"][i % 3] as "Publish" | "Draft" | "Archived",
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
      (product) => product.name.toLowerCase().includes(search) || product.category.toLowerCase().includes(search),
    )
  }

  // Apply status filter
  if (statusFilter !== "all") {
    filtered = filtered.filter((product) => product.status === statusFilter)
  }

  // Apply category filter
  if (categoryFilter !== "all") {
    filtered = filtered.filter((product) => product.category === categoryFilter)
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
  const categories = [...new Set(dummyProducts.map((product) => product.category))]
  return categories.sort()
}
