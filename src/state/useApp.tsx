import { create } from "zustand";

export type AppType = {
    position: GeolocationPosition | undefined;
    updateAppState: (state: Partial<AppType>) => void;
};

export const useAppState = create<AppType>((set) => ({
    position: undefined,
    updateAppState: (state) => {
        set((prev) => ({ ...prev, ...state }));
    },
}));
