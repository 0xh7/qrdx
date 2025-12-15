"use client";

import { useRef } from "react";
import { usePreferencesStore } from "@/store/preferences-store";
import { useInspectorMouseEvents } from "./use-inspector-mouse-events";
import { useInspectorScroll } from "./use-inspector-scroll";

export const useThemeInspector = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const lastElementRef = useRef<HTMLElement | null>(null);
  const isOverlayHiddenRef = useRef<boolean>(false);

  const { inspectorEnabled, updateInspector, clearInspector } = usePreferencesStore();

  const updateInspectorState = (rect: DOMRect, matches: string[]) => {
    const className = matches.join(" ");
    updateInspector(rect, className);
  };

  const clearInspectorState = () => {
    clearInspector();
  };

  const { debouncedInspectorUpdate, handleMouseMove, handleMouseLeave } =
    useInspectorMouseEvents({
      inspectorEnabled,
      rootRef,
      lastElementRef,
      updateInspectorState,
      clearInspectorState,
    });

  useInspectorScroll({
    inspectorEnabled,
    clearInspectorState,
    debouncedInspectorUpdate,
    rootRef,
    isOverlayHiddenRef,
  });

  return {
    rootRef,
    handleMouseMove,
    handleMouseLeave,
  } as const;
};
