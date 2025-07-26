"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, X, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryParams } from "@/hooks/use-query-params";

interface ProductFormData {
  productName: string;
  description: string;
  mainCategory: string;
  subCategory: string;
  productTag: string;
  visibility: "published" | "schedule" | "hidden";
  date: string;
  images: File[];
}

const AddProductForm = () => {
  const router = useRouter();
  const { setParam } = useQueryParams();
  const [formData, setFormData] = useState<ProductFormData>({
    productName: "",
    description: "",
    mainCategory: "",
    subCategory: "",
    productTag: "",
    visibility: "published",
    date: "",
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isUploadingText, setIsUploadingText] = useState(false);
  const maxImages = 10;

  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTextFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if it's a text file
    if (!file.type.startsWith("text/") && !file.name.endsWith(".txt")) {
      alert("Please select a text file (.txt)");
      return;
    }

    setIsUploadingText(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setFormData((prev) => ({
        ...prev,
        description: text,
      }));
      setIsUploadingText(false);
    };

    reader.onerror = () => {
      alert("Error reading file");
      setIsUploadingText(false);
    };

    reader.readAsText(file);

    // Reset the input so the same file can be selected again
    event.target.value = "";
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const remainingSlots = maxImages - formData.images.length;

    if (files.length > remainingSlots) {
      alert(`You can only upload ${remainingSlots} more images`);
      return;
    }

    const newImages = [...formData.images, ...files];
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));

    // Create preview URLs
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
    setImagePreviews(newPreviews);

    // Revoke the URL to free memory
    URL.revokeObjectURL(imagePreviews[index]);
  };

  const handleSaveAsDraft = (data: ProductFormData) => {
    // TODO: API Logic
    console.log("Save as draft:", data);
  };

  const handleNext = (data: ProductFormData) => {
    // TODO: API Logic
    console.log("Next step:", data);
    setParam("step", "2");
  };

  // const handleCancel = () => {
  //   router.push("/products");
  // };

  const renderImageSlots = () => {
    const slots = [];

    // Render uploaded images
    for (let i = 0; i < imagePreviews.length; i++) {
      slots.push(
        <div
          key={`image-${i}`}
          className="relative aspect-square overflow-hidden rounded border-2 border-dashed border-gray-300 bg-gray-200"
        >
          <img
            src={imagePreviews[i] || "/placeholder.svg"}
            alt={`Product ${i + 1}`}
            className="h-full w-full object-cover"
          />
          <button
            onClick={() => removeImage(i)}
            className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white hover:bg-red-600"
          >
            <X className="h-3 w-3" />
          </button>
        </div>,
      );
    }

    // Render add slot
    // if (imagePreviews.length < maxImages) {
    //   slots.push(
    //     <div className="aspect-square rounded border-2 border-dashed border-gray-300 bg-gray-200">
    //       <label className="flex h-full w-full cursor-pointer items-center justify-center hover:bg-gray-100">
    //         <Upload className="h-6 w-6 text-gray-400" />
    //         <input
    //           type="file"
    //           multiple
    //           accept="image/*"
    //           onChange={handleImageUpload}
    //           className="hidden"
    //         />
    //       </label>
    //     </div>,
    //   );
    // }

    return slots;
  };

  return (
    <div className="mx-auto w-full bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="mb-2 text-xl font-semibold">Add new product</h1>
        <div className="text-sm text-gray-600">Step 1 of 3</div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column - Form Fields */}
        <div className="space-y-6">
          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="productName">Product name</Label>
            <Input
              id="productName"
              value={formData.productName}
              onChange={(e) => handleInputChange("productName", e.target.value)}
              className="w-full"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description">Description</Label>
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  disabled={isUploadingText}
                  asChild
                >
                  <label className="cursor-pointer">
                    {isUploadingText ? (
                      <>
                        <div className="mr-1 h-3 w-3 animate-spin rounded-full border border-gray-400 border-t-transparent" />
                        Loading...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-1 h-3 w-3" />
                        Upload txt
                      </>
                    )}
                    <input
                      type="file"
                      accept=".txt,text/plain"
                      onChange={handleTextFileUpload}
                      className="hidden"
                    />
                  </label>
                </Button>
              </div>
            </div>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="h-24 w-full resize-none"
              placeholder="Enter product description or upload a text file..."
            />
            {formData.description && (
              <div className="text-xs text-gray-500">
                {formData.description.length} characters
              </div>
            )}
          </div>

          {/* Main Category */}
          <div className="space-y-2">
            <Label>Main category</Label>
            <Select
              value={formData.mainCategory}
              onValueChange={(value) =>
                handleInputChange("mainCategory", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select main category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="shoes">Shoes</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sub Category */}
          <div className="space-y-2">
            <Label>Sub category</Label>
            <Select
              value={formData.subCategory}
              onValueChange={(value) => handleInputChange("subCategory", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select sub category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="running">Running Shoes</SelectItem>
                <SelectItem value="casual">Casual Shoes</SelectItem>
                <SelectItem value="formal">Formal Shoes</SelectItem>
                <SelectItem value="sports">Sports Shoes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Product Tag */}
          <div className="space-y-2">
            <Label htmlFor="productTag">Product tag</Label>
            <Input
              id="productTag"
              value={formData.productTag}
              onChange={(e) => handleInputChange("productTag", e.target.value)}
              className="w-full"
            />
          </div>

          {/* Visibility */}
          <div className="space-y-3">
            <Label>Visibility</Label>
            <RadioGroup
              value={formData.visibility}
              onValueChange={(value) => handleInputChange("visibility", value)}
              className="flex items-center space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="published" id="published" />
                <Label htmlFor="published" className="text-sm font-normal">
                  Published
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="schedule" id="schedule" />
                <Label htmlFor="schedule" className="text-sm font-normal">
                  Schedule
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hidden" id="hidden" />
                <Label htmlFor="hidden" className="text-sm font-normal">
                  Hidden
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="grid grid-cols-3 gap-3">
          {/* Primary Image */}
          <div className="col-span-1 flex flex-col space-y-4">
            <div className="text-sm text-gray-600">Primary photo</div>
            <div className="relative aspect-square overflow-hidden rounded border-2 border-dashed border-gray-300 bg-gray-200">
              <img
                src={imagePreviews[0] || "/placeholder.svg"}
                alt={`Primary Product`}
                className="h-full w-full object-cover"
              />
              <button className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white hover:bg-red-600">
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
          {/* Image Upload */}
          <div className="col-span-2 space-y-4">
            {/* Upload Button */}
            <div className="mb-2 flex gap-2 space-y-2">
              <div className="flex flex-col items-center justify-center">
                {imagePreviews.length >= 0 &&
                  imagePreviews.length < maxImages && (
                    <div className="">
                      <label className="inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Images
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                <div className="text-sm text-gray-600">
                  Photos (max {maxImages} photos)
                </div>
              </div>
            </div>
            {/* Image Grid */}
            <div className="grid grid-cols-3 gap-3">{renderImageSlots()}</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-end space-x-4 border-t pt-6">
        <Button variant="outline" onClick={() => handleSaveAsDraft(formData)}>
          Save as draft
        </Button>
        <Button onClick={() => handleNext(formData)}>Next</Button>
      </div>
    </div>
  );
};

export default AddProductForm;
