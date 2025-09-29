import { useAppState } from "@/state/useApp";
import { icon } from "leaflet";
import { Marker, useMapEvents } from "react-leaflet";
import Pin from "@/assets/pin.svg";
import UserPin from "@/assets/user-pin.svg";
import { useApi } from "@/hooks/useApi";

export function EventsMarker() {
    const { events, updateAppState } = useAppState();
    const { getEvents, userId } = useApi();
    const map = useMapEvents({
        moveend() {
            const center = map.getCenter();
            getEvents(center.lat, center.lng);
        },
    });

    if (!events || events.length <= 0) return null;

    return (
        <>
            {events.map((event) => (
                <Marker
                    position={{ lat: event.latitude, lng: event.longitude }}
                    icon={icon({
                        iconUrl: userId === event.userId ? UserPin : Pin,
                        iconSize: [47.22, 68],
                        iconAnchor: [24, 68],
                    })}
                    key={event.id}
                    eventHandlers={{
                        click() {
                            updateAppState({
                                targetEvent: event,
                                newEventPosition: undefined,
                            });
                            map.flyTo({
                                lat: event.latitude,
                                lng: event.longitude,
                            });
                        },
                    }}
                ></Marker>
            ))}
        </>
    );
}
