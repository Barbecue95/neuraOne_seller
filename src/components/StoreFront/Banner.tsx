"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import UploadIcon from "./UploadIcon";
import { useIsMobile } from "@/hooks/use-mobile";

interface BannerImage {
  id: string;
  file?: File;
  preview?: string;
}

export function BannersForm() {
  const isMobile = useIsMobile();

  const [heroBanners, setHeroBanners] = useState<BannerImage[]>([
    { id: "hero-1" },
    { id: "hero-2" },
    { id: "hero-3" },
    { id: "hero-4" },
  ]);

  const [adsBanners, setAdsBanners] = useState<BannerImage[]>([
    { id: "ads-1" },
    { id: "ads-2" },
    { id: "ads-3" },
    { id: "ads-4" },
  ]);

  const handleFileUpload = (id: string, file: File, type: "hero" | "ads") => {
    const preview = URL.createObjectURL(file);

    if (type === "hero") {
      setHeroBanners((prev) =>
        prev.map((banner) =>
          banner.id === id ? { ...banner, file, preview } : banner
        )
      );
    } else {
      setAdsBanners((prev) =>
        prev.map((banner) =>
          banner.id === id ? { ...banner, file, preview } : banner
        )
      );
    }
  };

  const handleSaveHeroBanners = () => {
    console.log("Saving hero banners:", heroBanners);
    // TODO: Add save logic
  };

  const handleSaveAdsBanners = () => {
    console.log("Saving ads banners:", adsBanners);
    // TODO: Add save logic
  };

  const renderUploadArea = (banner: BannerImage, type: "hero" | "ads") => (
    <div
      key={banner.id}
      className="relative aspect-video rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-900"
    >
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleFileUpload(banner.id, file, type);
          }
        }}
      />
      {banner.preview ? (
        <img
          src={banner.preview || "/placeholder.svg"}
          alt="Banner preview"
          className="h-full w-full rounded-lg object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center">
          <UploadIcon />
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-card rounded-[10px]">
      <h1 className="text-foreground border-b p-5 text-2xl font-semibold">
        Banners
      </h1>

      {/* Hero Banner Section */}
      <div className="space-y-4 p-5">
        <h2 className="text-foreground text-lg font-medium">Hero Banner</h2>
        {isMobile ? (
          <div className="scrollbar-hide flex flex-row gap-5 overflow-x-scroll ">
            {heroBanners.map((banner, index) => (
              <div className="aspect-video min-w-[70vw]" key={index}>
                {renderUploadArea(banner, "hero")}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {heroBanners.map((banner) => renderUploadArea(banner, "hero"))}
          </div>
        )}
        <div className="flex justify-end">
          <Button onClick={handleSaveHeroBanners} className="w-28">
            Save
          </Button>
        </div>
      </div>

      {/* Ads Banner Section */}
      <div className="space-y-4 p-5">
        <h2 className="text-foreground text-lg font-medium">Ads Banner</h2>
        {isMobile ? (
          <div className="scrollbar-hide flex flex-row gap-5 overflow-x-scroll ">
            {adsBanners.map((banner, index) => (
              <div className="aspect-video min-w-[70vw]" key={index}>
                {renderUploadArea(banner, "ads")}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {adsBanners.map((banner) => renderUploadArea(banner, "ads"))}
          </div>
        )}
        <div className="flex justify-end">
          <Button onClick={handleSaveAdsBanners} className="w-28">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
