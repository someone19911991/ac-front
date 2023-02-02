import React, { useEffect } from "react";
import { contact_with_team } from "../../consts";
import ContactItem from "../../components/ContactItem/ContactItem";
import "./Contact.scss";
import { useTranslation } from "react-i18next";
import RussianFlagImg from "../../assets/images/russian_flag.jpeg";

const Contact = () => {
    const { t } = useTranslation();

    useEffect(() => {
    }, []);

    return (
        <section className="contact_page">
            <div className="contact_container">
                {contact_with_team.map((item) => (
                    <ContactItem
                        key={item.phone}
                        phone={item.phone}
                        img={item.img}
                        name={item.name}
                        speciality={item.speciality}
                    />
                ))}
            </div>
            <div className="foreign_branch">
                <p className="our_foreign_branches">
                    {t("contact_with_team.foreign_branch.0")}
                </p>
                <p className="branch_name">
                    {t("contact_with_team.foreign_branch.1")}
                </p>
                <div className="flag">
                    <img src={RussianFlagImg} alt="" />
                </div>
            </div>
        </section>
    );
};

export default Contact;
