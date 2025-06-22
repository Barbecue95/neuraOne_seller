"use client";

import type { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { X, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import type {
  ProductVariant,
} from "@/types/product.types";
import { CreateProductPayload } from "./product-form-schema";

interface VariantOption {
  id: string;
  name: string;
  values: VariantValue[];
}

interface VariantValue {
  id: string;
  value: string;
}

export interface VariantCombination {
  id: string;
  name: string;
  sku: string;
  buyingPrice: number;
  sellingPrice: number;
  stock: number;
  combination?: { [key: string]: string };
}

interface VariantSectionProps {
  form: UseFormReturn<CreateProductPayload>;
  categoryVariantGroups: any[];
}

export default function VariantSection({
  form,
  categoryVariantGroups,
}: VariantSectionProps) {
  const sss = categoryVariantGroups?.[0]?.map((variant: any) => {
    console.log("variant.variantGroup", variant.variantGroup);

    return variant.variantGroup;
  });
  const [variantOptions, setVariantOptions] = useState<VariantOption[]>([]);
  useEffect(() => {
    if (sss?.length > 0) {
      setVariantOptions(sss);
    }
    if (sss?.length === 0) {
      setVariantOptions([]);
    }
  }, [categoryVariantGroups]);
  console.log("variant Option", categoryVariantGroups, variantOptions, sss);

  const [variants, setVariants] = useState<VariantCombination[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  const [newOptionTitle, setNewOptionTitle] = useState("");
  const [newOptionValues, setNewOptionValues] = useState<{
    [key: string]: string;
  }>({});
  // Generate all possible variant combinations
  const generateVariantCombinations = () => {
    if (
      variantOptions.length === 0 ||
      variantOptions.some((option) => option.values.length === 0)
    ) {
      setVariants([]);
      return;
    }

    const combinations: { [key: string]: string }[] = [];

    const generateCombinations = (
      optionIndex: number,
      currentCombination: { [key: string]: string },
    ) => {
      if (optionIndex === variantOptions.length) {
        combinations.push({ ...currentCombination });
        return;
      }

      const currentOption = variantOptions[optionIndex];
      for (const value of currentOption.values) {
        generateCombinations(optionIndex + 1, {
          ...currentCombination,
          [currentOption.name]: value.value,
        });
      }
    };

    generateCombinations(0, {});

    // Convert combinations to variants
    const newVariants = combinations.map((combination, index) => {
      const variantName = Object.values(combination).join("-");
      const baseSku = form.getValues("sku") || "SKU";
      const variantSku = `${baseSku}-${Object.values(combination).join("-")}`;

      return {
        id: `variant-${index + 1}`,
        name: variantName,
        sku: variantSku,
        buyingPrice: form.getValues("purchasePrice") || 0,
        sellingPrice: form.getValues("sellingPrice") || 0,
        stock: 0,
        combination,
      };
    });

    setVariants(newVariants);
    setSelectedVariants([]); // Clear selection when variants change
  };
  console.log("Testing 123", variants);
  

  // Generate variants when options change
  useEffect(() => {
    generateVariantCombinations();
  }, [
    variantOptions,
    form.watch("purchasePrice"),
    form.watch("sellingPrice"),
    form.watch("sku"),
  ]);

  // Add new variant option
  const addVariantOption = () => {
    if (!newOptionTitle.trim()) return;

    const newOption: VariantOption = {
      id: Date.now().toString(),
      name: newOptionTitle.trim(),
      values: [],
    };

    setVariantOptions([...variantOptions, newOption]);
    setNewOptionTitle("");
  };

  // Remove variant option
  const removeVariantOption = (optionId: string) => {
    setVariantOptions(
      variantOptions.filter((option) => option.id !== optionId),
    );
  };

  // Add value to variant option
  const addValueToOption = (optionId: string) => {
    const newValue = newOptionValues[optionId]?.trim();
    if (!newValue) return;

    setVariantOptions(
      variantOptions.map((option) =>
        option.id === optionId
          ? {
              ...option,
              values: [
                ...option.values,
                { id: Date.now().toString(), value: newValue },
              ],
            }
          : option,
      ),
    );

    setNewOptionValues({ ...newOptionValues, [optionId]: "" });
  };

  // Remove value from variant option
  const removeValueFromOption = (optionId: string, valueId: string) => {
    setVariantOptions(
      variantOptions.map((option) =>
        option.id === optionId
          ? {
              ...option,
              values: option.values.filter((value) => value.id !== valueId),
            }
          : option,
      ),
    );
  };

  // Handle variant field changes
  const updateVariantField = (
    variantId: string,
    field: keyof VariantCombination,
    value: any,
  ) => {
    setVariants(
      variants.map((variant) =>
        variant.id === variantId ? { ...variant, [field]: value } : variant,
      ),
    );
  };

  // Handle variant selection
  const toggleVariantSelection = (variantId: string) => {
    setSelectedVariants((prev) =>
      prev.includes(variantId)
        ? prev.filter((id) => id !== variantId)
        : [...prev, variantId],
    );
  };

  // Select all variants
  const toggleSelectAll = () => {
    if (selectedVariants.length === variants.length) {
      setSelectedVariants([]);
    } else {
      setSelectedVariants(variants.map((v) => v.id));
    }
  };

  // Delete selected variants
  const deleteSelectedVariants = () => {
    setVariants(
      variants.filter((variant) => !selectedVariants.includes(variant.id)),
    );
    setSelectedVariants([]);
  };

  // Delete single variant
  const deleteVariant = (variantId: string) => {
    setVariants(variants.filter((variant) => variant.id !== variantId));
    setSelectedVariants(selectedVariants.filter((id) => id !== variantId));
  };

  useEffect(() => {
    const productVariants: ProductVariant[] = variants.map((variant) => ({
      name: variant.name,
      sku: variant.sku,
      purchasePrice: variant.buyingPrice,
      sellingPrice: variant.sellingPrice,
      quantity: variant.stock,
    }));

    const valueIds = variantOptions.map( v => v.values.map( value => Number(value.id)));
    form.setValue("variantValues", valueIds.flatMap( ids => ids));
    form.setValue("variants", productVariants);
  }, [variants, variantOptions]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Variant</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Variant Options */}
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-1">
              <div className="mb-2 text-sm font-medium">Option title</div>
              <div className="space-y-3">
                {variantOptions?.map((option) => (
                  <div key={option.id} className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 px-3 py-1"
                    >
                      {option?.name}
                      <button
                        onClick={() => removeVariantOption(option.id)}
                        className="ml-1 rounded-full p-0.5 hover:bg-gray-200"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-3">
              <div className="mb-2 text-sm font-medium">Option values</div>
              <div className="space-y-3">
                {variantOptions?.map((option, optionIndex) => (
                  <div key={option.id} className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {option.values.map((value) => (
                        <Badge
                          key={value.id}
                          className={`bg-blue-500 text-xs text-white`}
                        >
                          {value.value}
                          <button
                            onClick={() =>
                              removeValueFromOption(option.id, value.id)
                            }
                            className="ml-1 rounded-full p-0.5 hover:bg-black/20"
                          >
                            <X className="h-2 w-2" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedVariants?.length > 0 && (
          <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3">
            <span className="text-sm text-blue-700">
              {selectedVariants?.length} variant
              {selectedVariants?.length > 1 ? "s" : ""} selected
            </span>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={deleteSelectedVariants}
              className="ml-auto"
            >
              <Trash2 className="mr-1 h-4 w-4" />
              Delete Selected
            </Button>
          </div>
        )}

        {/* Variants Table */}
        {variants.length > 0 && (
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedVariants.length === variants.length &&
                        variants.length > 0
                      }
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Variants</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Buying price</TableHead>
                  <TableHead>Selling price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="w-12">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {variants.map((variant) => (
                  <TableRow key={variant.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedVariants.includes(variant.id)}
                        onCheckedChange={() =>
                          toggleVariantSelection(variant.id)
                        }
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {variant.name}
                    </TableCell>
                    <TableCell>
                      <Input
                        value={variant.sku}
                        onChange={(e) =>
                          updateVariantField(variant.id, "sku", e.target.value)
                        }
                        className="h-8 w-32"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={variant.buyingPrice}
                        onChange={(e) =>
                          updateVariantField(
                            variant.id,
                            "buyingPrice",
                            Number(e.target.value),
                          )
                        }
                        className="h-8 w-24"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={variant.sellingPrice}
                        onChange={(e) =>
                          updateVariantField(
                            variant.id,
                            "sellingPrice",
                            Number(e.target.value),
                          )
                        }
                        className="h-8 w-24"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={variant.stock}
                        onChange={(e) =>
                          updateVariantField(
                            variant.id,
                            "stock",
                            Number(e.target.value),
                          )
                        }
                        className="h-8 w-20"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteVariant(variant.id)}
                        className="h-8 w-8 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Empty State */}
        {variants.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-gray-200 py-8 text-center text-gray-500">
            <p className="text-sm">No variants generated</p>
            <p className="mt-1 text-xs text-gray-400">
              Add option titles and values to generate product variants
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
