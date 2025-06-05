"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { X, Plus, MoreHorizontal } from "lucide-react";
import { useQueryParams } from "@/hooks/use-query-params";

interface ProductVariant {
  id: string;
  image: string;
  variants: string;
  buyingPrice: string;
  sellingPrice: string;
  stock: string;
  sku: string;
  barcode: string;
  combination: { [key: string]: string };
}

interface OptionValue {
  id: string;
  value: string;
}

interface ProductOption {
  id: string;
  title: string;
  values: OptionValue[];
}

interface FormData {
  buyingPrice: string;
  sellingPrice: string;
  sku: string;
  barcode: string;
  discountStartDate: string;
  discountEndDate: string;
  discountAmount: string;
  discountPercentage: string;
  options: ProductOption[];
  variants: ProductVariant[];
}

export default function ProductVariantPage() {
  const { setParam } = useQueryParams();
  const [formData, setFormData] = useState<FormData>({
    buyingPrice: "",
    sellingPrice: "",
    sku: "",
    barcode: "",
    discountStartDate: "",
    discountEndDate: "",
    discountAmount: "",
    discountPercentage: "",
    options: [
      {
        id: "size",
        title: "Size",
        values: [
          { id: "s", value: "S" },
          { id: "m", value: "M" },
          { id: "l", value: "L" },
        ],
      },
      {
        id: "color",
        title: "Color",
        values: [
          { id: "blue", value: "Blue" },
          { id: "green", value: "Green" },
          { id: "yellow", value: "Yellow" },
        ],
      },
    ],
    variants: [],
  });

  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  const [newOptionTitle, setNewOptionTitle] = useState("");
  const [newOptionValue, setNewOptionValue] = useState("");

  // Generate all possible variant combinations
  const generateVariantCombinations = (
    options: ProductOption[],
  ): ProductVariant[] => {
    if (
      options.length === 0 ||
      options.some((option) => option.values.length === 0)
    ) {
      return [];
    }

    // Get all combinations
    const combinations: { [key: string]: string }[] = [];

    const generateCombinations = (
      optionIndex: number,
      currentCombination: { [key: string]: string },
    ) => {
      if (optionIndex === options.length) {
        combinations.push({ ...currentCombination });
        return;
      }

      const currentOption = options[optionIndex];
      for (const value of currentOption.values) {
        generateCombinations(optionIndex + 1, {
          ...currentCombination,
          [currentOption.title]: value.value,
        });
      }
    };

    generateCombinations(0, {});

    // Convert combinations to variants
    return combinations.map((combination, index) => {
      const variantName = Object.values(combination).join("-");
      return {
        id: `variant-${index + 1}`,
        image: "",
        variants: variantName,
        buyingPrice: formData.buyingPrice || "0",
        sellingPrice: formData.sellingPrice || "0",
        stock: "0",
        sku: formData.sku ? `${formData.sku}-${index + 1}` : `SKU-${index + 1}`,
        barcode: formData.barcode
          ? `${formData.barcode}${index + 1}`
          : `${Date.now()}${index + 1}`,
        combination,
      };
    });
  };

  // Update variants when options change
  useEffect(() => {
    const newVariants = generateVariantCombinations(formData.options);
    setFormData((prev) => ({
      ...prev,
      variants: newVariants,
    }));
    setSelectedVariants([]); // Clear selection when variants change
  }, [
    formData.options,
    formData.buyingPrice,
    formData.sellingPrice,
    formData.sku,
    formData.barcode,
  ]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVariantFieldChange = (
    variantId: string,
    field: keyof ProductVariant,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      variants: prev.variants.map((variant) =>
        variant.id === variantId ? { ...variant, [field]: value } : variant,
      ),
    }));
  };

  const handleVariantSelection = (variantId: string) => {
    setSelectedVariants((prev) =>
      prev.includes(variantId)
        ? prev.filter((id) => id !== variantId)
        : [...prev, variantId],
    );
  };

  const handleSelectAll = () => {
    if (selectedVariants.length === formData.variants.length) {
      setSelectedVariants([]);
    } else {
      setSelectedVariants(formData.variants.map((v) => v.id));
    }
  };

  const removeOptionValue = (optionId: string, valueId: string) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.map((option) =>
        option.id === optionId
          ? {
              ...option,
              values: option.values.filter((value) => value.id !== valueId),
            }
          : option,
      ),
    }));
  };

  const addOptionValue = (optionId: string) => {
    if (!newOptionValue.trim()) return;

    setFormData((prev) => ({
      ...prev,
      options: prev.options.map((option) =>
        option.id === optionId
          ? {
              ...option,
              values: [
                ...option.values,
                {
                  id: Date.now().toString(),
                  value: newOptionValue.trim(),
                },
              ],
            }
          : option,
      ),
    }));
    setNewOptionValue("");
  };

  const addNewOption = () => {
    if (!newOptionTitle.trim()) return;

    const newOption: ProductOption = {
      id: Date.now().toString(),
      title: newOptionTitle.trim(),
      values: [],
    };

    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, newOption],
    }));
    setNewOptionTitle("");
  };

  const removeOption = (optionId: string) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.filter((option) => option.id !== optionId),
    }));
  };

  const getAllOptionValues = () => {
    return formData.options.flatMap((option) =>
      option.values.map((value) => value.value),
    );
  };

  const handleSaveAsDraft = (data: FormData) => {
    console.log("Save as draft", data);
  };

  const handleNext = (data: FormData) => {
    console.log("Save and Next", data);
    setParam("step", "3");
  };

  return (
    <div className="mx-auto max-w-6xl bg-white p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="mb-2 text-xl font-semibold">Add new product</h1>
        <div className="text-sm text-gray-600">Step 2 of 3</div>
      </div>

      {/* Form Fields */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Buying Price */}
          <div className="space-y-2">
            <Label htmlFor="buyingPrice">Buying Price</Label>
            <Input
              id="buyingPrice"
              value={formData.buyingPrice}
              onChange={(e) => handleInputChange("buyingPrice", e.target.value)}
              className="w-full"
              placeholder="0"
            />
          </div>

          {/* SKU */}
          <div className="space-y-2">
            <Label htmlFor="sku">SKU</Label>
            <Input
              id="sku"
              value={formData.sku}
              onChange={(e) => handleInputChange("sku", e.target.value)}
              className="w-full"
              placeholder="SKU"
            />
          </div>

          {/* Discount Section */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Discount</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate" className="text-sm">
                  Start date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.discountStartDate}
                  onChange={(e) =>
                    handleInputChange("discountStartDate", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate" className="text-sm">
                  End date
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.discountEndDate}
                  onChange={(e) =>
                    handleInputChange("discountEndDate", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm">
                  Amount
                </Label>
                <Input
                  id="amount"
                  value={formData.discountAmount}
                  onChange={(e) =>
                    handleInputChange("discountAmount", e.target.value)
                  }
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="percentage" className="text-sm">
                  Percentage
                </Label>
                <Input
                  id="percentage"
                  value={formData.discountPercentage}
                  onChange={(e) =>
                    handleInputChange("discountPercentage", e.target.value)
                  }
                  placeholder="0%"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Selling Price */}
          <div className="space-y-2">
            <Label htmlFor="sellingPrice">Selling Price</Label>
            <Input
              id="sellingPrice"
              value={formData.sellingPrice}
              onChange={(e) =>
                handleInputChange("sellingPrice", e.target.value)
              }
              className="w-full"
              placeholder="0"
            />
          </div>

          {/* Barcode */}
          <div className="space-y-2">
            <Label htmlFor="barcode">Barcode</Label>
            <Input
              id="barcode"
              value={formData.barcode}
              onChange={(e) => handleInputChange("barcode", e.target.value)}
              className="w-full"
              placeholder="Barcode"
            />
          </div>
        </div>
      </div>

      {/* Variants Section */}
      <div className="mb-8 space-y-6">
        <Label className="text-base font-medium">Variants</Label>

        {/* Options */}
        {formData.options.map((option) => (
          <div key={option.id} className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Option title</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeOption(option.id)}
                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Input value={option.title} readOnly className="bg-gray-50" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm">Option value</Label>
                <div className="flex gap-2">
                  <Input
                    value={newOptionValue}
                    onChange={(e) => setNewOptionValue(e.target.value)}
                    placeholder="Enter option value"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        addOptionValue(option.id);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={() => addOptionValue(option.id)}
                    size="sm"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>

            {/* Option Values */}
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => (
                <Badge
                  key={value.id}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {value.value}
                  <button
                    onClick={() => removeOptionValue(option.id, value.id)}
                    className="ml-1 rounded-full p-0.5 hover:bg-gray-300"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        ))}

        {/* Add New Option */}
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Input
              value={newOptionTitle}
              onChange={(e) => setNewOptionTitle(e.target.value)}
              placeholder="Enter option title"
            />
          </div>
          <Button
            type="button"
            onClick={addNewOption}
            variant="outline"
            size="sm"
          >
            <Plus className="mr-1 h-4 w-4" />
            Add option title
          </Button>
        </div>
      </div>

      {/* Selection Summary */}
      <div className="mb-4">
        <div className="text-sm text-gray-600">
          Select: {getAllOptionValues().join(" ")} ({formData.variants.length}{" "}
          combinations)
        </div>
      </div>

      {/* Variants Table */}
      {formData.variants.length > 0 && (
        <div className="mb-8 rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      selectedVariants.length === formData.variants.length &&
                      formData.variants.length > 0
                    }
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Variants</TableHead>
                <TableHead>Buying price</TableHead>
                <TableHead>Selling price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Barcode</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formData.variants.map((variant) => (
                <TableRow key={variant.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedVariants.includes(variant.id)}
                      onCheckedChange={() => handleVariantSelection(variant.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="h-10 w-10 rounded border bg-gray-200"></div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {variant.variants}
                  </TableCell>
                  <TableCell>
                    <Input
                      value={variant.buyingPrice}
                      onChange={(e) =>
                        handleVariantFieldChange(
                          variant.id,
                          "buyingPrice",
                          e.target.value,
                        )
                      }
                      className="h-8 w-20"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={variant.sellingPrice}
                      onChange={(e) =>
                        handleVariantFieldChange(
                          variant.id,
                          "sellingPrice",
                          e.target.value,
                        )
                      }
                      className="h-8 w-20"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={variant.stock}
                      onChange={(e) =>
                        handleVariantFieldChange(
                          variant.id,
                          "stock",
                          e.target.value,
                        )
                      }
                      className="h-8 w-16"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={variant.sku}
                      onChange={(e) =>
                        handleVariantFieldChange(
                          variant.id,
                          "sku",
                          e.target.value,
                        )
                      }
                      className="h-8 w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={variant.barcode}
                      onChange={(e) =>
                        handleVariantFieldChange(
                          variant.id,
                          "barcode",
                          e.target.value,
                        )
                      }
                      className="h-8 w-32"
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* No Variants Message */}
      {formData.variants.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          <p>Add option values to generate product variants</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 border-t pt-6">
        <Button variant="outline" onClick={() => handleSaveAsDraft(formData)}>
          Save as draft
        </Button>
        <Button
          onClick={() => handleNext(formData)}
          disabled={formData.variants.length === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
