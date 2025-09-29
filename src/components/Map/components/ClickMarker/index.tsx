import { icon } from "leaflet";
import { Marker, useMapEvents } from "react-leaflet";
import UserPin from "@/assets/user-pin.svg";
import { useLocation } from "@/hooks/useLocation";
import { useAppState } from "@/state/useApp";

export function ClickMarker() {
    const { newEventPosition, updateNewEventPosition } = useLocation();
    const { updateAppState } = useAppState();

    const map = useMapEvents({
        click(e) {
            updateAppState({ targetEvent: undefined });
            updateNewEventPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return newEventPosition === undefined ? null : (
        <Marker
            position={newEventPosition}
            icon={icon({
                iconUrl: UserPin,
                iconSize: [47.22, 68],
                iconAnchor: [24, 68],
            })}
        ></Marker>
    );
}
