import React, { FC } from "react";
import "./Modal.scss";

interface IProps {
    children: React.ReactNode;
    openModal: (arg: boolean) => void;
}

const Modal: FC<IProps> = ({ children, openModal }) => {
    const burger_portal = document.getElementById("burger_portal");
    if (!burger_portal) {
        return <></>;
    }

    return (
        <div className="modal" onClick={() => openModal(false)}>
            <div className="sub_modal" onClick={() => openModal(false)}>
                <button className="close">x</button>
                <div className="container" onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
