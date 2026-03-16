import React from "react";

export function Badge({ children, className = "", variant = "default", ...props }) {
  const variants = {
    default: "bg-zinc-800 text-white",
    outline: "border border-zinc-700 bg-transparent text-white",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${variants[variant] || variants.default} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
