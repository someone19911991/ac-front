import React, { FC } from "react";
import "./MainItem.scss";
import { useTranslation } from "react-i18next";

export interface IMainItemProps {
    img: any;
    itemTitle: string;
}

const MainItem: FC<IMainItemProps> = ({ img, itemTitle }) => {
    const { t } = useTranslation();

    return (
        <div className="item">
            <div className="item_top">
                <div className="img_container">
                    <img src={img} alt="Item icon" />
                </div>
                <p>{t(`main.item_titles.${itemTitle}`)}</p>
            </div>
            <p>{t(`main.${itemTitle}`)}</p>
        </div>
    );
};

export default MainItem;
