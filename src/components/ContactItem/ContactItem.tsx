import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IContactWithTeam } from "../../consts";
import { useTranslation } from "react-i18next";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import "./ContactItem.scss";

const ContactItem: FC<IContactWithTeam> = ({
    name,
    phone,
    img,
    speciality,
}) => {
    const { t } = useTranslation();

    return (
        <div className="contact_item">
            <div className="specialist_img">
                <img src={img} alt="specialist img" />
            </div>
            <div className="specialist_info">
                <p className="name">{t(`contact_with_team.specialists.${name}`)}</p>
                <p className="speciality">
                    {t(`contact_with_team.specifications.${speciality}`)}
                </p>
                <p className="phone">
                    <FontAwesomeIcon icon={faPhone} /> {phone}
                </p>
                <span className="envelop">
                <FontAwesomeIcon icon={faEnvelope} />
            </span>
            </div>
        </div>
    );
};

export default ContactItem;
