"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X, Ban } from "lucide-react"
import Image from "next/image"
import { User } from "@/types/users.types"

interface BlockUserModalProps {
  isOpen: boolean
  onClose: () => void
  onBlock: () => void
  user: User | null
}

export function BlockUserModal({ isOpen, onClose, onBlock, user }: BlockUserModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="sm:max-w-md p-0 gap-0 bg-white rounded-2xl border-0 shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer right-4 top-4 z-10 rounded-full p-1 hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

        {/* Modal content */}
        <div className="flex flex-col items-center px-6 py-8 text-center">
          {/* Profile image with block icon */}
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <Image
                src={"/placeholder.svg?height=80&width=80"}
                alt={user?.name || "user"}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Block icon overlay */}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
              <Ban className="h-4 w-4 text-white" />
            </div>
          </div>

          {/* User name */}
          <h2 className="text-lg font-normal text-[#303030] mb-3">{user?.name}</h2>

          {/* Confirmation text */}
          <p className="text-black mb-6 font-medium text-lg">Do you want to block this account?</p>

          {/* Action buttons */}
          <div className="flex gap-3 w-full">
            <Button
              onClick={onClose}
              variant="secondary"
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white border-0 rounded-full py-3 font-medium"
            >
              Cancel
            </Button>
            <Button
              onClick={onBlock}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white border-0 rounded-full py-3 font-medium"
            >
              Block
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
