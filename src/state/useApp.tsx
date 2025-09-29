import type { Pin } from "@/types";
import type { LatLng } from "leaflet";
import { create } from "zustand";

export type AppType = {
    position: GeolocationPosition | undefined;
    newEventPosition: LatLng | undefined;
    events: Pin[];
    targetEvent: Pin | undefined;
    updateAppState: (state: Partial<AppType>) => void;
};

export const useAppState = create<AppType>((set) => ({
    position: undefined,
    newEventPosition: undefined,
    events: [],
    targetEvent: undefined,
    updateAppState: (state) => {
        set((prev) => ({ ...prev, ...state }));
    },
}));
