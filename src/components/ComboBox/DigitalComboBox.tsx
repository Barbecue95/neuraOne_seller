"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { CreateUpdatePaymentMethodPayload } from "@/types/payment-method.types";

interface ListItemType {
  id: number;
  label: string;
}

export function Combobox({
  List,
  placeholder = "Search .....",
  title = "Select an option",
  form,
}: {
  List: ListItemType[];
  placeholder?: string;
  title?: string;
  form: UseFormReturn<CreateUpdatePaymentMethodPayload>;
}) {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => {
        return (
          <FormItem>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-[460px] justify-between",
                      !field.value && "text-muted-foreground",
                    )}
                  >
                    {field.value
                      ? List.find((item) => item.label === field.value)?.label
                      : title}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[460px] p-0">
                <Command>
                  <CommandInput placeholder={placeholder} className="h-9" />
                  <CommandList>
                    <CommandEmpty>Not found.</CommandEmpty>
                    <CommandGroup>
                      {List.map((item) => (
                        <CommandItem
                          key={item.id}
                          value={String(item.id)}
                          onSelect={() => {
                            field.onChange(item.label);
                            field.onBlur();
                          }}
                        >
                          {item.label}
                          <Check
                            className={cn(
                              "ml-auto",
                              field.value === item.label
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
