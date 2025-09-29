import { useLocation } from "@/hooks/useLocation";
import Icon from "@/assets/Icon.svg";
import { useApi } from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { ModalContainer } from "../ModalContainer";

export function NewEventModal() {
    const [requested, setRequested] = useState(false);
    const { newEventPosition, resetNewEventPosition } = useLocation();
    const { loading, createEvent } = useApi();

    useEffect(() => {
        if (!loading && requested) {
            setRequested(false);
            resetNewEventPosition();
        }
    }, [loading, requested]);

    if (!newEventPosition) return null;

    return (
        <ModalContainer
            isOpen={!!newEventPosition}
            closeModal={() => {
                resetNewEventPosition();
            }}
        >
            <img src={Icon} className="w-18" />

            <p className="text-center w-full max-w-[320px]">
                você está adicionando um novo evento nesta localidade.
            </p>

            <button
                type="button"
                className="font-bold bg-primary text-text rounded-full w-full h-fit py-2 max-w-[200px] flex items-center justify-center"
                disabled={loading}
                onClick={() => {
                    setRequested(true);
                    createEvent(newEventPosition.lat, newEventPosition.lng);
                }}
            >
                {loading ? (
                    <ImSpinner8 className="animate-spin" />
                ) : (
                    "confirmar"
                )}
            </button>
        </ModalContainer>
    );
}
