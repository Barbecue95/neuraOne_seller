"use client";
import type { UseFormReturn, Path } from "react-hook-form";
import { useWatch } from "react-hook-form";
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
import { Trash2, XCircleIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { CreateProductPayload } from "./product-form-schema";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";
import { handleInputAmountChange } from "@/utils/numberFormat";
import { Dialog } from "@/components/ui/dialog";
import VariantEditDialog from "./variant-edit-dialog";
import { VariantCombination, VariantOption } from "@/types/product.types";

interface VariantSectionProps {
  form: UseFormReturn<CreateProductPayload>;
  categoryVariantGroups: any[];
  existingVariants?: VariantCombination[];
  isDuplicate?: boolean;
}

export default function VariantSection({
  form,
  categoryVariantGroups,
  existingVariants = [],
  isDuplicate = false,
}: VariantSectionProps) {
  const {
    control,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = form;

  // 1) Build variant-options from categoryVariantGroups
  const [variantOptions, setVariantOptions] = useState<VariantOption[]>([]);
  useEffect(() => {
    if (categoryVariantGroups?.[0]?.length) {
      const groups = categoryVariantGroups[0].map((v: any) => v.variantGroup);
      setVariantOptions(groups);
    } else {
      setVariantOptions([]);
    }
  }, [categoryVariantGroups]);

  // 2) On duplicate: clear each SKU & zero out quantity in form
  useEffect(() => {
    if (!isDuplicate) return;
    const curr = (getValues("variants") as VariantCombination[]) || [];
    const resetVars = curr.map((v) => ({
      ...v,
      sku: "",
      quantity: 0,
    }));
    setValue("variants", resetVars, { shouldValidate: true });
  }, [isDuplicate, getValues, setValue]);

  // 3) Auto-generate combos when SKU/prices/options change
  useEffect(() => {
    const existing = (getValues("variants") as VariantCombination[]) || [];
    if (
      existing.length ||
      !variantOptions.length ||
      variantOptions.some((o) => o.values.length === 0)
    ) {
      setValue(
        "variants",
        existing.map((v) => ({
          ...v,
          sellingPrice: watch("sellingPrice"),
          purchasePrice: watch("purchasePrice"),
        })),
        { shouldValidate: true },
      );
      return;
    }
    const combos: Record<string, string>[] = [];

    const recurse = (idx: number, curr: Record<string, string>) => {
      if (idx === variantOptions.length) {
        combos.push({ ...curr });
        return;
      }
      const opt = variantOptions[idx];
      opt.values.forEach((v) =>
        recurse(idx + 1, { ...curr, [opt.name]: v.value }),
      );
    };
    recurse(0, {});

    const baseSku = getValues("sku") || "SKU";
    const newVars: VariantCombination[] = combos.map((comb, i) => ({
      id: `variant-${i + 1}`,
      name: Object.values(comb).join("-"),
      sku: `${baseSku}-${Object.values(comb).join("-")}`,
      purchasePrice: getValues("purchasePrice") || 0,
      sellingPrice: getValues("sellingPrice") || 0,
      quantity: 0,
      combination: comb,
    }));
    
    setValue("variants", newVars, { shouldValidate: true });
  }, [
    variantOptions,
    watch("sku"),
    watch("purchasePrice"),
    watch("sellingPrice"),
    getValues,
    setValue,
  ]);

  // 4) Sync variantValues from options
  useEffect(() => {
    const ids = variantOptions
      .map((v) => v.values.map((val) => Number(val.id)))
      .flat();
    setValue("variantValues", ids, { shouldValidate: true });
  }, [variantOptions, setValue]);

  // 5) Watch the variants array from RHF
  const variants =
    (useWatch({ control, name: "variants" }) as VariantCombination[]) || [];

  // 6) Selection & batch delete
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  const toggleVariantSelection = (id: string) =>
    setSelectedVariants((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  const toggleSelectAll = () =>
    setSelectedVariants((prev) =>
      prev.length === variants.length ? [] : variants.map((v) => v.id!),
    );
  const deleteSelected = () => {
    const kept = variants.filter((v) => !selectedVariants.includes(v.id!));
    setValue("variants", kept, { shouldValidate: true });
    toast.info("Variant deleted successfully !!");
    setSelectedVariants([]);
  };

  // 7) Field-level updates
  type FieldKey = "purchasePrice" | "sellingPrice" | "quantity" | "sku";
  const updateField = (
    idx: number,
    field: FieldKey,
    value: VariantCombination[FieldKey],
  ) => {
    const path = `variants.${idx}.${field}` as Path<CreateProductPayload>;
    setValue(path, value, { shouldValidate: true });
  };
  const updateFields = (
    idx: number,
    data: Partial<Pick<VariantCombination, FieldKey>>,
  ) => {
    (Object.keys(data) as FieldKey[]).forEach((field) => {
      const path = `variants.${idx}.${field}` as Path<CreateProductPayload>;
      setValue(path, data[field] as any, {
        shouldValidate: true,
      });
    });
  };

  // 8) Dialog state
  const [dialogSelectedVariant, setDialogSelectedVariant] =
    useState<VariantCombination | null>(null);

  // 9) Remove a single option-value
  const removeValueFromOption = (optionId: string, valueId: string) => {
    const opt = variantOptions.find((o) => o.id === optionId);
    if (!opt) return;
    const val = opt.values.find((v) => v.id === valueId);
    if (!val) return;
    const newOpts = variantOptions.reduce<VariantOption[]>((acc, o) => {
      if (o.id === optionId) {
        const filtered = o.values.filter((v) => v.id !== valueId);
        if (filtered.length) {
          acc.push({ ...o, values: filtered });
        }
      } else acc.push(o);
      return acc;
    }, []);
    setVariantOptions(newOpts);

    const curr = (getValues("variants") as VariantCombination[]) || [];
    const pruned = curr
      .filter((v) => v.combination?.[opt.name] !== val.value)
      .map((v) => {
        if (!newOpts.some((n) => n.name === opt.name) && v.combination) {
          const { [opt.name]: _, ...rest } = v.combination;
          return { ...v, combination: rest };
        }
        return v;
      });
    setValue("variants", pruned, { shouldValidate: true });
  };

  return (
    <Dialog
      open={!!dialogSelectedVariant}
      onOpenChange={(open) => {
        if (!open) setDialogSelectedVariant(null);
      }}
    >
      <Card>
        <CardHeader>
          <div className="flex h-8 items-center justify-between">
            <CardTitle className="inline-block text-xl font-medium">
              Variant
            </CardTitle>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={deleteSelected}
              className={cn([
                "w-fit cursor-pointer",
                { hidden: selectedVariants.length <= 0 },
              ])}
            >
              <Trash2 className="mr-1 h-4 w-4" />
              Delete
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Option titles */}
          {existingVariants.length <= 0 && (
            <div
              className={cn([
                "flex flex-row gap-4",
                { hidden: variantOptions.length === 0 },
              ])}
            >
              <div className="flex-1">
                <div className="mb-2 text-lg font-medium">Option title</div>
                <div className="space-y-3">
                  {variantOptions.map((opt) => (
                    <Badge
                      key={opt.id}
                      variant="outline"
                      className="line-clamp-1 flex w-28 !items-center justify-between gap-2 rounded-3xl p-4 text-xl font-medium capitalize"
                      asChild
                    >
                      <span>{opt.name}</span>
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex-2/3">
                <div className="mb-2 text-lg font-medium">Option values</div>
                <div className="space-y-3">
                  {variantOptions.map((opt) => (
                    <div key={opt.id} className="space-y-2">
                      <div className="flex flex-wrap gap-2.5 rounded-3xl border px-4 py-2.5">
                        {opt.values.map((val) => (
                          <Badge
                            key={val.id}
                            className="bg-primary flex gap-3 rounded-full px-2.5 py-1 text-xl font-medium text-white"
                            asChild
                          >
                            <span>
                              {val.value}
                              <button
                                onClick={() =>
                                  removeValueFromOption(opt.id, val.id)
                                }
                                className="no-row-click rounded-full hover:bg-black/20"
                              >
                                <XCircleIcon className="size-[18px] translate-y-0.5" />
                              </button>
                            </span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* Variants table or empty */}
          {variants.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="border-t !border-b-0 border-[#A1A1A1B2]">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedVariants.length === variants.length &&
                        variants.length > 0
                      }
                      onCheckedChange={toggleSelectAll}
                      className="border-[#303030] data-[state=checked]:!bg-[#3C3C3C]"
                    />
                  </TableHead>
                  <TableHead>Variants</TableHead>
                  <TableHead>Buying price</TableHead>
                  <TableHead>Selling price</TableHead>
                  {isDuplicate ? (
                    <TableHead>Sku</TableHead>
                  ) : (
                    <TableHead>Stock</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {variants.map((variant, idx) => {
                  const errRow = (errors.variants?.[idx] ?? {}) as any;
                  return (
                    <TableRow
                      key={variant.id}
                      onClick={(e) => {
                        const target = e.target as HTMLElement;
                        if (
                          target.closest(
                            "input, button, a, select, textarea, .no-row-click",
                          )
                        ) {
                          return;
                        }
                        setDialogSelectedVariant(variant);
                      }}
                      className="cursor-pointer border-none"
                    >
                      <TableCell>
                        <Checkbox
                          checked={selectedVariants.includes(variant.id!)}
                          onCheckedChange={() =>
                            toggleVariantSelection(variant.id!)
                          }
                          className="border-[#303030] data-[state=checked]:!bg-[#3C3C3C]"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {variant.name}
                      </TableCell>
                      <TableCell>
                        <div className="relative w-24">
                          <Input
                            type="text"
                            value={variant.purchasePrice}
                            onChange={(e) =>
                              updateField(
                                idx,
                                "purchasePrice",
                                handleInputAmountChange(e),
                              )
                            }
                            className="h-8 w-24"
                          />
                          <span className="absolute top-1/2 -right-5 -translate-y-1/2 transform text-gray-500">
                            Ks
                          </span>
                        </div>
                        {errRow.purchasePrice && (
                          <p className="text-destructive mt-1 text-xs">
                            {errRow.purchasePrice.message}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="relative w-24">
                          <Input
                            type="text"
                            value={variant.sellingPrice}
                            onChange={(e) =>
                              updateField(
                                idx,
                                "sellingPrice",
                                handleInputAmountChange(e),
                              )
                            }
                            className="h-8 w-24"
                          />
                          <span className="absolute top-1/2 -right-5 -translate-y-1/2 transform text-gray-500">
                            Ks
                          </span>
                        </div>
                        {errRow.sellingPrice && (
                          <p className="text-destructive mt-1 text-xs">
                            {errRow.sellingPrice.message}
                          </p>
                        )}
                      </TableCell>
                      {isDuplicate ? (
                        <TableCell>
                          <Input
                            type="text"
                            value={variant.sku}
                            onChange={(e) =>
                              updateField(idx, "sku", e.target.value)
                            }
                            className="h-8 w-20"
                          />
                          {errRow.sku && (
                            <p className="text-destructive mt-1 text-xs">
                              {errRow.sku.message}
                            </p>
                          )}
                        </TableCell>
                      ) : (
                        <TableCell>
                          <Input
                            type="text"
                            value={variant.quantity}
                            onChange={(e) =>
                              updateField(
                                idx,
                                "quantity",
                                handleInputAmountChange(e),
                              )
                            }
                            className="h-8 w-20"
                          />
                          {errRow.quantity && (
                            <p className="text-destructive mt-1 text-xs">
                              {errRow.quantity.message}
                            </p>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="space-y-2">
              <Button
                variant="outline"
                className="flex min-h-32 flex-col justify-center rounded-lg border-2 border-dashed border-gray-200 py-8 text-center text-gray-500"
                asChild
              >
                <Link href="#product-info">
                  <p className="text-sm">
                    Variants will appear here once you select a category.
                  </p>
                  <p className="mt-1 text-xs text-gray-400">
                    Select a category to view generated variants
                  </p>
                </Link>
              </Button>

              {/* show the Zod “min(1)” message */}
              {errors.variants?.message && (
                <p className="text-destructive text-xs">
                  {errors.variants.message}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {dialogSelectedVariant && (
        <VariantEditDialog
          variants={variants}
          SelectedVariant={dialogSelectedVariant}
          updateVariantFields={(vid, data) => {
            const i = variants.findIndex((v) => v.id === vid);
            if (i > -1) updateFields(i, data);
          }}
          handleClose={() => setDialogSelectedVariant(null)}
        />
      )}
    </Dialog>
  );
}
