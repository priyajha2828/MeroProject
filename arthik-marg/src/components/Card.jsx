// src/components/Card.jsx
import React from "react";

/**
 * Theme-aware Card
 *
 * Props:
 * - title, amount, subtitle, icon
 * - color: either a Tailwind bg class (e.g. "bg-emerald-50") OR a CSS color value (e.g. "var(--surface-100)" or "#fff")
 * - iconBg: same as `color` but for the icon badge
 * - onClick: optional click handler
 *
 * Behavior:
 * - If color/iconBg starts with "bg-" it's treated as a Tailwind class (backwards compatible).
 * - Otherwise it's applied inline as `background` allowing CSS variables (recommended).
 */

export default function Card({
  title,
  amount,
  subtitle,
  icon,
  color = "var(--surface-100)",
  iconBg = "var(--primary-500)",
  onClick,
}) {
  const clickable = typeof onClick === "function";

  // If user supplied a Tailwind background class (e.g. "bg-emerald-50"), use it as a class.
  const colorIsTailwindClass = typeof color === "string" && color.trim().startsWith("bg-");
  const iconBgIsTailwindClass = typeof iconBg === "string" && iconBg.trim().startsWith("bg-");

  const rootStyle = colorIsTailwindClass ? {} : { background: color || "var(--surface-100)" };
  const iconStyle = iconBgIsTailwindClass ? {} : { background: iconBg || "var(--primary-500)" };

  // text colors (use CSS vars so theme controls them)
  const titleStyle = { color: "var(--muted)" };
  const amountStyle = { color: "var(--text-default)" };
  const subtitleStyle = { color: "var(--muted)" };

  return (
    <div
      role={clickable ? "button" : "article"}
      onClick={onClick}
      // group needed so the chevron shows on hover
      className={`group flex items-center gap-4 p-4 md:p-5 rounded-2xl border border-transparent
        shadow-sm transition-transform duration-150 ${clickable ? "cursor-pointer" : ""} hover:shadow-md hover:-translate-y-0.5 ${
          colorIsTailwindClass ? color : ""
        }`}
      style={{
        ...rootStyle,
        // fallback border color using CSS var
        borderColor: "transparent",
      }}
    >
      {/* Icon Badge */}
      <div
        className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full shadow-sm ${
          iconBgIsTailwindClass ? iconBg : ""
        }`}
        style={{ minWidth: 48, ...iconStyle }}
        aria-hidden
      >
        {/* Icon container color and icon color should follow theme:
            icon color uses currentColor so we set color accordingly. */}
        <div style={{ color: "var(--text-default)" }} className="w-6 h-6 md:w-7 md:h-7">
          {/* If icon is a React element, we try to clone it to inherit currentColor.
              Otherwise render as-is. */}
          {React.isValidElement(icon)
            ? React.cloneElement(icon, { color: "currentColor", size: icon.props.size || 20 })
            : icon}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="text-sm truncate" style={titleStyle}>
          {title}
        </div>

        <div className="mt-1 flex items-baseline gap-2">
          <div className="text-lg md:text-xl font-semibold truncate" style={amountStyle}>
            {amount}
          </div>
          {subtitle && (
            <div className="text-xs md:text-sm truncate" style={subtitleStyle}>
              {subtitle}
            </div>
          )}
        </div>
      </div>

      {/* small chevron visible on hover when clickable */}
      {clickable && (
        <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150" style={{ color: "var(--muted)" }}>
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
