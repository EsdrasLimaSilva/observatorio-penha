import { useAppState } from "@/state/useApp";
import { ModalContainer } from "../ModalContainer";
import Icon from "@/assets/Icon.svg";
import { useApi } from "@/hooks/useApi";
import { ImSpinner8 } from "react-icons/im";

export function LikeEventModal() {
    const { targetEvent, updateAppState } = useAppState();
    const { loading, likeEvent, userId } = useApi();

    const USER_IS_OWNER = targetEvent?.userId === userId;
    const USER_ALREADY_LIKED = targetEvent?.likes?.includes(userId);

    const getLabel = () => {
        const likeCount = targetEvent?.likes.length || 0;

        if (USER_IS_OWNER)
            return `${likeCount} pessoas deram like no seu evento.`;

        if (USER_ALREADY_LIKED)
            return `Você já deu like neste evento! Ele tem um total de ${likeCount} likes`;

        switch (likeCount) {
            case 0:
                return "Seja o primeiro a dar like e credibilidade a este evento";
            case 1:
                return "Até agora uma pessoa deu like neste evento. Likes ajudam a dar credibilidade ao evento.";
            default:
                return `Até agora ${likeCount} pessoas deram like neste evento. Dê um like para dar mais credibilidade ao evento.`;
        }
    };

    return (
        <ModalContainer
            isOpen={!!targetEvent}
            closeModal={() => {
                updateAppState({ targetEvent: undefined });
            }}
        >
            <img src={Icon} className="w-18" />

            <p className="text-center w-full max-w-[320px]">{getLabel()}</p>

            {(!USER_IS_OWNER || !USER_ALREADY_LIKED) && (
                <button
                    type="button"
                    className="font-bold bg-primary text-text rounded-full w-full h-fit py-2 max-w-[200px] flex items-center justify-center"
                    disabled={loading || USER_IS_OWNER}
                    onClick={() => {
                        if (!targetEvent) return;

                        likeEvent(
                            targetEvent.id,
                            targetEvent.latitude,
                            targetEvent.longitude,
                        );
                    }}
                >
                    {loading ? (
                        <ImSpinner8 className="animate-spin" />
                    ) : (
                        "dar like"
                    )}
                </button>
            )}
        </ModalContainer>
    );
}
