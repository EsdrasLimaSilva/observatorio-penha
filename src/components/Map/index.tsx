import { useLocation } from "@/hooks/useLocation";
import type { Map as MapType } from "leaflet";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { ClickMarker } from "./components/ClickMarker";
import { useApi } from "@/hooks/useApi";
import { EventsMarker } from "./components/EventsMarker";

export function Map() {
    const { position, getLocalStoragePosition, updatePosition } = useLocation();
    const { getEvents } = useApi();

    const mapRef = useRef<MapType>(null);

    useEffect(() => {
        const localStoragePosition = getLocalStoragePosition();
        if (localStoragePosition) {
            updatePosition(localStoragePosition);
            getEvents(
                localStoragePosition.coords.latitude,
                localStoragePosition.coords.longitude,
            );
        }
    }, []);

    useEffect(() => {
        if (!mapRef.current) return () => {};

        if (position) {
            mapRef.current.setView([
                position.coords.latitude,
                position.coords.longitude,
            ]);
        }

        return () => mapRef.current?.removeEventListener("click");
    }, [position]);

    return (
        <MapContainer
            ref={mapRef}
            center={[51.505, -0.09]}
            zoom={17}
            className="w-full bg-neutral-100 grow z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <EventsMarker />

            <ClickMarker />
        </MapContainer>
    );
}
