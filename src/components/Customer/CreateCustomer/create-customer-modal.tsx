"use client";

import type React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Plus, PlusCircle } from "lucide-react";
import { User } from "@/types/users.types";
import { useRegisterUser } from "@/queries/users.queries";

// Zod validation schema
// TODO: Need to separate and move to schema file
const customerSchema = z
  .object({
    customerName: z
      .string()
      .min(2, "Customer name must be at least 2 characters"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    email: z.string().email("Please enter a valid email address"),
    memberLevel: z.string().min(1, "Please select a member level"),
    addressType: z.enum(["local", "other"], {
      required_error: "Please select address type",
    }),
    region: z.string().min(1, "Please select a region"),
    city: z.string().min(1, "Please select a city"),
    township: z.string().min(1, "Please select a township"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    floorNo: z.string().optional(),
    unit: z.string().optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type CustomerFormData = z.infer<typeof customerSchema>;

// API payload interface
// interface CreateCustomerPayload {
//   customer_name: string;
//   phone_number: string;
//   email: string;
//   member_level: string;
//   address_type: "local" | "other";
//   region: string;
//   city: string;
//   township: string;
//   address: string;
//   floor_no?: string;
//   unit?: string;
//   password: string;
// }

interface AddCustomerModalProps {
  trigger?: React.ReactNode;
}

export default function AddCustomerModal({ trigger }: AddCustomerModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      customerName: "",
      phoneNumber: "",
      email: "",
      memberLevel: "",
      addressType: "local",
      region: "",
      city: "",
      township: "",
      address: "",
      floorNo: "",
      unit: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Mock regions, cities, townships data
  const regions = [
    { value: "yangon", label: "Yangon Region" },
    { value: "mandalay", label: "Mandalay Region" },
    { value: "naypyidaw", label: "Naypyidaw" },
    { value: "shan", label: "Shan State" },
  ];

  const cities = [
    { value: "yangon", label: "Yangon" },
    { value: "mandalay", label: "Mandalay" },
    { value: "naypyidaw", label: "Naypyidaw" },
    { value: "taunggyi", label: "Taunggyi" },
  ];

  const townships = [
    { value: "kamayut", label: "Kamayut" },
    { value: "bahan", label: "Bahan" },
    { value: "sanchaung", label: "Sanchaung" },
    { value: "hlaing", label: "Hlaing" },
  ];

  const memberLevels = [
    { value: "bronze", label: "Bronze" },
    { value: "silver", label: "Silver" },
    { value: "gold", label: "Gold" },
    { value: "platinum", label: "Platinum" },
  ];

  // Mock API call function
  // const createCustomerApi = async (payload: CreateCustomerPayload) => {
  //   // Simulate API delay
  //   await new Promise((resolve) => setTimeout(resolve, 2000));

  //   // Mock API response
  //   return {
  //     success: true,
  //     data: {
  //       id: Date.now().toString(),
  //       ...payload,
  //       created_at: new Date().toISOString(),
  //     },
  //   };
  // };

  const { mutateAsync: createCustomer, isLoading } = useRegisterUser();

  const onSubmit = async (data: CustomerFormData) => {
    const payload: Partial<User> = {
      name: data.customerName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      // member_level: data.memberLevel,
      areaType: data.addressType.toLowerCase() === "local" ? "LOCAL" : "OTHER",
      age: 20,
      region: data.region,
      city: data.city,
      township: data.township,
      address: data.address,
      floorNo: data.floorNo || undefined,
      unit: data.unit || undefined,
      password: data.password,
    };
    try {
      console.log("API Payload:", payload);

      const response = await createCustomer(payload);

      if (response.success) {
        console.log("Customer created successfully:", response.data);
        form.reset();
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error creating customer:", error);
    } finally {
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="h-auto cursor-pointer rounded-full bg-[#616FF5] px-4 py-2 font-medium">
            <PlusCircle className="ml-2 size-5" />
            <p className="mr-2 text-lg">Add Customer</p>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="scrollbar-hide max-h-[95vh] overflow-y-auto rounded-[20px] bg-white md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">
            Add new customer
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Customer Name and Phone Number */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-[#303030]">
                      Customer name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-auto rounded-[20px] border border-[#A1A1A1] p-3 text-lg font-normal text-[#A1A1A1]"
                        placeholder="Customer name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-[#303030]">
                      Phone number
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-auto rounded-[20px] border border-[#A1A1A1] p-3 text-lg font-normal text-[#A1A1A1]"
                        placeholder="Phone number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email and Member Level */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-[#303030]">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-auto rounded-[20px] border border-[#A1A1A1] p-3 text-lg font-normal text-[#A1A1A1]"
                        placeholder="Email"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="memberLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-[#303030]">
                      Member level
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-auto min-h-12 w-full rounded-[20px] border border-[#A1A1A1] px-4 py-3 text-sm font-normal text-[#A1A1A1]">
                          <SelectValue placeholder="Member level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {memberLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Address Type */}
              {/* <Label className="text-lg font-medium text-[#303030]">Address</Label>
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="addressType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex items-center space-x-6"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="local" id="local" />
                          <Label htmlFor="local">Local</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Other country</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}

            {/* Region and City */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-[#303030]">
                      Address
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-auto min-h-12 w-full rounded-[20px] border border-[#A1A1A1] px-4 py-3 text-sm font-normal text-[#A1A1A1]">
                          <SelectValue placeholder="Region" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region.value} value={region.value}>
                            {region.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-[#303030] h-7">
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-auto min-h-12 w-full rounded-[20px] border border-[#A1A1A1] px-4 py-3 text-sm font-normal text-[#A1A1A1]">
                          <SelectValue placeholder="City" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city.value} value={city.value}>
                            {city.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Township and Address */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="township"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel className="text-lg font-medium text-[#303030]">
                      Township
                    </FormLabel> */}
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-auto min-h-12 w-full rounded-[20px] border border-[#A1A1A1] px-4 py-3 text-sm font-normal text-[#A1A1A1]">
                          <SelectValue placeholder="Township" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {townships.map((township) => (
                          <SelectItem
                            key={township.value}
                            value={township.value}
                          >
                            {township.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel className="text-lg font-medium text-[#303030]">
                      Address
                    </FormLabel> */}
                    <FormControl>
                      <Input
                        className="h-auto rounded-[20px] border border-[#A1A1A1] p-3 text-lg font-normal text-[#A1A1A1]"
                        placeholder="Address (Optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Floor No and Unit */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="floorNo"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel className="text-lg font-medium text-[#303030]">
                      Floor No (Optional)
                    </FormLabel> */}
                    <FormControl>
                      <Input
                        className="h-auto rounded-[20px] border border-[#A1A1A1] p-3 text-lg font-normal text-[#A1A1A1]"
                        placeholder="Floor No (Optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel className="text-lg font-medium text-[#303030]">
                      Unit (Optional)
                    </FormLabel> */}
                    <FormControl>
                      <Input
                        className="h-auto rounded-[20px] border border-[#A1A1A1] p-3 text-lg font-normal text-[#A1A1A1]"
                        placeholder="Unit (Optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Password Section */}
            <div className="space-y-4">
              <Label className="text-lg font-medium text-[#303030]">Password</Label>

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-auto rounded-[20px] border border-[#A1A1A1] p-3 text-lg font-normal text-[#A1A1A1]"
                        placeholder="password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-auto rounded-[20px] border border-[#A1A1A1] p-3 text-lg font-normal text-[#A1A1A1]"
                        placeholder="confirm password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full cursor-pointer bg-[#616FF5] text-white hover:opacity-80 h-auto py-2.5 rounded-[20px] text-lg font-medium"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
