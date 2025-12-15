/** biome-ignore-all lint/a11y/noStaticElementInteractions: false positive */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
"use client";

import { cn } from "@repo/design-system/lib/utils";
import { SquarePen } from "lucide-react";
import type React from "react";
import { memo, useCallback, useMemo } from "react";
import { useControlsTabFromUrl } from "@/lib/hooks/use-controls-tab-from-url";
import { segmentClassName } from "@/lib/inspector/segment-classname";
import {
  type FocusColorId,
  useColorControlFocus,
} from "@/store/color-control-focus-store";
import { useQREditorStore } from "@/store/editor-store";

interface InspectorClassItemProps {
  className: string;
}

const InspectorClassItem = memo(({ className }: InspectorClassItemProps) => {
  const { focusColor } = useColorControlFocus();
  const { themeState } = useQREditorStore();
  const { handleSetTab } = useControlsTabFromUrl();
  const styles = themeState.styles;
  const segments = useMemo(() => segmentClassName(className), [className]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      const color = segments.value;
      if (
        color &&
        (color === "fgColor" ||
          color === "bgColor" ||
          color === "eyeColor" ||
          color === "dotColor")
      ) {
        // First switch to colors tab, then focus the color control
        handleSetTab("colors");
        // Small delay to let the tab switch complete
        setTimeout(() => {
          focusColor(color as FocusColorId);
        }, 100);
      }
    },
    [segments.value, focusColor, handleSetTab],
  );

  // Get the actual color value from styles
  const getColorValue = useCallback(() => {
    const colorKey = segments.value as keyof typeof styles;
    if (!colorKey) return undefined;

    const colorValue = styles[colorKey];
    // Handle both string colors and gradient objects
    if (typeof colorValue === "string") {
      return colorValue;
    }
    if (typeof colorValue === "object" && colorValue && "stops" in colorValue) {
      // For gradients, use the first stop color
      return colorValue.stops?.[0]?.color;
    }
    return undefined;
  }, [segments.value, styles]);

  const renderSegmentedClassName = useCallback((): React.ReactNode => {
    const parts = [];

    if (segments.selector) {
      parts.push(
        <span key="selector" className="text-foreground/60">
          {segments.selector}:
        </span>,
      );
    }

    if (segments.prefix) {
      parts.push(
        <span key="prefix" className="text-foreground">
          {segments.prefix}
        </span>,
      );
    }

    if (segments.value) {
      parts.push(
        <span key="dash" className="text-foreground/80">
          -
        </span>,
        <span key="value" className="text-foreground font-bold">
          {segments.value}
        </span>,
      );
    }

    if (segments.opacity) {
      parts.push(
        <span key="slash" className="text-foreground/60">
          /
        </span>,
        <span key="opacity" className="text-foreground/60">
          {segments.opacity}
        </span>,
      );
    }

    return <>{parts}</>;
  }, [segments]);

  const colorValue = getColorValue();

  return (
    <div
      className="group hover:bg-foreground/10 flex cursor-pointer items-center justify-between gap-1.5 rounded-md px-1.5 py-1 transition-colors"
      onClick={handleClick}
    >
      <div className="flex items-center gap-1.5">
        <span
          style={{
            backgroundColor: colorValue,
          }}
          className={cn(
            "border-foreground/20 ring-border/50 block size-3.5 shrink-0 rounded border ring-1",
          )}
        />
        <span className="font-mono text-[11px]">
          {renderSegmentedClassName()}
        </span>
      </div>
      <SquarePen className="text-muted-foreground size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
    </div>
  );
});

InspectorClassItem.displayName = "InspectorClassItem";

export default InspectorClassItem;
