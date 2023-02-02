import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import HeaderMobile from "../Header/HeaderMobile";
import Footer from "../Footer/Footer";
import "./Layout.scss";

const Layout = () => {
    return (
        <section className="layout">
            <Header />
            <HeaderMobile />
            <Outlet />
            <Footer />
        </section>
    );
};

export default Layout;
