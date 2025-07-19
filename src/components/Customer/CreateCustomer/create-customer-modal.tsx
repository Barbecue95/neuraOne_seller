"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
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
import { Label } from "@/components/ui/label";
import { Loader2, Plus, PlusCircle } from "lucide-react";
import { User } from "@/types/users.types";
import { useRegisterUser } from "@/queries/users.queries";
import {
  useGetCities,
  useGetRegions,
  useGetTownships,
} from "@/queries/location.queries";
import { City, Region, Township } from "@/types/location.types";

// Zod validation schema
// TODO: Need to separate and move to schema file
const customerSchema = z
  .object({
    customerName: z
      .string()
      .min(2, "Customer name must be at least 2 characters"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
    email: z.string().email("Please enter a valid email address"),
    // memberLevel: z.string().min(1, "Please select a member level"),
    gender: z.string().min(1, "Please select gender"),
    // addressType: z.enum(["local", "other"], {
    //   required_error: "Please select address type",
    // }),
    regionId: z.number().min(1, "Please select a region"),
    cityId: z.union([z.number().min(1), z.undefined()]).optional(), // Make city optional
    townshipId: z.union([z.number().min(1), z.undefined()]).optional(),
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
      // memberLevel: "",
      gender: "",
      // addressType: "local",
      regionId: undefined,
      cityId: undefined,
      townshipId: undefined,
      address: "",
      floorNo: "",
      unit: "",
      password: "",
      confirmPassword: "",
    },
  });

  const selectedRegionId = useWatch({ control: form.control, name: "regionId" });
  const selectedCityId = useWatch({ control: form.control, name: "cityId" });

  // Reset dependent selects
  useEffect(() => {
    form.setValue("cityId", undefined);
    form.setValue("townshipId", undefined);
  }, [selectedRegionId]);

  useEffect(() => {
    form.setValue("townshipId", undefined);
  }, [selectedCityId]);

  const { data: regions } = useGetRegions();
  const { data: cities } = useGetCities(selectedRegionId?.toString() ?? "");
  const { data: townships } = useGetTownships(selectedCityId?.toString() ?? "");

  const filterRegions = regions?.data || [];
  // Filter cities based on selected region
  const filteredCities = cities?.data || [];

  // Filter townships based on selected city
  const filteredTownships = townships?.data || [];

  // Reset city and township when region changes
  useEffect(() => {
    form.setValue("cityId", undefined);
    form.setValue("townshipId", undefined);
  }, [selectedRegionId, form.setValue]);

  // Reset township when city changes
  useEffect(() => {
    form.setValue("townshipId", undefined);
  }, [selectedCityId, form.setValue]);

  const memberLevels = [
    { value: "bronze", label: "Bronze" },
    { value: "silver", label: "Silver" },
    { value: "gold", label: "Gold" },
    { value: "platinum", label: "Platinum" },
  ];
  const genders = [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" },
    { id: 3, name: "Other" },
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
      gender: genders[Number(data.gender)]?.name,
      // areaType: data.addressType.toLowerCase() === "local" ? "LOCAL" : "OTHER",
      // age: 20,
      regionId: data.regionId,
      cityId: data.cityId,
      townshipId: data.townshipId,
      address: data.address,
      floorNo: data.floorNo || undefined,
      unit: data.unit || undefined,
      password: data.password,
      role: "USER",
    };
    console.log("API Payload:", payload);

    await createCustomer(payload)
      .then((response) => {
        console.log("Customer created successfully:", response.data);
        form.reset();
        setIsOpen(false);
      })
      .catch((error) => {
        console.log("Error creating customer:", error?.response?.data?.error);
      });
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
      <DialogContent className="scrollbar-hide max-h-[95vh] overflow-y-auto rounded-[20px] bg-white dark:bg-gray-900 md:max-w-2xl">
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
                    <FormLabel className="text-lg font-medium text-[#303030] dark:text-white">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-auto rounded-[20px] border border-[#A1A1A1] p-3 text-lg font-normal text-[#A1A1A1]"
                        placeholder="Name"
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
                    <FormLabel className="text-lg font-medium text-[#303030] dark:text-white">
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

            {/* Email and Gender */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-[#303030] dark:text-white">
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
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-[#303030] dark:text-white">
                      Gender
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-auto min-h-12 w-full rounded-[20px] border border-[#A1A1A1] px-4 py-3 text-sm font-normal text-[#A1A1A1]">
                          <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genders.map((gender) => (
                          <SelectItem
                            key={gender.id}
                            value={gender.id?.toString()}
                          >
                            {gender.name}
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
            {/* <Label className="text-lg font-medium text-[#303030] dark:text-white">Address</Label>
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
                name="regionId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-medium text-[#303030] dark:text-white">
                      Address
                    </FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(Number(value));
                      }}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="h-auto min-h-12 w-full rounded-[20px] border border-[#A1A1A1] px-4 py-3 text-sm font-normal text-[#A1A1A1]">
                          <SelectValue placeholder="Region" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filterRegions.map((region: Region) => (
                          <SelectItem
                            key={region.id}
                            value={region.id.toString()}
                          >
                            {region.name}
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
                name="cityId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="h-7 text-lg font-medium text-[#303030] dark:text-white"></FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(Number(value));
                      }}
                      defaultValue={field.value?.toString()}
                      disabled={!selectedRegionId}
                    >
                      <FormControl>
                        <SelectTrigger className="h-auto min-h-12 w-full rounded-[20px] border border-[#A1A1A1] px-4 py-3 text-sm font-normal text-[#A1A1A1]">
                          <SelectValue placeholder="City" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filteredCities.map((city: City) => (
                          <SelectItem key={city.id} value={city.id.toString()}>
                            {city.name}
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
                name="townshipId"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel className="text-lg font-medium text-[#303030] dark:text-white">
                      Township
                    </FormLabel> */}
                    <Select
                      onValueChange={(value) => {
                        field.onChange(Number(value));
                      }}
                      value={field.value?.toString()}
                      disabled={!selectedCityId}
                    >
                      <FormControl>
                        <SelectTrigger className="h-auto min-h-12 w-full rounded-[20px] border border-[#A1A1A1] px-4 py-3 text-sm font-normal text-[#A1A1A1]">
                          <SelectValue placeholder="Township" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filteredTownships.map((township: Township) => (
                          <SelectItem
                            key={township.id}
                            value={township.id.toString()}
                          >
                            {township.name}
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
                    {/* <FormLabel className="text-lg font-medium text-[#303030] dark:text-white">
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
                    {/* <FormLabel className="text-lg font-medium text-[#303030] dark:text-white">
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
                    {/* <FormLabel className="text-lg font-medium text-[#303030] dark:text-white">
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
              <Label className="text-lg font-medium text-[#303030] dark:text-white">
                Password
              </Label>

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="h-auto rounded-[20px] border border-[#A1A1A1] p-3 text-lg font-normal text-[#A1A1A1]"
                        placeholder="Password"
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
                        placeholder="Confirm Password"
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
              className="h-auto w-full cursor-pointer rounded-[20px] bg-[#616FF5] py-2.5 text-lg font-medium text-white hover:opacity-80"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
