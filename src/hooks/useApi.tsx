import { api } from "@/config/api";
import { useAppState } from "@/state/useApp";
import type { Pin } from "@/types";
import { useMemo, useState } from "react";
import { v4 as uuid } from "uuid";

export function useApi() {
    const [loading, setLoading] = useState(false);
    const userId = useMemo(() => {
        const userIdLocal = localStorage.getItem("@userId");

        if (!userIdLocal) {
            const userId = uuid();
            localStorage.setItem("@userId", JSON.stringify(userId));
            return userId;
        }

        return JSON.parse(userIdLocal) as string;
    }, []);
    const { updateAppState } = useAppState();

    async function getEvents(latitude: number, longitude: number) {
        try {
            setLoading(true);
            const response = await api.get(
                `/pins?lat=${latitude}&lng=${longitude}`,
            );

            const pins = response.data?.pins as Pin[];

            updateAppState({ events: pins });

            return pins;
        } catch (e) {
        } finally {
            setLoading(false);
        }
    }

    async function createEvent(latitude: number, longitude: number) {
        try {
            setLoading(true);
            await api.post("/pins", {
                userId,
                latitude,
                longitude,
            });
            await getEvents(latitude, longitude);
        } catch (e) {
        } finally {
            setLoading(false);
        }
    }

    async function likeEvent(
        eventId: string,
        latidue: number,
        longitude: number,
    ) {
        try {
            setLoading(true);
            await api.put("/pins", { userId, pinId: eventId });
            await getEvents(latidue, longitude);
        } catch (e) {
        } finally {
            setLoading(false);
        }
    }

    return { loading, userId, createEvent, getEvents, likeEvent };
}
