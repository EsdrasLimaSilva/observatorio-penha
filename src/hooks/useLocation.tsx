import { useAppState } from "@/state/useApp";

export const LOCATION_KEY = "@location";

export function useLocation() {
    const { position, updateAppState } = useAppState();

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

    return { position, getPosition, getLocalStoragePosition, updatePosition };
}
