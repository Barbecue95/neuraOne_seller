"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { z, ZodError, ZodIssueCode } from "zod";
import { handleInputAmountChange } from "@/utils/numberFormat";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { VariantCombination } from "@/types/product.types";
import { variantSchema } from "./product-form-schema";

// 2) Weight branch
const WeightBranch = variantSchema.extend({
  mode: z.literal("Weight"),
  weightValue: z
    .number({
      invalid_type_error: "Weight value must be a valid number.",
    })
    .nonnegative("Weight value cannot be negative.")
    .optional(),
  weightUnit: z.string().optional(),
});

// 3) Size branch
const SizeBranch = variantSchema.extend({
  mode: z.literal("Size"),
  sizeValue: z.string().optional(),
  sizeUnit: z.string().optional(),
});

// 4) Discriminated union
const VariantEditSchema = z
  .discriminatedUnion("mode", [WeightBranch, SizeBranch])
  .superRefine((data, ctx) => {
    if (data.mode === "Weight") {
      const hasValue = data.weightValue != null;
      const hasUnit = data.weightUnit != null && data.weightUnit !== "";
      if (hasValue !== hasUnit) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: "Weight unit is required when a weight value is provided.",
          path: ["weightUnit"],
        });
      }
    } else if (data.mode === "Size") {
      const hasValue = data.sizeValue != null;
      const hasUnit = data.sizeUnit != null && data.sizeUnit !== "";
      if (hasValue !== hasUnit) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: "Size unit is required when a size value is provided.",
          path: ["sizeUnit"],
        });
      }
    }
  });

const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <FormMessage className={errorMessage ? "opacity-100" : "opacity-0"}>
      {errorMessage || "No error"} {/* Placeholder text */}
    </FormMessage>
  );
};

export default function VariantEditDialog({
  variants,
  SelectedVariant,
  updateVariantFields,
  handleClose,
}: {
  variants: VariantCombination[];
  SelectedVariant: VariantCombination;
  updateVariantFields: (
    variantId: string,
    fieldsToUpdate: Partial<VariantCombination>,
  ) => void;
  handleClose: () => void;
}) {
  // Step#1: grab the fresh data out of the list
  const fresh = useMemo(
    () => variants.find((v) => v.id === SelectedVariant.id) ?? SelectedVariant,
    [variants, SelectedVariant.id],
  );

  // refs
  const skuRef = useRef<HTMLInputElement>(null);
  const bpRef = useRef<HTMLInputElement>(null);
  const spRef = useRef<HTMLInputElement>(null);
  const stRef = useRef<HTMLInputElement>(null);
  const wvRef = useRef<HTMLInputElement>(null);
  const svRef = useRef<HTMLInputElement>(null);

  // discriminated‐union control
  const [mode, setMode] = useState<"Weight" | "Size">(
    fresh.weightValue != null ? "Weight" : "Size",
  );
  const [weightUnit, setWeightUnit] = useState(fresh.weightUnit ?? "kg");
  const [sizeUnit, setSizeUnit] = useState(fresh.sizeUnit ?? "cm");

  // errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // whenever `fresh` changes we clear errors and reset mode/units
  useEffect(() => {
    setMode(fresh.weightValue != null ? "Weight" : "Size");
    setWeightUnit(fresh.weightUnit ?? "kg");
    setSizeUnit(fresh.sizeUnit ?? "cm");
    setErrors({});
  }, [fresh]);

  const handleSave = () => {
    // gather raw values
    const raw = {
      mode,
      sku: skuRef.current?.value.trim() ?? "",
      purchasePrice:
        bpRef.current?.value.trim() === "" ? NaN : Number(bpRef.current?.value),
      sellingPrice:
        spRef.current?.value.trim() === "" ? NaN : Number(spRef.current?.value),
      quantity:
        stRef.current?.value.trim() === "" ? NaN : Number(stRef.current?.value),
      weightValue:
        mode === "Weight"
          ? wvRef.current?.value.trim() === ""
            ? NaN
            : Number(wvRef.current?.value)
          : undefined,
      weightUnit: mode === "Weight" ? weightUnit : undefined,
      sizeValue: mode === "Size" ? svRef.current?.value.trim() : undefined,
      sizeUnit: mode === "Size" ? sizeUnit : undefined,
    };

    const result = VariantEditSchema.safeParse(raw);
    if (!result.success) {
      // flatten errors
      const { fieldErrors } = (result.error as ZodError).flatten();
      const out: Record<string, string> = {};
      for (const key in fieldErrors) {
        const arr = fieldErrors[key];
        if (arr && arr.length) out[key] = arr[0]!;
      }
      setErrors(out);
      return;
    }

    // success
    updateVariantFields(SelectedVariant.id, result.data);
    handleClose();
  };

  return (
    // Step#3: key on fresh.id forces a remount on variant‐change
    <DialogContent
      key={fresh.id}
      className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
    >
      <DialogHeader>
        <DialogTitle>Edit {fresh.name}</DialogTitle>
      </DialogHeader>

      <div>
        <Separator orientation="horizontal" className="bg-gray-200" />

        <h2 className="py-4 text-xl font-medium">Pricing</h2>
        <div className="flex w-full flex-row justify-between gap-4">
          {/* Buying Price */}
          <FormItem className="w-full">
            <FormLabel>
              Buying Price <span className="text-red-500">*</span>
            </FormLabel>
            <div className="relative">
              <Input
                ref={bpRef}
                defaultValue={String(fresh.purchasePrice)}
                type="text"
                placeholder="Buying price"
                className="h-12 rounded-[20px] p-4"
                onChange={(e) => {
                  const v = handleInputAmountChange(e);
                  if (bpRef.current) bpRef.current.value = v;
                }}
              />
              <span className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500">
                Ks
              </span>
            </div>
            <ErrorMessage errorMessage={errors.purchasePrice} />
          </FormItem>

          {/* Selling Price */}
          <FormItem className="w-full">
            <FormLabel>
              Selling Price <span className="text-red-500">*</span>
            </FormLabel>
            <div className="relative">
              <Input
                ref={spRef}
                defaultValue={String(fresh.sellingPrice)}
                type="text"
                placeholder="Selling price"
                className="h-12 rounded-[20px] p-4"
                onChange={(e) => {
                  const v = handleInputAmountChange(e);
                  if (spRef.current) spRef.current.value = v;
                }}
              />
              <span className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500">
                Ks
              </span>
            </div>
            <ErrorMessage errorMessage={errors.sellingPrice} />
          </FormItem>
        </div>

        <h2 className="mb-4 text-xl font-medium">Inventory</h2>
        <div className="flex flex-row items-start gap-4">
          <div className="w-full space-y-4">
            <FormItem>
              <FormLabel>
                Stock <span className="text-red-500">*</span>
              </FormLabel>
              <Input
                ref={stRef}
                defaultValue={String(fresh.quantity)}
                type="text"
                placeholder="Stock"
                className="h-12 rounded-[20px] p-4"
                onChange={(e) => {
                  const v = handleInputAmountChange(e);
                  if (stRef.current) stRef.current.value = v;
                }}
              />
              <ErrorMessage errorMessage={errors.quantity} />
            </FormItem>

            <FormItem>
              <FormLabel>
                SKU <span className="text-red-500">*</span>
              </FormLabel>
              <Input
                ref={skuRef}
                defaultValue={fresh.sku}
                placeholder="SKU"
                className="h-12 rounded-[20px] p-4"
              />
              <ErrorMessage errorMessage={errors.sku} />
            </FormItem>
          </div>

          {/* Weight vs Size (exactly your original markup) */}
          <div className="flex w-full flex-col gap-2">
            <div className="flex w-full flex-row items-end gap-2">
              {mode === "Weight" ? (
                <div className="relative w-2/3">
                  <FormItem className="w-full">
                    <FormLabel className="opacity-0">Weight</FormLabel>
                    <Input
                      ref={wvRef}
                      defaultValue={fresh.weightValue?.toString()}
                      type="text"
                      placeholder="Weight"
                      className="h-12 rounded-[20px] p-4"
                      onChange={(e) => {
                        const v = handleInputAmountChange(e, 5);
                        if (wvRef.current) wvRef.current.value = v;
                      }}
                    />
                  </FormItem>
                  <Select value={weightUnit} onValueChange={setWeightUnit}>
                    <SelectTrigger className="absolute right-0 bottom-0 w-18 min-w-fit rounded-[20px] border-none px-4 py-6">
                      <SelectValue placeholder="Kg" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kg</SelectItem>
                      <SelectItem value="lb">Lb</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div className="relative w-2/3">
                  <FormItem className="w-full">
                    <FormLabel className="opacity-0">Size</FormLabel>
                    <Input
                      ref={svRef}
                      defaultValue={fresh.sizeValue}
                      type="text"
                      placeholder="Size"
                      maxLength={20}
                      className="h-12 rounded-[20px] p-4"
                    />
                  </FormItem>
                  <Select value={sizeUnit} onValueChange={setSizeUnit}>
                    <SelectTrigger className="absolute right-0 bottom-0 w-18 min-w-fit rounded-[20px] border-none px-4 py-6">
                      <SelectValue placeholder="cm" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="in">In</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Select
                value={mode}
                onValueChange={(v) => {
                  setMode(v as any);
                }}
              >
                <SelectTrigger className="w-1/3 min-w-fit rounded-[20px] p-4 py-6">
                  <SelectValue placeholder="Weight" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Weight">Weight</SelectItem>
                  <SelectItem value="Size">Size</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ErrorMessage
              errorMessage={errors.sizeValue || errors.weightValue}
            />
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button
          variant="secondary"
          className="w-1/2 bg-[#a1a1a1] text-white transition-colors duration-300 hover:bg-[#a1a1a1b5]"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button onClick={handleSave} className="w-1/2">
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
