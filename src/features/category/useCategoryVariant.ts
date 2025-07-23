import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CategoryFormType,
  VariantOptionCreateFormSchema,
  VariantOptionCreateFormType,
} from "@/types/product.types";
import { toast } from "sonner";
import {
  useCreateCategory,
  useCreateVariants,
  useUpdateCategory,
  useUpdateVariants,
} from "@/queries/category.queries";
import { useState } from "react";

export default function useCategoryVariant({
  catForm,
  onClose,
  isEditing = false,
}: {
  catForm: ReturnType<typeof useForm<CategoryFormType>>;
  onClose?: () => void;
  isEditing?: boolean;
}) {
  const form = useForm<VariantOptionCreateFormType>({
    resolver: zodResolver(VariantOptionCreateFormSchema),
    defaultValues: { variantOptions: [] },
  });

  const variants = useFieldArray({
    control: form.control,
    name: "variantOptions",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mutations
  const createVariantsMutation = useCreateVariants();
  const updateVariantsMutation = useUpdateVariants();
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();

  const onSave = async (isDraft: boolean = false) => {
    setIsSubmitting(true);
    try {
      // First validate both forms
      const [catFormValid, variantFormValid] = await Promise.all([
        catForm.trigger(),
        form.trigger(),
      ]);

      if (!catFormValid || !variantFormValid) {
        toast.error("Please fill in category information correctly");
        return;
      }

      const categoryData = catForm.getValues();
      console.log("CATEGORY DATA", categoryData);

      let variantGroupIds: string[] = [];

      // If there are variant options, create them first
      const variantData = form.getValues();
      if (variantFormValid && variantData.variantOptions.length > 0) {
        try {
          let variantPromises;
          // Create each variant option individually since API expects single variant
          if (isEditing) {
            console.log("IS EDITING VARIANTS", variantData.variantOptions);

            variantPromises = variantData.variantOptions.map((variantOption) =>
              updateVariantsMutation.mutateAsync({
                id: variantOption.id, // Assuming id is present for editing
                name: variantOption.name,
                variantValues: variantOption.variantValues,
              }),
            );
          } else {
            console.log("IS CREATING VARIANTS", variantData.variantOptions);
            variantPromises = variantData.variantOptions.map((variantOption) =>
              createVariantsMutation.mutateAsync({
                name: variantOption.name,
                variantValues: variantOption.variantValues,
              }),
            );
          }

          // Wait for all variant creations to complete
          const variantResponses = await Promise.all(variantPromises);

          // Check if all variants were created successfully
          const failedVariants = variantResponses.filter(
            (response) => !response.status,
          );

          if (failedVariants.length > 0) {
            toast.error("Failed to create some variant options");
            return;
          }

          variantGroupIds = variantResponses
            .filter((response) => response.status && response.data?.id)
            .map((response) => response.data.id);

          toast.success("Variant options created successfully!");
        } catch (error) {
          console.error("Error creating variants:", error);
          toast.error("Failed to create variant options");
          return;
        }
      }

      // Create category with variant group IDs
      const categoryPayload: CategoryFormType = {
        ...categoryData,
        status: isDraft ? false : true,
        variantGroupIds,
      };

      let categoryResponse;

      if (isEditing) {
        // Use the isEditing flag
        // Assuming categoryData also has an 'id' for updating
        console.log("IS UPDATING CATEGORY", categoryPayload);
        const tranformCategoryData = {
          categoryId: Number(categoryPayload?.id) || 0,
          name: categoryPayload.name,
          description: categoryPayload.description,
          status: !isDraft,
          parentId: null,
          variantGroupIds: categoryPayload.variantGroupIds,
        };
        categoryResponse =
          await updateCategoryMutation.mutateAsync(tranformCategoryData);
      } else {
        console.log("IS CREATING CATEGORY", categoryPayload);

        categoryResponse = await createCategoryMutation.mutateAsync(
          categoryPayload as CategoryFormType,
        );
      }

      if (categoryResponse.status) {
        toast.success(
          `Category ${isDraft ? "saved as draft" : "created"} successfully!`,
        );
        // Reset forms
        catForm.reset();
        form.reset();
        onClose?.();
      } else {
        toast.error("Failed to create category");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("An error occurred while creating category");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, variants, isSubmitting, onSave };
}
