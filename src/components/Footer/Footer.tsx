import React from "react";
import "./Footer.scss";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSquareFacebook,
    faSquareInstagram,
    faTiktok
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    const { t } = useTranslation();
    return (
        <section className="footer">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6040.951446356933!2d43.84961979772533!3d40.795538784262206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x23944cc13872ec4b%3A0xf839be02899bf622!2sAuto%20Auction%20Autocomplex!5e0!3m2!1sen!2s!4v1669120821750!5m2!1sen!2s"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="info_block">
                <p className="title">{t("footer.contact")}</p>
                <div className="info">
                    <div className="contact">
                        <ul>
                            <li>{t("footer.address1")}</li>
                            <li>autocomplex1@mail.ru</li>
                            <li>+374 33 538080</li>
                        </ul>
                    </div>
                    <div className="contact">
                        <ul>
                            <li>{t("footer.address2")}</li>
                            <li>autocomplex1@mail.ru</li>
                            <li>+374 55 666555</li>
                        </ul>
                    </div>
                    <div className="contact">
                        <ul>
                            <li>{t("footer.address3")}</li>
                            <li>autocomplex1@mail.ru</li>
                            <li>+374 95 505054</li>
                        </ul>
                    </div>
                    <div className="contact">
                        <p className="soc_title">{t("footer.find_us")}</p>
                        <div className="soc_images">
                            <a href="https://www.facebook.com/autocomplex.gyumri" target="_blank">
                                <FontAwesomeIcon icon={faSquareFacebook} />
                            </a>
                            <a href="https://www.instagram.com/autocomplex8080/?hl=en" target="_blank">
                                <FontAwesomeIcon icon={faSquareInstagram} />
                            </a>
                            <a href="https://www.tiktok.com/@auto_complex" target="_blank">
                                <FontAwesomeIcon icon={faTiktok} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;
