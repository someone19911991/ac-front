import React, { useEffect } from "react";
import "./Home.scss";
import { main_page_items } from "../../consts";
import MainItem from "../../components/MainItem/MainItem";
import { useTranslation } from "react-i18next";
import axios from "axios";

const Home = () => {
    const { t } = useTranslation();

    useEffect(() => {
        async function cleanStorage(){
            try{
                await axios.post('https://www.backend.autocomplex.am/clean', {sec: 'autocomplex'})
            }catch(err){
                console.log(err);
            }
        }
        cleanStorage();
    }, [])

    return (
        <div className="home">
            {/*<div className="home_bg"></div>*/}
            {/*<img style={{width: '100%', height: '300px', objectFit: 'cover'}} src={ShippingImg} alt="" />*/}
            <h2 className="title">{t('main.title')}</h2>
            <span className="underline"></span>
            <p className="subtitle">{t('main.subtitle')}</p>
            <div className="container">
                {main_page_items.map((item) => (
                    <MainItem
                        key={item.itemTitle}
                        img={item.img}
                        itemTitle={item.itemTitle}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
