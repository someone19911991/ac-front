import React, { FC } from "react";
import { createPortal } from "react-dom";
import "./BurgerMenu.scss";
import Navbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IBurgerMenuProps {
    setOpen: (arg: boolean) => void;
    menuOpen: boolean;
}

const BurgerMenu: FC<IBurgerMenuProps> = ({ setOpen, menuOpen }) => {
    const portal = document.getElementById("burger_portal");
    if (!portal) {
        return <></>;
    }

    const bMenuClass = `burger_menu ${menuOpen ? "open" : ""}`;

    const content = (
        <div className={bMenuClass}>
            <FontAwesomeIcon icon="close" onClick={() => setOpen(false)} />
            <Navbar />
        </div>
    );

    return createPortal(content, portal);
};

export default BurgerMenu;
