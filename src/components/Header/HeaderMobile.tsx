import React, {ChangeEvent, useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoImg from "../../assets/images/autocomplex.png";
import CalculatorImg from "../../assets/images/calculator.png";
import { Link } from "react-router-dom";
import "./Header.scss";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { useAppSelector } from "../../app/hooks";
import {useTranslation} from "react-i18next";

const HeaderMobile = () => {
    const {location} = useAppSelector(state => state.appSliceReducer);
    const [menuOpen, setMenuOpen] = useState(false);

    const { i18n, t } = useTranslation();
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };
    const handleChangeLng = (e: ChangeEvent<HTMLSelectElement>) => {
        changeLanguage(e.target.value);
    }

    useEffect(() => {
        setMenuOpen(false);
    }, [location])

    return (
        <>
            <BurgerMenu menuOpen={menuOpen} setOpen={setMenuOpen} />
            <header className="header_mobile">
                <FontAwesomeIcon
                    onClick={() => setMenuOpen(true)}
                    icon="bars"
                />
                <div className="logos">
                    <div className="logo">
                        <Link to="">
                            <img
                                className="logo_img"
                                src={LogoImg}
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <div className="logo">
                        <Link to="calculator">
                            <img
                                className="calc_img"
                                src={CalculatorImg}
                                alt="logo"
                            />
                        </Link>
                    </div>
                </div>
                <select className="languages" onChange={handleChangeLng}>
                    <option value="am">AM</option>
                    <option value="en">EN</option>
                    <option value="ru">RU</option>
                </select>
            </header>
        </>
    );
};

export default HeaderMobile;
