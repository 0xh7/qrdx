import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DownloadOptions } from "@/types/theme";

interface InspectorState {
  rect: DOMRect | null;
  className: string;
}

interface PreferencesStore {
  chatSuggestionsOpen: boolean;
  setChatSuggestionsOpen: (open: boolean) => void;
  downloadOptions: DownloadOptions;
  setDownloadOptions: (options: DownloadOptions) => void;
  updateDownloadOption: <K extends keyof DownloadOptions>(
    key: K,
    value: DownloadOptions[K],
  ) => void;

  // Inspector state (not persisted)
  inspector: InspectorState;
  inspectorEnabled: boolean;
  toggleInspector: () => void;
  updateInspector: (rect: DOMRect, className: string) => void;
  clearInspector: () => void;
}

export const usePreferencesStore = create<PreferencesStore>()(
  persist(
    (set) => ({
      chatSuggestionsOpen: true,
      setChatSuggestionsOpen: (open: boolean) => {
        set({ chatSuggestionsOpen: open });
      },
      downloadOptions: {
        format: "png",
        sizePreset: "medium",
        width: 600,
        height: 600,
        filename: undefined,
      },
      setDownloadOptions: (options) => set({ downloadOptions: options }),
      updateDownloadOption: (key, value) =>
        set((state) => ({
          downloadOptions: { ...state.downloadOptions, [key]: value },
        })),

      // Inspector state (not persisted, initialized here)
      inspector: {
        rect: null,
        className: "",
      },
      inspectorEnabled: false,

      toggleInspector: () => {
        set((state) => {
          const newEnabled = !state.inspectorEnabled;
          return {
            inspectorEnabled: newEnabled,
            // Clear inspector when disabling
            ...(newEnabled ? {} : { inspector: { rect: null, className: "" } }),
          };
        });
      },

      updateInspector: (rect: DOMRect, className: string) => {
        set({
          inspector: {
            rect,
            className,
          },
        });
      },

      clearInspector: () => {
        set({
          inspector: {
            rect: null,
            className: "",
          },
        });
      },
    }),
    {
      name: "preferences-storage",
      // Don't persist inspector state
      partialize: (state) => ({
        chatSuggestionsOpen: state.chatSuggestionsOpen,
        downloadOptions: state.downloadOptions,
      }),
    },
  ),
);
