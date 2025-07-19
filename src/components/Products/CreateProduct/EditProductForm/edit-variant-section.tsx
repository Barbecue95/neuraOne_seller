// "use client";

// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Trash2 } from "lucide-react";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { EditProductPayload } from "../ProductForm/product-form-schema";
// import { UseFormReturn } from "react-hook-form";
// import { handleInputAmountChange } from "@/utils/numberFormat";
// import { Dialog } from "@/components/ui/dialog";
// import VariantEditDialog from "../ProductForm/variant-edit-dialog";
// import { VariantCombination } from "@/types/product.types";

// interface VariantSectionProps {
//   form: UseFormReturn<EditProductPayload>;
//   existingVariants?: VariantCombination[];
// }

// export default function EditVariantSection({
//   form,
//   existingVariants = [],
// }: VariantSectionProps) {
//   const [variants, setVariants] =
//     useState<VariantCombination[]>(existingVariants);
//   const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
//   const [dialogSelectedVariant, setDialogSelectedVariant] =
//     useState<VariantCombination | null>(null);

//   useEffect(() => {
//     setVariants(existingVariants);
//   }, [existingVariants]);

//   const updateVariantField = (
//     variantId: string,
//     field: keyof VariantCombination,
//     value: any,
//   ) => {
//     setVariants((prev) =>
//       prev.map((v) => (v.id === variantId ? { ...v, [field]: value } : v)),
//     );
//   };

//   const updateVariantFields = (
//     variantId: string,
//     fieldsToUpdate: Partial<VariantCombination>,
//   ) => {
//     setVariants((prev) =>
//       prev.map((v) => (v.id === variantId ? { ...v, ...fieldsToUpdate } : v)),
//     );
//   };

//   const toggleVariantSelection = (variantId: string) => {
//     setSelectedVariants((prev) =>
//       prev.includes(variantId)
//         ? prev.filter((id) => id !== variantId)
//         : [...prev, variantId],
//     );
//   };

//   const toggleSelectAll = (checked: boolean) => {
//     if (checked) {
//       setSelectedVariants(variants.map((v) => v.id!));
//     } else {
//       setSelectedVariants([]);
//     }
//   };

//   const deleteSelectedVariants = () => {
//     setVariants((prev) =>
//       prev.filter((v) => !selectedVariants.includes(v.id!)),
//     );
//     setSelectedVariants([]);
//   };

//   useEffect(() => {
//     form.setValue("variants", variants);
//   }, [variants]);

//   return (
//     <Dialog
//       open={dialogSelectedVariant !== null}
//       onOpenChange={(open) => {
//         if (!open) setDialogSelectedVariant(null);
//       }}
//     >
//       <Card>
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <CardTitle className="inline-block text-xl font-medium">
//               Variant
//             </CardTitle>
//             {selectedVariants.length > 0 && (
//               <Button
//                 type="button"
//                 size="sm"
//                 variant="destructive"
//                 onClick={deleteSelectedVariants}
//                 className="ml-auto"
//               >
//                 <Trash2 className="mr-1 h-4 w-4" />
//                 Delete
//               </Button>
//             )}
//           </div>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           {variants.length > 0 ? (
//             <div className="rounded-lg border">
//               <Table>
//                 <TableHeader>
//                   <TableRow className="border-t !border-b-0 border-[#A1A1A1B2]">
//                     <TableHead className="w-12">
//                       <Checkbox
//                         checked={
//                           selectedVariants.length === variants.length &&
//                           variants.length > 0
//                         }
//                         onCheckedChange={(checked) =>
//                           toggleSelectAll(checked === true)
//                         }
//                         className="border-[#303030] data-[state=checked]:!bg-[#3C3C3C]"
//                       />
//                     </TableHead>
//                     <TableHead>Variant</TableHead>
//                     <TableHead>Buying price</TableHead>
//                     <TableHead>Selling price</TableHead>
//                     <TableHead>Stock</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {variants.map((variant) => (
//                     <TableRow
//                       key={variant.id}
//                       onClick={(e) => {
//                         const target = e.target as HTMLElement;
//                         if (
//                           target.closest(
//                             "input, button, a, select, textarea, .no-row-click",
//                           )
//                         ) {
//                           return;
//                         }
//                         console.log("variant", variant);

//                         setDialogSelectedVariant(variant);
//                       }}
//                       className="cursor-pointer border-none"
//                     >
//                       <TableCell>
//                         <Checkbox
//                           checked={selectedVariants.includes(variant.id!)}
//                           onCheckedChange={() =>
//                             toggleVariantSelection(variant.id!)
//                           }
//                           className="border-[#303030] data-[state=checked]:!bg-[#3C3C3C]"
//                         />
//                       </TableCell>
//                       <TableCell className="font-medium">
//                         {variant.name}
//                       </TableCell>
//                       <TableCell>
//                         <div className="relative w-24">
//                           <Input
//                             type="text"
//                             value={variant.purchasePrice}
//                             onChange={(e) =>
//                               updateVariantField(
//                                 variant.id!,
//                                 "purchasePrice",
//                                 handleInputAmountChange(e),
//                               )
//                             }
//                             className="h-8 w-24"
//                           />
//                           <span className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500">
//                             Ks
//                           </span>
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <div className="relative w-24">
//                           <Input
//                             type="text"
//                             value={variant.sellingPrice}
//                             onChange={(e) =>
//                               updateVariantField(
//                                 variant.id!,
//                                 "sellingPrice",
//                                 handleInputAmountChange(e),
//                               )
//                             }
//                             className="h-8 w-24"
//                           />
//                           <span className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500">
//                             Ks
//                           </span>
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <Input
//                           type="text"
//                           value={variant.quantity}
//                           onChange={(e) =>
//                             updateVariantField(
//                               variant.id!,
//                               "quantity",
//                               handleInputAmountChange(e),
//                             )
//                           }
//                           className="h-8 w-20"
//                         />
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           ) : (
//             <Button
//               variant="outline"
//               className="flex min-h-32 flex-col justify-center rounded-lg border-2 border-dashed border-gray-200 py-8 text-center text-gray-500"
//               asChild
//             >
//               <Link href="#product-info">
//                 <p className="text-sm">
//                   Variants will appear here once you select a category.
//                 </p>
//                 <p className="mt-1 text-xs text-gray-400">
//                   Select a category to view generated variants
//                 </p>
//               </Link>
//             </Button>
//           )}
//         </CardContent>
//       </Card>
//       {!!dialogSelectedVariant && (
//         <VariantEditDialog
//           variants={variants}
//           SelectedVariant={dialogSelectedVariant}
//           updateVariantFields={updateVariantFields}
//           handleClose={() => setDialogSelectedVariant(null)}
//         />
//       )}
//     </Dialog>
//   );
// }
