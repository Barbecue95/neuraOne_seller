"use client";

import type React from "react";

import { useState } from "react";
import TextEditor from "./TextEditor";
import {
  ChevronDown,
  DollarSign,
  Eye,
  Network,
  Pencil,
  Upload,
} from "lucide-react";
import Image from "next/image";
import NextButton from "./NextButton";

const DescriptionPage = () => {
  const [productName, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Create preview URLs for the images
    const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setUploadedFiles((prev) => [...prev, ...newFiles]);

      // Create preview URLs for the images
      const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="grid grid-cols-3 gap-3 pb-16">
      <div className="col-span-2 space-y-4">
        {/* General Information Section */}
        <div className="bg-white rounded-xl p-4">
          <h1 className="text-2xl font-bold mb-6">General Information</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label
                htmlFor="product-name"
                className="block text-sm font-medium"
              >
                Product Name
              </label>
              <input
                id="product-name"
                type="text"
                placeholder="E.g. Short sleeve wool shirt"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="sku" className="block text-sm font-medium">
                SKU
              </label>
              <input
                id="sku"
                type="text"
                placeholder="E.g. CW1100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <TextEditor content={description} onChange={setDescription} />
          </div>
        </div>

        {/* Product Organization Section */}
        <div className="bg-white rounded-xl p-4">
          <h1 className="text-2xl font-bold mb-6">Product Organization</h1>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Category</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative">
                    <button
                      type="button"
                      className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white"
                    >
                      <span className="text-gray-500">Input</span>
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Brand</label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white"
                >
                  <span className="text-gray-500">Input</span>
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Media Section */}
      <div className="col-span-1 bg-white p-4 h-fit rounded-xl">
        <div>
          <h1 className="text-2xl font-bold mb-6">Product Media</h1>

          <div
            className="aspect-square border-2 border-dashed border-blue-300 rounded-xl p-8 flex flex-col items-center justify-center text-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="w-12 h-12 mb-4 text-blue-600">
              <Upload className="w-full h-full" />
            </div>
            <p className="mb-2">
              Drag your file(s) or{" "}
              <label
                htmlFor="file-upload"
                className="text-blue-600 cursor-pointer"
              >
                browse
              </label>
            </p>
            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
              accept="image/*"
            />
            <p className="text-sm text-gray-500">Max 10 MB files are allowed</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            {previewUrls.map((url, index) => (
              <div
                key={index}
                className="aspect-square bg-gray-200 rounded-md overflow-hidden relative"
              >
                <Image
                  src={url || "/placeholder.svg"}
                  alt={`Uploaded image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            {/* Empty preview boxes */}
            {Array.from({ length: Math.max(0, 3 - previewUrls.length) }).map(
              (_, index) => (
                <div
                  key={`empty-${index}`}
                  className="aspect-square bg-gray-200 rounded-md"
                />
              )
            )}
          </div>
        </div>
      </div>

      <NextButton nextStep="pricing" />
    </div>
  );
};

export default DescriptionPage;
