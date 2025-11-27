// /mnt/data/Card.jsx
import React from "react";


export default function Card({
  title,
  amount,
  subtitle,
  icon,
  color = "bg-white",
  iconBg = "bg-white",
  onClick,
}) {
  const clickable = typeof onClick === "function";

  return (
    <div
      role={clickable ? "button" : "article"}
      onClick={onClick}
      className={`flex items-center gap-4 p-4 md:p-5 rounded-2xl border border-transparent
        shadow-sm transition-transform duration-150 ${color} ${clickable ? "cursor-pointer" : ""}
        hover:shadow-md hover:-translate-y-0.5`}
    >
      {/* Icon Badge */}
      <div
        className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full ${iconBg} shadow-sm`}
        style={{ minWidth: 48 }}
        aria-hidden
      >
        <div className="w-6 h-6 md:w-7 md:h-7 text-gray-700">{icon}</div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="text-sm text-gray-500 truncate">{title}</div>

        <div className="mt-1 flex items-baseline gap-2">
          <div className="text-lg md:text-xl font-semibold text-gray-800 truncate">
            {amount}
          </div>
          {subtitle && (
            <div className="text-xs md:text-sm text-gray-500 truncate">{subtitle}</div>
          )}
        </div>
      </div>

      {/* small chevron visible on hover when clickable */}
      {clickable && (
        <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  );
}
