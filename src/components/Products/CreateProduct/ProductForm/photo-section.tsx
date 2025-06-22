"use client"

import type React from "react"

import type { UseFormReturn } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Upload, X, MoreVertical, Star } from "lucide-react"
import { useState } from "react"
import { EditProductPayload } from "@/components/Products/CreateProduct/ProductForm/product-form-schema";

interface PhotoSectionProps {
  form: UseFormReturn<EditProductPayload>
}

interface ImageData {
  id: string
  url: string
  file: File
  isMain: boolean
}

export default function PhotoSection({ form }: PhotoSectionProps) {
  const [images, setImages] = useState<ImageData[]>([])
  const maxImages = 5

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const remainingSlots = maxImages - images.length

    if (files.length > remainingSlots) {
      alert(`You can only upload ${remainingSlots} more image${remainingSlots !== 1 ? "s" : ""}`)
      return
    }

    const newImages: ImageData[] = files.map((file, index) => ({
      id: Date.now().toString() + index,
      url: URL.createObjectURL(file),
      file,
      isMain: images.length === 0 && index === 0, // First image becomes main if no images exist
    }))

    const updatedImages = [...images, ...newImages]
    setImages(updatedImages)

    // Update form with image URLs
    const imageUrls = updatedImages.map((img) => ({
      url: img.url,
      isMain: img.isMain,
    }))
    form.setValue("imageUrl", imageUrls)

    // Reset input
    event.target.value = ""
  }

  const removeImage = (imageId: string) => {
    const imageToRemove = images.find((img) => img.id === imageId)
    if (!imageToRemove) return

    const updatedImages = images.filter((img) => img.id !== imageId)

    // If we're removing the main image, make the first remaining image the main one
    if (imageToRemove.isMain && updatedImages.length > 0) {
      updatedImages[0].isMain = true
    }

    setImages(updatedImages)

    // Update form
    const imageUrls = updatedImages.map((img) => ({
      url: img.url,
      isMain: img.isMain,
    }))
    form.setValue("imageUrl", imageUrls)

    // Revoke URL to free memory
    URL.revokeObjectURL(imageToRemove.url)
  }

  const setAsShowcase = (imageId: string) => {
    const updatedImages = images.map((img) => ({
      ...img,
      isMain: img.id === imageId,
    }))

    setImages(updatedImages)

    // Update form
    const imageUrls = updatedImages.map((img) => ({
      url: img.url,
      isMain: img.isMain,
    }))
    form.setValue("imageUrl", imageUrls)
  }

  const getShowcaseImage = () => {
    return images.find((img) => img.isMain) || images[0]
  }

  const getNonShowcaseImages = () => {
    const showcase = getShowcaseImage()
    return images.filter((img) => img.id !== showcase?.id)
  }

  const renderImageSlot = (image: ImageData, isShowcase = false) => (
    <div
      key={image.id}
      className={`relative ${
        isShowcase ? "w-32 h-32" : "w-20 h-20"
      } border-2 border-dashed border-gray-300 rounded-lg overflow-hidden group`}
    >
      <img src={image.url || "/placeholder.svg"} alt="Product" className="w-full h-full object-cover" />

      {/* Showcase indicator */}
      {isShowcase && (
        <div className="absolute top-1 left-1 bg-yellow-500 text-white rounded-full p-1">
          <Star className="w-3 h-3 fill-current" />
        </div>
      )}

      {/* Menu dropdown */}
      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="bg-black/50 text-white rounded-full p-1 hover:bg-black/70">
              <MoreVertical className="w-3 h-3" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {!isShowcase && (
              <DropdownMenuItem onClick={() => setAsShowcase(image.id)} className="text-sm">
                <Star className="w-3 h-3 mr-2" />
                Set as showcase
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={() => removeImage(image.id)} className="text-sm text-red-600">
              <X className="w-3 h-3 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )

  const renderUploadSlot = () => (
    <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg">
      <label className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-gray-50">
        <Upload className="w-6 h-6 text-gray-400" />
        <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
      </label>
    </div>
  )

  const renderEmptySlot = () => (
    <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50"></div>
  )

  const showcaseImage = getShowcaseImage()
  const otherImages = getNonShowcaseImages()
  const remainingSlots = maxImages - images.length

  return (
    <Card>
      <CardHeader>
        <CardTitle>Photo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-6">
          {/* Showcase Photo */}
          <div className="space-y-2">
            <div className="text-sm font-medium">
              Showcase photo <span className="text-red-500">*</span>
            </div>
            {showcaseImage ? (
              renderImageSlot(showcaseImage, true)
            ) : (
              <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                <div className="text-center text-gray-400">
                  <Upload className="w-8 h-8 mx-auto mb-1" />
                  <div className="text-xs">Upload photos</div>
                </div>
              </div>
            )}
          </div>

          {/* Photos Grid */}
          <div className="space-y-2 flex-1">
            <div className="text-sm font-medium">
              Photos <span className="text-gray-500">(max {maxImages} photos)</span>{" "}
              <span className="text-red-500">*</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {/* Render other uploaded images */}
              {otherImages.map((image) => renderImageSlot(image))}

              {/* Render upload slot if we haven't reached max */}
              {images.length < maxImages && renderUploadSlot()}

              {/* Render empty slots */}
              {/* {Array.from({ length: Math.max(0, maxImages - images.length - 1) }).map((_, index) => renderEmptySlot())} */}
            </div>
          </div>
        </div>

        {/* Upload info */}
        <div className="mt-4 text-xs text-gray-500">
          {images.length}/{maxImages} photos uploaded
          {images.length < maxImages && ` • ${maxImages - images.length} slots remaining`}
        </div>
      </CardContent>
    </Card>
  )
}
