import React, { forwardRef } from "react";
import "./Print.scss";
import AutoComplexImg from "../../assets/images/autocomplex.png";
import CopartImg from "../../assets/images/coopart.png";
import IaaiImg from "../../assets/images/iaai.svg";
import { useTranslation } from "react-i18next";
import { ICalcResponse } from "../../features/Calculator/Calculator";
import { dataArr } from "../../data";

export interface IPrintProps extends ICalcResponse {
    auction?: string;
    motor_type?: string;
    engine_volume?: number;
    transport_type?: string;
    checkbox?: boolean
    auction_fee?: number
}

const Print = forwardRef<HTMLDivElement, IPrintProps>((props, ref) => {
    const { t } = useTranslation();

    const {
        auction,
        auction_location_id,
        year,
        motor_type,
        engine_volume,
        transport_type,
        vat,
        auction_location_price,
        insurance_price,
        servicePrice,
        copart_price,
        price,
        total_price2,
        total_price1,
        customs_clearance,
        environmental,
    } = props;

    let TAuctonPlace = dataArr.find(item => item.value === `${auction_location_id}`)

    return (
        <div ref={ref} className="print_container">
            <header>
                <div className="logo_container">
                    <img src={AutoComplexImg} alt="" />
                </div>
                <div className="addresses">
                    <div className="address address1">
                        <span className="addr">{t("footer.address1")}</span>
                        <span className="email">autocomplex1@mail.ru</span>
                        <span className="phone">+374 33 538080</span>
                    </div>
                    <div className="address address2">
                        <span className="addr">{t("footer.address2")}</span>
                        <span className="email">autocomplex1@mail.ru</span>
                        <span className="phone">+374 55 666555</span>
                    </div>
                    <div className="address address3">
                        <span className="addr">{t("footer.address3")}</span>
                        <span className="email">autocomplex1@mail.ru</span>
                        <span className="phone">+374 95 505054</span>
                    </div>
                </div>
            </header>
            <div className="content">
                <div className="info info_1">
                    {(auction === "copart" || auction === "iaai") && <div className="row auction">
                        <span>{t("print.auction")}</span>
                        <div>
                            <div className="auction_img">
                                <img src={auction === "copart" ? CopartImg : IaaiImg} alt="" />
                            </div>
                        </div>
                    </div>}
                    <div className="row">
                        <span>{t("calc.fields.selected_location")}</span>
                        <span>{TAuctonPlace?.label}</span>
                    </div>
                    <div className="row">
                        <span>{t("calc.fields.age")}</span>
                        <span>{t(`calc.fields.dd_lists.age.${year}`)}</span>
                    </div>
                    <div className="row">
                        <span>{t("calc.fields.fuel_type")}</span>
                        <span>{t(`calc.fields.dd_lists.fuel_type.${motor_type}`)}</span>
                    </div>
                    <div className="row">
                        <span>{t("calc.fields.engine")}</span>
                        <span>{engine_volume}</span>
                    </div>
                    <div className="row">
                        <span>{t("calc.fields.vehicle_type")}</span>
                        <span>{t(`calc.fields.dd_lists.vehicle_type.${transport_type}`)}</span>
                    </div>
                </div>
                <div className="info info_2">
                    <div className="row">
                        <span className="border_red">
                            {t("calc.fields.car_price")}
                        </span>
                        <span>{price?.toLocaleString()}</span>
                    </div>
                    <div className="row">
                        <span className="border_red">
                            {t("calc.fields.auction_fee")}
                        </span>
                        <span>{copart_price?.toLocaleString()}</span>
                    </div>
                    <div className="row">
                        <span className="border_orange">
                            {t("calc.fields.shipping")}
                        </span>
                        <span>{auction_location_price?.toLocaleString()}</span>
                    </div>
                    <div className="row">
                        <span className="border_orange">
                            {t("main.item_titles.insurance")}
                        </span>
                        <span>{insurance_price?.toLocaleString()}</span>
                    </div>
                    <div className="row">
                        <span className="border_orange">
                            {t("print.service_fee")}
                        </span>
                        <span>{servicePrice?.toLocaleString()}</span>
                    </div>
                    <div className="row">
                        <span className="border_yellow">
                            {t("print.customs_duty")}
                        </span>
                        <span>{customs_clearance?.toLocaleString()}</span>
                    </div>
                    <div className="row">
                        <span className="border_yellow">{t("print.vat")}</span>
                        <span>{vat?.toLocaleString()}</span>
                    </div>
                    <div className="row">
                        <span className="border_yellow">
                            {t("print.eco_tax")}
                        </span>
                        <span>{environmental?.toLocaleString()}</span>
                    </div>
                    <div className="row">
                        <span className="border_yellow">
                            {t("print.broker_fee")}
                        </span>
                        <span>75</span>
                    </div>
                </div>
                <div className="info total row">
                    <span>{t("print.total")}</span>
                    <span>{total_price1?.toLocaleString()} Դ</span>
                    <span>{total_price2?.toLocaleString()} $</span>
                </div>
                <div className="info info_3">
                    <div className="border_red">{t("print.col_1")}</div>
                    <div className="border_orange">{t("print.col_2")}</div>
                    <div className="border_yellow">{t("print.col_3")}</div>
                </div>
            </div>
        </div>
    );
});

export default Print;
