"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export interface VariantCombination {
  id?: string; // Changed to string to align with logic
  name: string;
  purchasePrice: number;
  sellingPrice: number;
  quantity: number;
  sku: string;
}

interface VariantSectionProps {
  existingVariants?: VariantCombination[];
}

export default function EditVariantSection({
  existingVariants = [],
}: VariantSectionProps) {
  const [variants, setVariants] = useState<VariantCombination[]>(existingVariants);
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);

  useEffect(() => {
    setVariants(existingVariants)
  }, [existingVariants])

  const updateVariantField = (
    variantId: string,
    field: keyof VariantCombination,
    value: any,
  ) => {
    setVariants((prev) =>
      prev.map((v) =>
        v.id === variantId ? { ...v, [field]: value } : v,
      ),
    );
  };

  const toggleVariantSelection = (variantId: string) => {
    setSelectedVariants((prev) =>
      prev.includes(variantId)
        ? prev.filter((id) => id !== variantId)
        : [...prev, variantId],
    );
  };

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedVariants(variants.map((v) => v.id!));
    } else {
      setSelectedVariants([]);
    }
  };

  const deleteSelectedVariants = () => {
    setVariants((prev) =>
      prev.filter((v) => !selectedVariants.includes(v.id!)),
    );
    setSelectedVariants([]);
  };

  const deleteVariant = (variantId: string) => {
    setVariants((prev) => prev.filter((v) => v.id !== variantId));
    setSelectedVariants((prev) => prev.filter((id) => id !== variantId));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Variant</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {selectedVariants.length > 0 && (
          <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3">
            <span className="text-sm text-blue-700">
              {selectedVariants.length} variant
              {selectedVariants.length > 1 ? "s" : ""} selected
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

        {variants.length > 0 ? (
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
                      onCheckedChange={(checked) =>
                        toggleSelectAll(checked === true)
                      }
                    />
                  </TableHead>
                  <TableHead>Variant</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Purchase Price</TableHead>
                  <TableHead>Selling Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead className="w-12">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {variants.map((variant) => (
                  <TableRow key={variant.id ?? variant.name}>
                    <TableCell>
                      <Checkbox
                        checked={selectedVariants.includes(variant.id!)}
                        onCheckedChange={() =>
                          toggleVariantSelection(variant.id!)
                        }
                      />
                    </TableCell>
                    <TableCell className="font-medium">{variant.name}</TableCell>
                    <TableCell>
                      <Input
                        value={variant.sku}
                        onChange={(e) =>
                          updateVariantField(variant.id!, "sku", e.target.value)
                        }
                        className="h-8 w-32"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={variant.purchasePrice}
                        onChange={(e) =>
                          updateVariantField(
                            variant.id!,
                            "purchasePrice",
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
                            variant.id!,
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
                        value={variant.quantity}
                        onChange={(e) =>
                          updateVariantField(
                            variant.id!,
                            "quantity",
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
                        onClick={() => deleteVariant(variant.id!)}
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
        ) : (
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
