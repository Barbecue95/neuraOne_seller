"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateOrder } from "@/queries/order.queries";
import { Order } from "@/types/order.types";
import { CheckIcon, Edit, MapPin, Navigation, XIcon } from "lucide-react";
import React, { useEffect } from "react";
import OrderNote from "./order-note";

const ShippingAddress = ({ order }: { order: Order }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [address, setAddress] = React.useState<
    | string
    | {
        address?: string;
        landmark?: string;
      }
  >(order.address);

  const [notes, setNotes] = React.useState<string>(order.notes ?? "");

  // controlled edit fields
  const [editAddress, setEditAddress] = React.useState<string>("");
  const [editLandmark, setEditLandmark] = React.useState<string>("");
  const [editNotes, setEditNotes] = React.useState<string>("");

  // validation errors
  const [addressError, setAddressError] = React.useState<string>("");
  const [notesError, setNotesError] = React.useState<string>("");

  const addressRef = React.useRef<HTMLInputElement | null>(null);
  const landmarkRef = React.useRef<HTMLInputElement | null>(null);
  const notesRef = React.useRef<HTMLTextAreaElement | null>(null);

  const [isSaving, setIsSaving] = React.useState(false);

  const { mutateAsync: updateOrder } = useUpdateOrder(order.id.toString());

  // normalize incoming order props
  useEffect(() => {
    if (!order.address || typeof order.address === "string") {
      setAddress(order.address as string);
    } else {
      setAddress(order.address as { address?: string; landmark?: string });
    }
  }, [order.address]);

  useEffect(() => {
    setNotes(order.notes ?? "");
  }, [order.notes]);

  // prepare edit fields when entering edit mode
  useEffect(() => {
    if (isEditing) {
      if (typeof address === "string") {
        setEditAddress(address ?? "");
        setEditLandmark("");
      } else {
        setEditAddress(address?.address ?? "");
        setEditLandmark(address?.landmark ?? "");
      }
      setEditNotes(notes ?? "");
      // focus address input next tick
      setTimeout(() => addressRef.current?.focus(), 0);
    }
  }, [isEditing, address, notes]);

  // validation rules:
  // - address: if non-empty, must be >= 5 chars
  // - notes: max 500 chars
  const validate = (): boolean => {
    let ok = true;
    const aTrim = editAddress.trim();
    if (aTrim.length > 0 && aTrim.length < 5) {
      setAddressError("Address must be at least 5 characters.");
      ok = false;
    } else {
      setAddressError("");
    }

    if (editNotes.length > 500) {
      setNotesError("Notes must be 500 characters or less.");
      ok = false;
    } else {
      setNotesError("");
    }

    return ok;
  };

  // run quick validation when fields change
  useEffect(() => {
    if (isEditing) validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editAddress, editNotes, editLandmark]);

  const handleUpdate = async () => {
    if (!validate()) return;

    setIsSaving(true);
    const addrVal = editAddress.trim();
    const landmarkVal = editLandmark.trim();
    const notesVal = editNotes;

    const addressPayload =
      addrVal || landmarkVal
        ? {
            address: addrVal || undefined,
            landmark: landmarkVal || undefined,
          }
        : undefined;

    const payload: {
      address?: { address?: string; landmark?: string };
      notes?: string;
    } = {
      notes: notesVal ?? "",
    };

    if (addressPayload) payload.address = addressPayload;
    else payload.address = { address: "" };

    try {
      await updateOrder(payload);
      // update local UI
      setAddress(addressPayload ? addressPayload : ("" as string));
      setNotes(notesVal);
      setIsEditing(false);
    } catch (err) {
      // show console error; you may want to show a toast
      console.error("Failed to update order", err);
    } finally {
      setIsSaving(false);
    }
  };

  const saveDisabled = isSaving || Boolean(addressError) || Boolean(notesError);

  return (
    <>
      <div className="bg-card space-y-5 pb-5">
        <div className="flex items-center justify-between border-t px-5 pt-5">
          <h3 className="text-custom-dark-gray text-xl font-medium">
            Shipping address
          </h3>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary h-fit w-fit rounded-full bg-slate-100 p-2"
                onClick={() => {
                  void handleUpdate();
                }}
                aria-label="Save address and notes"
                disabled={saveDisabled}
              >
                <CheckIcon className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-fit w-fit rounded-full bg-slate-100 p-2 text-red-500"
                onClick={() => {
                  setIsEditing(false);
                  // reset local validation state
                  setAddressError("");
                  setNotesError("");
                }}
                aria-label="Cancel edit"
              >
                <XIcon className="size-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="text-primary rounded-full bg-slate-100 p-2 transition-all duration-300 "
              onClick={() => setIsEditing(true)}
              aria-label="Edit address"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </div>

        {!isEditing ? (
          <div className="space-y-2.5">
            <div className="flex gap-3 px-5">
              <MapPin className="text-custom-dark-gray mt-0.5 h-5 w-5 flex-shrink-0" />
              <div className="text-custom-dark-gray space-y-1 text-sm">
                <p>
                  {typeof address === "string"
                    ? address
                    : ` ${address?.address}`}
                </p>
              </div>
            </div>
            <div className="flex gap-3 px-5">
              <Navigation className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#3C3C3C] dark:text-gray-100" />
              <div className="space-y-1 text-sm text-[#3C3C3C] dark:text-gray-100">
                {typeof address === "string" ? "-" : address?.landmark}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2.5">
            <div className="flex gap-3 px-5">
              <MapPin className="text-custom-dark-gray mt-0.5 h-5 w-5 flex-shrink-0" />
              <div className="w-full">
                <Input
                  ref={addressRef}
                  placeholder="Street, city, state, ZIP"
                  aria-label="Shipping address"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  aria-invalid={Boolean(addressError)}
                />
                {addressError ? (
                  <p className="mt-1 text-sm text-red-500">{addressError}</p>
                ) : null}
              </div>
            </div>
            <div className="flex gap-3 px-5">
              <Navigation className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#3C3C3C] dark:text-gray-100" />
              <div className="w-full">
                <Input
                  ref={landmarkRef}
                  placeholder="Landmark"
                  aria-label="Address landmark"
                  value={editLandmark}
                  onChange={(e) => setEditLandmark(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Notes area */}
      {!isEditing ? (
        <OrderNote note={notes} />
      ) : (
        <div className="bg-card space-y-2.5 rounded-b-md border-t px-5 pb-5">
          <h3 className="text-custom-dark-gray pt-5 text-lg font-medium">
            Notes
          </h3>
          <textarea
            ref={notesRef}
            value={editNotes}
            onChange={(e) => setEditNotes(e.target.value)}
            placeholder="Add order notes..."
            aria-label="Order notes"
            aria-invalid={Boolean(notesError)}
            className="text-custom-dark-gray min-h-[96px] w-full resize-none rounded-[10px]
              bg-gray-200 p-4 text-base leading-relaxed dark:bg-gray-800"
            maxLength={500}
          />
          {notesError ? (
            <p className="mt-1 text-sm text-red-500">{notesError}</p>
          ) : null}
        </div>
      )}
    </>
  );
};

export default ShippingAddress;
