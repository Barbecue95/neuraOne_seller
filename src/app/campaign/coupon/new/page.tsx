"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { couponCodeSchema } from "@/features/campaign/campaignSchemas";
import { useForm } from "react-hook-form";

import SubNavbar from "@/components/SubNavbar";
import ProductSelect from "@/features/campaign/coupon/NewCoupon/ProductSelect";
import CouponSelect from "@/features/campaign/coupon/NewCoupon/CouponSelect";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

export default function Page() {
  const form = useForm({
    resolver: zodResolver(couponCodeSchema),
    defaultValues: {
      couponCode: "",
      discountUnit: "percentage",
      discount: "",
      limit: null,
      status: "Public",
    },
  });

  return (
    <Form {...form}>
      <SubNavbar title="Create Coupon Code" />
      <form className="flex min-h-[64vh] flex-col gap-5 px-5">
        <div className="flex flex-row gap-5">
          <CouponSelect form={form} />
          <div className="bg-accent w-1/2 p-5">
            <ProductSelect />
          </div>
        </div>
        <div className="flex w-1/2 flex-row gap-2 self-end">
          <Button className="w-1/2" variant="outline">
            Cancel
          </Button>
          <Button type="submit" className="w-1/2">
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
