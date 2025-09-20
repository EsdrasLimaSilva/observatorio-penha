import Logo from "@/assets/Logo.svg";
import MenuIcon from "@/assets/menu-icon.svg";
import CloseMenuIcon from "@/assets/close-menu-icon.svg";
import { useState } from "react";
import { tv } from "tailwind-variants";
import { useNavigate } from "react-router";

const headerStyle = tv({
    base: "w-full bg-background flex flex-col items-center justify-center px-4 fixed top-0 left-0 z-100 h-fit py-4",
});

const menuStyle = tv({
    base: "flex flex-col gap-3 text-text items-center mt-0 h-0 overflow-hidden transition-all",
    variants: {
        menuVisible: {
            true: "h-[80px] mt-6",
        },
    },
});

export function Header() {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const navigate = useNavigate();

    return (
        <div className={headerStyle()}>
            <div className="flex items-center w-full justify-between">
                <img
                    src={Logo}
                    className="w-[200px]"
                    onClick={() => navigate("/")}
                />

                <button onClick={() => setIsMenuVisible((prev) => !prev)}>
                    <img
                        src={isMenuVisible ? CloseMenuIcon : MenuIcon}
                        className="h-[36px]"
                    />
                </button>
            </div>

            <ul className={menuStyle({ menuVisible: isMenuVisible })}>
                <li onClick={() => navigate("/")}>minha localização</li>
                <li onClick={() => navigate("/como-usar")}>como usar</li>
            </ul>
        </div>
    );
}
