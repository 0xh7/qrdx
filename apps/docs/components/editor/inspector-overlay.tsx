"use client";

import { Separator } from "@repo/design-system/components/ui/separator";
import { cn } from "@repo/design-system/lib/utils";
import { Inspect } from "lucide-react";
import { createPortal } from "react-dom";
import { useClassNames } from "@/lib/hooks/use-theme-inspector-classnames";
import type { InspectorState } from "@/lib/inspector/inspector-state-utils";
import InspectorClassItem from "./inspector-class-item";

interface InspectorOverlayProps {
  inspector: InspectorState;
  enabled: boolean;
}

const InspectorOverlay = ({ inspector, enabled }: InspectorOverlayProps) => {
  const classNames = useClassNames(inspector.className);

  if (!enabled || !inspector.rect || typeof window === "undefined") {
    return null;
  }

  // Calculate popup position above the element
  const popupOffset = 8;
  const popupTop = inspector.rect.top - popupOffset;
  const popupLeft = inspector.rect.left;

  return createPortal(
    <>
      {/* Highlight ring */}
      <div
        data-inspector-overlay
        className={cn(
          "ring-primary ring-offset-background/90 pointer-events-none fixed z-9999 ring-2 ring-offset-1",
          "transition-all duration-75 ease-out",
        )}
        style={{
          top: inspector.rect.top,
          left: inspector.rect.left,
          width: inspector.rect.width,
          height: inspector.rect.height,
        }}
      />

      {/* Inspector popup */}
      <div
        data-inspector-overlay
        className={cn(
          "bg-popover/95 text-popover-foreground pointer-events-auto fixed z-9999 w-auto max-w-[300px] rounded-lg border p-0 shadow-lg backdrop-blur-sm",
          "transition-all duration-75 ease-out",
        )}
        style={{
          top: popupTop,
          left: popupLeft,
          transform: "translateY(-100%)",
        }}
      >
        <div className="text-muted-foreground flex items-center gap-1.5 px-2 pt-2 text-sm">
          <Inspect className="size-4" />
          Inspector
        </div>
        <Separator className="my-1" />
        <div className="flex flex-col gap-1 px-1 pb-2">
          {classNames.map((cls) => (
            <InspectorClassItem key={cls} className={cls} />
          ))}
        </div>
      </div>
    </>,
    document.body,
  );
};

export default InspectorOverlay;
