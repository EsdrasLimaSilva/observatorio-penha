import { useLocation } from "@/hooks/useLocation";
import type { Map as MapType } from "leaflet";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

export function Map() {
    const { position, getLocalStoragePosition, updatePosition } = useLocation();

    const mapRef = useRef<MapType>(null);

    useEffect(() => {
        const localStoragePosition = getLocalStoragePosition();
        if (localStoragePosition) {
            updatePosition(localStoragePosition);
        }
    }, []);

    useEffect(() => {
        if (position && mapRef.current) {
            mapRef.current.setView([
                position.coords.latitude,
                position.coords.longitude,
            ]);
        }
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
        </MapContainer>
    );
}
