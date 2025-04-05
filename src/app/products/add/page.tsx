"use client";

import React from "react";
import DescriptionPage from "@/components/products/addProduct/DescriptionPage";
import StatusBar from "@/components/products/addProduct/StatusBar";
import PricingPage from "@/components/products/addProduct/PricingPage";
import { useSearchParams } from "next/navigation";
import NextButton from "@/components/products/addProduct/NextButton";
import VariantsPage from "@/components/products/addProduct/VariantPage";

type Props = {};

const Page = (props: Props) => {
  const searchParams = useSearchParams();
  const step = searchParams.get("step") || "description";
  return (
    <div className="w-full gap-3 p-4 flex flex-col">
      <StatusBar />
      {step === "description" && <DescriptionPage />}
      {step === "pricing" && <PricingPage />}
      {step === "variants" && <VariantsPage />}
    </div>
  );
};

export default Page;
