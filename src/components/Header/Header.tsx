import React from "react";
import "./Header.scss";
import Navbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/images/autocomplex.png";
import { Link } from "react-router-dom";
import {useTranslation} from "react-i18next";

const Header = () => {
    const {t} = useTranslation()

    return (
        <header className="header">
            <h1 className="top_banner">AUTOCOMPLEX</h1>
            <Navbar />
            <div className="header-content">
                {/*<div className="logo">*/}
                {/*    <Link to="/about-us">*/}
                {/*        <img src={logo} alt="Site Logo" />*/}
                {/*    </Link>*/}
                {/*</div>*/}
                <ul className="reach_us">
                    <li>
                        <div>{t('reach_us')}</div>
                    </li>
                    <li>
                        <FontAwesomeIcon icon="phone" />
                        <a href="tel:+374 98 77272727">+374 33 53 80 80</a>
                    </li>
                    <li>
                        <FontAwesomeIcon icon="phone" />
                        <a href="tel:+374 98 77272727">+374 55 66 65 55</a>
                    </li>
                    <li>
                        <FontAwesomeIcon icon="phone" />
                        <a href="tel:+374 98 77272727">+374 95 50 50 54</a>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
