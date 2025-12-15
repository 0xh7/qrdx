"use client";

/**
 * Create regex to match QR code theme color classes
 * Matches patterns like: fill-fgColor, fill-bgColor, fill-eyeColor, fill-dotColor
 */
const createThemeClassRegex = () => {
  // QR code color properties that can be inspected
  const qrColorTokens = ["fgColor", "bgColor", "eyeColor", "dotColor"];

  const escapedTokens = qrColorTokens.map((t) =>
    t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );

  // Match SVG fill/stroke attributes with QR color properties
  const pattern = `\\b(?:fill|stroke)-(?:${escapedTokens.join(
    "|",
  )})(?:\\/\\d{1,3})?\\b`;

  return new RegExp(pattern);
};

export const THEME_CLASS_REGEX = createThemeClassRegex();
