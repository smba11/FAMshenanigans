import React from "react";

export function Button({
  children,
  className = "",
  variant = "default",
  size = "default",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center font-medium transition focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-red-600 text-white hover:bg-red-700",
    secondary: "bg-zinc-800 text-white hover:bg-zinc-700",
    ghost: "bg-transparent text-white hover:bg-zinc-800",
    destructive: "bg-red-700 text-white hover:bg-red-800",
    outline: "border border-zinc-700 bg-transparent text-white hover:bg-zinc-900",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 py-2 text-sm",
    lg: "h-11 px-6 py-3 text-base",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={`${base} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
