import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  VariantOptionCreateFormSchema,
  VariantOptionCreateFormType,
} from "@/types/product.types";

export default function useCategoryVariant() {
  const form = useForm<VariantOptionCreateFormType>({
    resolver: zodResolver(VariantOptionCreateFormSchema),
    defaultValues: { variantOptions: [] },
  });

  const variants = useFieldArray({
    control: form.control,
    name: "variantOptions",
  });

  return { form, variants };
}
