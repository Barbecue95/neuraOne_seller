"use client";

import type React from "react";

import type { UseFormReturn } from "react-hook-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { X, MoreVertical, Star } from "lucide-react";
import { useState } from "react";
import { EditProductPayload } from "@/components/Products/CreateProduct/ProductForm/product-form-schema";
import IconImagePlus from "@/utils/icons/IconImagePlus";
import { cn } from "@/lib/utils";
import { FormMessage } from "@/components/ui/form";

interface PhotoSectionProps {
  form: UseFormReturn<EditProductPayload>;
}

interface ImageData {
  id: string;
  url: string;
  file: File;
  isMain: boolean;
}

export default function PhotoSection({ form }: PhotoSectionProps) {
  const [images, setImages] = useState<ImageData[]>([]);
  const error = form.getFieldState("imageUrl")?.error;
  const maxImages = 5;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const remainingSlots = maxImages - images.length;

    if (files.length > remainingSlots) {
      alert(
        `You can only upload ${remainingSlots} more image${remainingSlots !== 1 ? "s" : ""}`,
      );
      return;
    }

    const newImages: ImageData[] = files.map((file, index) => ({
      id: Date.now().toString() + index,
      url: URL.createObjectURL(file),
      file,
      isMain: images.length === 0 && index === 0, // First image becomes main if no images exist
    }));

    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);

    // Update form with image URLs
    const imageUrls = updatedImages.map((img) => ({
      url: img.url,
      isMain: img.isMain,
    }));
    form.setValue("imageUrl", imageUrls);
    form.clearErrors("imageUrl");
    // Reset input
    event.target.value = "";
  };

  const removeImage = (imageId: string) => {
    const imageToRemove = images.find((img) => img.id === imageId);
    if (!imageToRemove) return;

    const updatedImages = images.filter((img) => img.id !== imageId);

    // If we're removing the main image, make the first remaining image the main one
    if (imageToRemove.isMain && updatedImages.length > 0) {
      updatedImages[0].isMain = true;
    }

    setImages(updatedImages);

    // Update form
    const imageUrls = updatedImages.map((img) => ({
      url: img.url,
      isMain: img.isMain,
    }));
    form.setValue("imageUrl", imageUrls);

    // Revoke URL to free memory
    URL.revokeObjectURL(imageToRemove.url);
  };

  const setAsShowcase = (imageId: string) => {
    const updatedImages = images.map((img) => ({
      ...img,
      isMain: img.id === imageId,
    }));

    setImages(updatedImages);

    // Update form
    const imageUrls = updatedImages.map((img) => ({
      url: img.url,
      isMain: img.isMain,
    }));
    form.setValue("imageUrl", imageUrls);
  };

  const getShowcaseImage = () => {
    return images.find((img) => img.isMain) || images[0];
  };

  const getNonShowcaseImages = () => {
    const showcase = getShowcaseImage();
    return images.filter((img) => img.id !== showcase?.id);
  };

  const renderImageSlot = (image: ImageData, isShowcase = false) => (
    <div
      key={image.id}
      className={cn([
        "group relative size-36 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 md:size-32",
        { "h-48 w-full md:w-40": isShowcase },
      ])}
    >
      <img
        src={image.url || "/placeholder.svg"}
        alt="Product"
        className="h-full w-full object-cover"
      />

      {/* Showcase indicator */}
      {isShowcase && (
        <div className="absolute top-1 left-1 rounded-full bg-yellow-500 p-1 text-white">
          <Star className="h-3 w-3 fill-current" />
        </div>
      )}

      {/* Menu dropdown */}
      <div className="absolute top-1 right-1 opacity-0 transition-opacity group-hover:opacity-100">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full bg-black/50 p-1 text-white hover:bg-black/70">
              <MoreVertical className="h-3 w-3" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {!isShowcase && (
              <DropdownMenuItem
                onClick={() => setAsShowcase(image.id)}
                className="text-sm"
              >
                <Star className="mr-2 h-3 w-3" />
                Set as showcase
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              onClick={() => removeImage(image.id)}
              className="text-sm text-red-600"
            >
              <X className="mr-2 h-3 w-3" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  const renderUploadSlot = (remainingSlots: number) => {
    if (remainingSlots <= 0) remainingSlots = 4;
    return (
      <>
        {new Array(remainingSlots).fill(0).map((_, index) => (
          <div
            className="size-36 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 md:size-32"
            key={index}
          >
            <label className="flex h-full w-full cursor-pointer items-center justify-center hover:bg-gray-50 hover:dark:bg-neutral-800">
              <IconImagePlus className="h-6 w-6 text-gray-400" />
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        ))}
      </>
    );
  };

  // const renderEmptySlot = () => (
  //   <div className="h-20 w-20 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50"></div>
  // );

  const showcaseImage = getShowcaseImage();
  const otherImages = getNonShowcaseImages();
  // const remainingSlots = maxImages - images.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Photo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Showcase Photo */}
          <div className="space-y-2">
            <div className="text-sm font-medium">
              Showcase photo <span className="text-red-500">*</span>
            </div>
            {showcaseImage ? (
              renderImageSlot(showcaseImage, true)
            ) : (
              <label className="flex h-48 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 md:w-40 dark:bg-transparent hover:dark:bg-neutral-800">
                <div className="text-center text-gray-400">
                  <IconImagePlus className="mx-auto mb-1 h-8 w-8" />
                  <div className="text-xs">Upload photos</div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    hidden
                  />
                </div>
              </label>
            )}
          </div>

          {/* Photos Grid */}
          <div className="flex-1 space-y-2">
            <div className="text-sm font-medium">
              Photos{" "}
              <span className="text-gray-500">(max {maxImages} photos)</span>
              <span className="text-red-500">*</span>
            </div>
            <div className="grid max-w-[600px] grid-cols-2 justify-center gap-2 md:grid-cols-4 md:justify-items-start">
              {/* Render other uploaded images */}
              {otherImages.map((image) => renderImageSlot(image))}

              {/* Render upload slot if we haven't reached max */}
              {images.length < maxImages &&
                renderUploadSlot(
                  images.length > 0 ? maxImages - otherImages.length - 1 : 4,
                )}

              {/* Render empty slots */}
              {/* {Array.from({ length: Math.max(0, maxImages - images.length - 1) }).map((_, index) => renderEmptySlot())} */}
            </div>
          </div>
        </div>

        {/* Upload info */}
        {/* <div className="mt-4 text-xs text-gray-500">
          {images.length}/{maxImages} photos uploaded
          {images.length < maxImages &&
            ` • ${maxImages - images.length} slots remaining`}
        </div> */}
      </CardContent>
      <CardFooter>
        {error && <FormMessage>{error.message}</FormMessage>}
      </CardFooter>
    </Card>
  );
}
