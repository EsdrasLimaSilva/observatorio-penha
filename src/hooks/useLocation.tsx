import { useAppState } from "@/state/useApp";
import type { LatLng } from "leaflet";

export const LOCATION_KEY = "@location";

export function useLocation() {
    const { position, newEventPosition, updateAppState } = useAppState();

    function getPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                updateAppState({ position });
                localStorage.setItem(
                    LOCATION_KEY,
                    JSON.stringify({ position }),
                );
            });
        } else {
        }
    }

    function getLocalStoragePosition() {
        const localStoragePositionJson = localStorage.getItem(LOCATION_KEY);

        if (!localStoragePositionJson) return undefined;

        const location = JSON.parse(localStoragePositionJson) as {
            position: GeolocationPosition;
        };
        return location.position;
    }

    function updatePosition(position: GeolocationPosition) {
        updateAppState({ position });
    }

    function updateNewEventPosition(newEventPosition: LatLng) {
        updateAppState({ newEventPosition });
    }

    function resetNewEventPosition() {
        updateAppState({ newEventPosition: undefined });
    }

    return {
        newEventPosition,
        position,
        getPosition,
        getLocalStoragePosition,
        updatePosition,
        updateNewEventPosition,
        resetNewEventPosition,
    };
}
