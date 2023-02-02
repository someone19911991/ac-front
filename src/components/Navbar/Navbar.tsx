import React, {ChangeEvent} from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.scss";
import {useTranslation} from "react-i18next";
import logo from "../../assets/images/autocomplex.png";

const Navbar = () => {
    const { i18n, t } = useTranslation();
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };
    const handleChangeLng = (e: ChangeEvent<HTMLSelectElement>) => {
        changeLanguage(e.target.value);
    }

    const content = (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="logo" >
                    <Link to="/about-us">
                        <img style={{height: '100%'}} src={logo} alt="Site Logo" />
                    </Link>
                </div>
                <ul>
                    <li>
                        <NavLink to="">{t("nav.home")}</NavLink>
                    </li>
                    {/*<li>*/}
                    {/*    <NavLink to="contact">{t("nav.our_team")}</NavLink>*/}
                    {/*</li>*/}
                    <li>
                        <NavLink to="calculator">{t("nav.calculator")}</NavLink>
                    </li>
                    <li className="order_call">
                        <Link to="order_call">
                            <p>{t('order_call')}</p>
                        </Link>
                    </li>
                    <button className="clean_btn" onClick={() => {
                        localStorage.removeItem("calc_data");
                        window.location.reload();
                    }}>{t('calc.clean_old')}</button>
                    <li className="languages">
                        <select onChange={handleChangeLng}>
                            <option value="am">AM</option>
                            <option value="en">EN</option>
                            <option value="ru">RU</option>
                        </select>
                    </li>
                </ul>
            </div>
        </nav>
    );

    return content;
};

export default Navbar;
