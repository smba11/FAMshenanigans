import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-zinc-900 rounded-2xl shadow-md border border-zinc-800 ${className}`}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
}
