import type { ReactNode } from "react";
import CloseIcon from "@/assets/close-menu-icon.svg";

interface ModalContainerProps {
    isOpen: boolean;
    closeModal: () => void;
    children: ReactNode;
    closeDisabled?: boolean;
}

export function ModalContainer({
    children,
    isOpen,
    closeDisabled,
    closeModal,
}: ModalContainerProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed bottom-0 w-full left-0 z-20 bg-background text-text px-2 py-4 h-[40vh] flex flex-col gap-2 items-center justify-around max-h-[240px]">
            <button
                className="absolute top-3 right-3"
                onClick={closeModal}
                disabled={closeDisabled}
            >
                <img src={CloseIcon} className="h-8" />
            </button>

            {children}
        </div>
    );
}
