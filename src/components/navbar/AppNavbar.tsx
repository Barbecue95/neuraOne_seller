"use client"

import { Search, Bell } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const AppNavbar = () => {
  return (
    <div className="flex items-center justify-between w-full px-8 py-4 bg-white mb-5">
      <h1 className="text-2xl font-medium text-blue-600">Create a New Product</h1>

      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search"
            className="pl-10 pr-16 py-2 w-[300px] rounded-lg border border-gray-200"
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <span className="text-xs text-gray-400">Ctrl K</span>
          </div>
        </div>

        <Bell className="h-5 w-5 text-gray-500" />

        <Avatar className="h-9 w-9 border border-gray-200">
          <AvatarFallback className="bg-gray-100 text-gray-500">JU</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export default AppNavbar;