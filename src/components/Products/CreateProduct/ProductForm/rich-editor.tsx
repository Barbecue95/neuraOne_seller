"use client";

import dynamic from "next/dynamic";
import { forwardRef, useEffect, useState } from "react";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface EditorProps {
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const Editor = forwardRef<any, EditorProps>(
  ({ value, onChange, placeholder = "Write something...", className = "" }, ref) => {
    // const [isClient, setIsClient] = useState(false);

    // useEffect(() => {
    //   setIsClient(true);
    // }, []);

    // if (!isClient) return null;

    return (
      <div ref={ref} className={`quill-wrapper ${className}`}>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    );
  }
);

Editor.displayName = "Editor";
export { Editor };
