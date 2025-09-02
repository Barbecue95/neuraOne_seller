"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export function PrivacyPolicyForm() {
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");

  const handleSave = () => {
    console.log("Privacy Policy Data:", { header, content });
    // Handle save logic here
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ size: ["small", false, "large", "huge"] }],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "size",
    "align",
    "list",
    "bullet",
  ];

  return (
    <div className="bg-card rounded-[10px]">
      <h2 className="text-foreground border-b p-5 text-2xl font-semibold">
        Privacy and Policy
      </h2>

      <div className="space-y-6 p-5">
        <div className="space-y-2">
          <Label
            htmlFor="header"
            className="text-foreground text-base font-medium"
          >
            Header
          </Label>
          <Input
            id="header"
            placeholder="Header"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            className="h-12 w-full"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-foreground text-base font-medium">
            Content
          </Label>
          <div className="rounded-md">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              style={{
                minHeight: "300px",
                // backgroundColor: "white",
              }}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} className="w-28">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
