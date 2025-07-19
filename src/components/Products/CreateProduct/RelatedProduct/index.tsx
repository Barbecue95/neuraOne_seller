// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Trash2, Plus, Search } from "lucide-react";
// import { getDummyProducts } from "../../ProductListing/dummy-data";
// import { useQueryParams } from "@/hooks/use-query-params";
// import { useRouter } from "next/navigation";

// interface RelatedProduct {
//   id: string;
//   name: string;
//   image: string;
//   category: string;
//   status: string;
// }

// interface FormData {
//   suggestionMethod: "tag" | "brand" | "category";
//   selectedProducts: RelatedProduct[];
//   activeTab: "auto" | "manual";
// }

// export default function RelatedProductPage() {
//   const { deleteParam } = useQueryParams();
//   const [formData, setFormData] = useState<FormData>({
//     suggestionMethod: "tag",
//     selectedProducts: [],
//     activeTab: "auto",
//   });

//   const [isProductModalOpen, setIsProductModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

//   // Get all available products from dummy data
//   const allProducts = getDummyProducts({
//     page: 1,
//     size: 100, // Get all products
//     searchText: searchQuery,
//   }).data;

//   const handleSuggestionMethodChange = (
//     method: "tag" | "brand" | "category",
//   ) => {
//     setFormData((prev) => ({
//       ...prev,
//       suggestionMethod: method,
//     }));
//   };

//   const handleTabChange = (tab: "auto" | "manual") => {
//     setFormData((prev) => ({
//       ...prev,
//       activeTab: tab,
//     }));
//   };

//   const openProductModal = () => {
//     setIsProductModalOpen(true);
//     setSearchQuery("");
//     setSelectedProductIds([]);
//   };

//   const handleProductSelection = (productId: string) => {
//     setSelectedProductIds((prev) =>
//       prev.includes(productId)
//         ? prev.filter((id) => id !== productId)
//         : [...prev, productId],
//     );
//   };

//   const handleSelectAllProducts = () => {
//     if (selectedProductIds.length === allProducts.length) {
//       setSelectedProductIds([]);
//     } else {
//       setSelectedProductIds(allProducts.map((product) => product.id));
//     }
//   };

//   const addSelectedProducts = () => {
//     const productsToAdd = allProducts
//       .filter((product) => selectedProductIds.includes(product.id))
//       .map((product) => ({
//         id: product.id,
//         name: product.name,
//         image: "", // Placeholder for image
//         category: product.category,
//         status: product.status,
//       }));

//     // Filter out products that are already selected
//     const newProducts = productsToAdd.filter(
//       (product) =>
//         !formData.selectedProducts.some(
//           (selected) => selected.id === product.id,
//         ),
//     );

//     setFormData((prev) => ({
//       ...prev,
//       selectedProducts: [...prev.selectedProducts, ...newProducts],
//     }));

//     setIsProductModalOpen(false);
//     setSelectedProductIds([]);
//   };

//   const removeProduct = (productId: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       selectedProducts: prev.selectedProducts.filter(
//         (product) => product.id !== productId,
//       ),
//     }));
//   };

//   const handleSaveAsDraft = () => {
//     console.log("Save as Draft", formData);
//   };

//   const handlePublish = () => {
//     console.log("Published", formData);
//     deleteParam("step", "/products");
//   };

//   // Filter out already selected products from the modal
//   const availableProducts = allProducts.filter(
//     (product) =>
//       !formData.selectedProducts.some((selected) => selected.id === product.id),
//   );

//   return (
//     <div className="mx-auto max-w-4xl bg-white p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="mb-2 text-xl font-semibold">Add new product</h1>
//         <div className="text-sm text-gray-600">Step 3 of 3</div>
//       </div>

//       {/* Suggest or Related products */}
//       <div className="mb-8">
//         <h2 className="mb-4 text-lg font-medium">
//           Suggest or Related products
//         </h2>

//         <Tabs
//           value={formData.activeTab}
//           onValueChange={(value) => handleTabChange(value as "auto" | "manual")}
//         >
//           <TabsList className="grid w-full max-w-md grid-cols-2">
//             <TabsTrigger value="auto">Auto suggestion</TabsTrigger>
//             <TabsTrigger value="manual">Choose your own</TabsTrigger>
//           </TabsList>

//           {/* Auto Suggestion Tab */}
//           <TabsContent value="auto" className="mt-6">
//             <div className="space-y-4">
//               <RadioGroup
//                 value={formData.suggestionMethod}
//                 onValueChange={(value) =>
//                   handleSuggestionMethodChange(
//                     value as "tag" | "brand" | "category",
//                   )
//                 }
//                 className="space-y-4"
//               >
//                 <div className="flex items-center space-x-3 rounded-lg border p-4">
//                   <RadioGroupItem value="tag" id="tag" />
//                   <Label htmlFor="tag" className="flex-1 cursor-pointer">
//                     Based on tag
//                   </Label>
//                 </div>

//                 <div className="flex items-center space-x-3 rounded-lg border p-4">
//                   <RadioGroupItem value="brand" id="brand" />
//                   <Label htmlFor="brand" className="flex-1 cursor-pointer">
//                     Based on brand
//                   </Label>
//                 </div>

//                 <div className="flex items-center space-x-3 rounded-lg border p-4">
//                   <RadioGroupItem value="category" id="category" />
//                   <Label htmlFor="category" className="flex-1 cursor-pointer">
//                     Based on category
//                   </Label>
//                 </div>
//               </RadioGroup>
//             </div>
//           </TabsContent>

//           {/* Choose Your Own Tab */}
//           <TabsContent value="manual" className="mt-6">
//             <div className="space-y-4">
//               {/* Add Product Button */}
//               <div className="flex justify-end">
//                 <Dialog
//                   open={isProductModalOpen}
//                   onOpenChange={setIsProductModalOpen}
//                 >
//                   <DialogTrigger asChild>
//                     <Button
//                       onClick={openProductModal}
//                       size="sm"
//                       className="flex items-center gap-2"
//                     >
//                       <Plus className="h-4 w-4" />
//                       Add product
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent className="flex max-h-[80vh] max-w-2xl flex-col overflow-hidden">
//                     <DialogHeader>
//                       <DialogTitle>Select Products</DialogTitle>
//                     </DialogHeader>

//                     {/* Search */}
//                     <div className="relative">
//                       <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
//                       <Input
//                         placeholder="Search products..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="pl-10"
//                       />
//                     </div>

//                     {/* Select All */}
//                     <div className="flex items-center space-x-2 border-b py-2">
//                       <Checkbox
//                         checked={
//                           selectedProductIds.length ===
//                             availableProducts.length &&
//                           availableProducts.length > 0
//                         }
//                         onCheckedChange={handleSelectAllProducts}
//                       />
//                       <Label className="text-sm font-medium">
//                         Select All ({availableProducts.length} products)
//                       </Label>
//                     </div>

//                     {/* Product List */}
//                     <div className="flex-1 space-y-2 overflow-y-auto">
//                       {availableProducts.length > 0 ? (
//                         availableProducts.map((product) => (
//                           <div
//                             key={product.id}
//                             className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-gray-50"
//                           >
//                             <Checkbox
//                               checked={selectedProductIds.includes(product.id)}
//                               onCheckedChange={() =>
//                                 handleProductSelection(product.id)
//                               }
//                             />
//                             <div className="h-10 w-10 flex-shrink-0 rounded border bg-gray-200"></div>
//                             <div className="flex-1">
//                               <div className="text-sm font-medium">
//                                 {product.name}
//                               </div>
//                               <div className="text-xs text-gray-500">
//                                 {product.category}
//                               </div>
//                               <div className="text-xs text-gray-400">
//                                 {product.status}
//                               </div>
//                             </div>
//                           </div>
//                         ))
//                       ) : (
//                         <div className="py-8 text-center text-gray-500">
//                           <p>No products found</p>
//                           {searchQuery && (
//                             <p className="text-sm">Try adjusting your search</p>
//                           )}
//                         </div>
//                       )}
//                     </div>

//                     {/* Modal Actions */}
//                     <div className="flex justify-end space-x-2 border-t pt-4">
//                       <Button
//                         variant="outline"
//                         onClick={() => setIsProductModalOpen(false)}
//                       >
//                         Cancel
//                       </Button>
//                       <Button
//                         onClick={addSelectedProducts}
//                         disabled={selectedProductIds.length === 0}
//                       >
//                         Add {selectedProductIds.length} Product
//                         {selectedProductIds.length !== 1 ? "s" : ""}
//                       </Button>
//                     </div>
//                   </DialogContent>
//                 </Dialog>
//               </div>

//               {/* Selected Products List */}
//               <div className="space-y-3">
//                 {formData.selectedProducts.map((product) => (
//                   <div
//                     key={product.id}
//                     className="flex items-center gap-4 rounded-lg border p-3"
//                   >
//                     {/* Product Image Placeholder */}
//                     <div className="h-12 w-12 flex-shrink-0 rounded border bg-gray-200"></div>

//                     {/* Product Info */}
//                     <div className="flex-1">
//                       <div className="text-sm font-medium">{product.name}</div>
//                       <div className="text-xs text-gray-500">
//                         {product.category}
//                       </div>
//                     </div>

//                     {/* Remove Button */}
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => removeProduct(product.id)}
//                       className="h-8 w-8 text-gray-400 hover:text-red-500"
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 ))}

//                 {/* Empty State */}
//                 {formData.selectedProducts.length === 0 && (
//                   <div className="py-8 text-center text-gray-500">
//                     <p>No products selected</p>
//                     <p className="text-sm">
//                       Click "Add product" to select related products
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </TabsContent>
//         </Tabs>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-end space-x-4 border-t pt-6">
//         <Button variant="outline" onClick={handleSaveAsDraft}>
//           Save as draft
//         </Button>
//         <Button onClick={handlePublish}>Publish</Button>
//       </div>
//     </div>
//   );
// }
