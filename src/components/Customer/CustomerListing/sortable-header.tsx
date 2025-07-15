"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProductSortOption } from "@/types/product.types"
import { UserSortOption } from "@/types/users.types"

interface SortOption {
  label: string
  value: UserSortOption
}

interface SortableHeaderProps {
  title: string
  sortOptions: SortOption[]
}

export const SortableHeader = ({ title, sortOptions }: SortableHeaderProps) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSortChange = (value: UserSortOption) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sortBy", value)
    router.replace(`?${params.toString()}`)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-auto w-full flex justify-start cursor-pointer hover:bg-inherit hover:opacity-90 text-lg p-0 font-medium py-4">
          {title}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-56 p-1 rounded-lg bg-white shadow">
        {sortOptions.map((option, index) => (
          <button
            key={option.value}
            onClick={() => handleSortChange(option.value)}
            className={cn(
              "w-full text-left px-3 py-2 text-sm hover:bg-muted rounded-md",
              index < sortOptions.length - 1 && "border-b border-gray-100"
            )}
          >
            {option.label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  )
}
