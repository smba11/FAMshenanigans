import React from "react";

export function Input({ className = "", type = "text", ...props }) {
  return (
    <input
      type={type}
      className={`w-full rounded-xl px-3 py-2 text-sm outline-none ${className}`}
      {...props}
    />
  );
}
