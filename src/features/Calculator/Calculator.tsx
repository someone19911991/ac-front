import React, {
    MouseEventHandler,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import "./Calculator.scss";
import Input from "../../components/UI/Input/Input";
import Select from "react-select";
import { fuelType, age, vehicle_type } from "../../consts";
import { SingleValue, ActionMeta } from "react-select";
import { useTranslation } from "react-i18next";
import Calculation from "../../components/Calculation/Calculation";
import { IPrintProps } from "../../components/Print/Print";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler } from "react-hook-form";
import { data, dataArr } from "../../data";
import LoadingImg from "../../assets/images/loading.gif";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const priceList = { ...data }

type SelectValue = {
    label: string;
    value: string;
};

interface ICalcData {
    price: number;
    auction_location: number;
    auction: string;
    year: number;
    motor: number;
    engine_volume: number;
    auto_type: string;
    auction_fee: number;
    auction_location_id: number;
    checkbox: number;
}

export interface ICalcResponse {
    auction?: string;
    price: number;
    servicePrice: number;
    auction_location_price: number;
    auction_location_id?: number;
    copart_price: number;
    insurance_price: number;
    customs_clearance: number;
    vat: number;
    environmental: number;
    total_price1: number;
    total_price2: number;
    engine_volume?: number;
    year?: number;
    motor?: number;
}

export interface IShowCalc {
    price: number;
    copart_price: number;
    auction_location_price: number;
    insurance_price: number;
    servicePrice: number;
    customs_clearance: number;
    vat: number;
    environmental: number;
    total_price1: number;
    total_price2: number;
}

export interface ILSData extends IShowCalc {
    auction_location_id: SelectValue | string;
    motor_type: SelectValue | number;
    year: SelectValue | string;
    transport_type: SelectValue | number;
    price: number;
    auction: string;
    engine_volume: number;
    auction_location_price: number;
    checkbox: boolean;
    auction_fee?: number;
}

const FieldNames = {
    motor: "motor",
    year: "year",
    auction: "auction",
    auction_location_id: "auction_location_id",
    auction_location: "auction_location",
    auto_type: "auto_type",
    auction_fee: "auction_fee",
};

const Calculator = () => {
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const { t, i18n } = useTranslation();
    const [auction, setAuction] = useState("iaai");
    const [showCalc, setShowCalc] = useState({} as IShowCalc);
    const otherRef = useRef<HTMLInputElement | null>(null);
    const [offRoadVisible, setOffRoadVisible] = useState(false);
    const [calculated, setCalculated] = useState(false);
    const [printData, setPrinData] = useState<IPrintProps>({} as IPrintProps);
    const [loadingCalculate, setLoadingCalculate] = useState(false);
    const [loading, setLoading] = useState(false);
    let TVehicleType = vehicle_type.map((item) => ({
        value: item.value,
        label: t(`calc.fields.dd_lists.vehicle_type.${item.value}`),
    }));
    const selectedSample = { label: "", value: "" };
    const [lsValues, setLSValues] = useState<any>({
        price: "",
        auction: "iaai",
        auction_location_id: { ...selectedSample },
        shippingPrice: "",
        motor: { ...selectedSample },
        year: { ...selectedSample },
        auto_type: { ...TVehicleType[1] },
        engine_volume: "",
        checkbox: false,
        auction_fee: "",
    });
    const currentLanguage = i18n.language;
    const navigate = useNavigate();

    const [calculationResults, setCalculationsResults] = useState({
        price: 0,
        servicePrice: 0,
        auction_location_price: 0,
        copart_price: 0,
        insurance_price: 0,
        customs_clearance: 0,
        vat: 0,
        environmental: 0,
        total_price1: 0,
        total_price2: 0,
    });
    const errorMsg = t("calc.errors.invalid_value");
    const schema = useMemo(
        () =>
            yup.object().shape({
                price: yup.number().required(errorMsg).typeError(errorMsg),
                year: yup.number().required(errorMsg).typeError(errorMsg),
                auction_location: yup
                    .number()
                    .required(errorMsg)
                    .typeError(errorMsg),
                auction: yup
                    .string()
                    .required(errorMsg)
                    .trim()
                    .typeError(errorMsg),
                motor: yup.number().required(errorMsg).typeError(errorMsg),
                engine_volume: yup
                    .number()
                    .required(errorMsg)
                    .typeError(errorMsg),
                auto_type: yup.string().required(errorMsg).typeError(errorMsg),
                auction_location_id: yup
                    .number()
                    .required(errorMsg)
                    .typeError(errorMsg),
                auction_fee: yup.number().typeError(errorMsg),
            }),
        [errorMsg]
    );

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ICalcData>({ resolver: yupResolver(schema) });

    let TFuelType = fuelType.map((item) => ({
        value: item.value,
        label: t(`calc.fields.dd_lists.fuel_type.${item.value}`),
    }));
    let TAge =
        lsValues?.auto_type?.value !== "4" ? age.slice(0, 4) : age.slice(4);
    TAge = TAge.map((item) => ({
        value: item.value,
        label: t(`calc.fields.dd_lists.age.${item.value}`),
    }));

    const handleAuctionChange: MouseEventHandler<HTMLDivElement> = (e) => {
        interface IAuction extends DOMStringMap {
            auction: string;
        }
        const dataAuction = e.currentTarget.dataset as IAuction;
        const auction = dataAuction.auction;
        setLSValues({ ...lsValues, auction });
        setValue("auction", auction, { shouldValidate: true });
        const valuesToSet: any = {};
        if (auction !== "etc") {
            valuesToSet.auction_fee = "";
        } else {
            // otherRef.current?.focus();
        }
        valuesToSet.auction = auction;
        setLSValues({ ...lsValues, ...valuesToSet });
    };

    const handleSelectionChange = (
        newValue: SingleValue<SelectValue>,
        actionMeta: ActionMeta<SelectValue>,
        refName?: string
    ) => {
        if (refName && newValue?.value) {
            const rName = refName as keyof typeof FieldNames;
            const lsValuesNames = Object.keys(lsValues);

            if (lsValuesNames.includes(rName)) {
                let listToFind;
                switch (rName) {
                    case "auction_location_id":
                        listToFind = dataArr;
                        setValue(
                            "auction_location_id",
                            parseInt(newValue?.value),
                            { shouldValidate: true }
                        );
                        break;
                    case "year":
                        listToFind = TAge;
                        setValue("year", parseInt(newValue?.value), {
                            shouldValidate: true,
                        });
                        break;
                    case "auto_type":
                        listToFind = TVehicleType;
                        setValue("auto_type", newValue?.value, {
                            shouldValidate: true,
                        });
                        break;
                    case "motor":
                        listToFind = TFuelType;
                        setValue("motor", parseInt(newValue?.value), {
                            shouldValidate: true,
                        });
                        break;
                }
                const valueToSet = listToFind?.find(
                    (item) => item.value === newValue?.value
                );
                setLSValues({ ...lsValues, [rName]: valueToSet });
            }
        }
    };

    useEffect(() => {
        const valuesToSet: any = {};
        let calcData = localStorage.getItem("calc_data");
        let showCalcData = {} as IShowCalc;
        if (calcData) {
            let calcData2 = JSON.parse(calcData) as ILSData;
            if (calcData2.year) {
                let savedYear = TAge.find((item) => {
                    if (item.value == calcData2.year) {
                        setValue("year", parseInt(item.value));
                        return true;
                    }
                    return false;
                });
                valuesToSet.year = savedYear;
            }
            if (calcData2.auction_location_id) {
                let savedAuctionPlace = dataArr.find(
                    (item) => item.value == calcData2.auction_location_id
                );
                valuesToSet.auction_location_id = savedAuctionPlace;
                savedAuctionPlace?.value &&
                    setValue(
                        "auction_location_id",
                        parseInt(savedAuctionPlace.value)
                    );
            }
            if (calcData2.auction) {
                setValue("auction", calcData2.auction);
                valuesToSet.auction = calcData2.auction;
            }
            if (calcData2.auction_location_price) {
                setValue("auction_location", calcData2.auction_location_price);
                valuesToSet.shippingPrice = calcData2.auction_location_price;
                console.log({"calcData2.auction_location_price": calcData2.auction_location_price});
                showCalcData.auction_location_price =
                    calcData2.auction_location_price;
            }
            if (calcData2.price) {
                setValue("price", calcData2.price);
                valuesToSet.price = calcData2.price;
                showCalcData.price = calcData2.price;
            }
            if (calcData2.engine_volume) {
                setValue("engine_volume", calcData2.engine_volume);
                valuesToSet.engine_volume = calcData2.engine_volume;
            }
            if (calcData2.motor_type) {
                const motor = calcData2.motor_type as number;
                setValue("motor", motor);
                const savedMotor = TFuelType.find(
                    (item) => item.value == `${motor}`
                );
                valuesToSet.motor = savedMotor;
            }
            if (calcData2.transport_type) {
                const auto_type = calcData2.transport_type as number;
                setValue("auto_type", `${auto_type}`);
                const savedAutoType = TVehicleType.find(
                    (item) => item.value == `${auto_type}`
                );
                valuesToSet.auto_type = savedAutoType;
            }
            if (calcData2?.checkbox) {
                valuesToSet.checkbox = true;
            }
            if (calcData2?.auction === "etc" && calcData2?.auction_fee) {
                valuesToSet.auction_fee = calcData2?.auction_fee;
            }

            setLSValues({ ...valuesToSet });
            if (calcData2?.copart_price) {
                showCalcData.copart_price = calcData2?.copart_price;
            }
            if (calcData2?.servicePrice) {
                showCalcData.servicePrice = calcData2?.servicePrice;
            }
            if (calcData2?.customs_clearance) {
                showCalcData.customs_clearance = calcData2?.customs_clearance;
            }
            if (calcData2?.vat) {
                showCalcData.vat = calcData2?.vat;
            }
            if (calcData2?.environmental) {
                showCalcData.environmental = calcData2?.environmental;
            }
            if (calcData2?.insurance_price) {
                showCalcData.insurance_price = calcData2?.insurance_price;
            }
            if (calcData2?.total_price1) {
                showCalcData.total_price1 = calcData2?.total_price1;
            }
            if (calcData2?.total_price2) {
                showCalcData.total_price2 = calcData2?.total_price2;
            }
            setShowCalc(showCalcData);
        } else {
            setValue("auto_type", "sedan");
            setValue("auction", "iaai");
            setAuction("iaai");
            setLSValues({
                ...lsValues,
                auto_type: TVehicleType[1],
                auction: "iaai",
            });
        }
    }, [currentLanguage]);

    useEffect(() => {
        if (
            lsValues?.auction_location_id?.value &&
            lsValues?.auto_type?.value
        ) {
            const dataId = lsValues?.auction_location_id
                ?.value as keyof typeof data;
            const usState = data[dataId];
            if (usState) {
                const index = lsValues?.auto_type
                    ?.value as keyof typeof usState;
                const shippingPrice = parseInt(usState[index]);
                if (shippingPrice) {
                    setLSValues({ ...lsValues, shippingPrice });
                    setValue("auction_location", shippingPrice);
                }
            }
        }
    }, [lsValues?.auction_location_id?.value, lsValues?.auto_type?.value]);

    const handlePrint = async() => {
        // navigate("/print-pdf");

        try{
            setLoading(true);
            let dataToSend = localStorage.getItem('calc_data');
            let lang = localStorage.getItem('i18nextLng');
            if(dataToSend){
                let parsedData = JSON.parse(dataToSend) as any;
                const locationIndex = parsedData.auction_location_id as keyof typeof data;
                parsedData.auction_location_place = data[locationIndex].label;
                parsedData.lang = lang;
                const response = await axios.post('https://www.backend.autocomplex.am/api/create-pdf', parsedData);
                const fileName = response.data;
                window.open(`https://www.backend.autocomplex.am/pdf/${fileName}.pdf`, '_blank');
                // const res2 = await axios.get('https://www.backend.autocomplex.am/api/fetch-pdf', {responseType: 'blob'});
                // const res2 = await axios.get('http://localhost:5000/api/fetch-pdf', {responseType: 'blob'});
                // const pdfBlob = new Blob([res2.data], {type: 'application/pdf'});
                // saveAs(pdfBlob, 'calculation.pdf')
                setLoading(false);
            }
        }catch(err){
            console.log(err);
            setLoading(false);
        }
    };

    const onSubmit: SubmitHandler<ICalcData> = async (data) => {
        try {
            const errKeys = Object.keys(errors);
            if(errKeys.length){
                const errorsStringified = JSON.stringify(errors);
                alert( errorsStringified);
            }
            data.checkbox = lsValues.checkbox ? 1 : 0;
            setLoadingCalculate(true);
            let result = await axios.post(
                // "https://www.backend.autocomplex.am/api/calculate",
                "http://localhost:5000/api/calculate",
                data
            );
            const response = result.data as ICalcResponse;
            setLoadingCalculate(false);

            const {
                auction,
                engine_volume,
                // auction_location_price,
                auction_location_id,
                insurance_price,
                total_price1,
                total_price2,
                copart_price,
                servicePrice,
                price,
                vat,
                customs_clearance,
                environmental,
                year,
                motor,
            } = response;

            const auto_type = lsValues.auto_type.value
            // @ts-ignore
            const auction_location_price = priceList[auction_location_id][auto_type]
            setShowCalc({
                price,
                auction_location_price,
                insurance_price,
                total_price1,
                total_price2,
                copart_price,
                servicePrice,
                vat,
                customs_clearance,
                environmental,
            });

            const prData: IPrintProps = {
                auction,
                auction_location_id,
                year,
                auction_location_price,
                insurance_price,
                total_price1,
                total_price2,
                copart_price,
                servicePrice,
                price,
                vat,
                customs_clearance,
                environmental,
                motor_type: `${motor}`,
                engine_volume,
                transport_type: lsValues.auto_type.value,
                checkbox: lsValues.checkbox,
            };

            lsValues.auction_fee && (prData.auction_fee = lsValues.auction_fee);

            setPrinData(prData);
            localStorage.setItem("calc_data", JSON.stringify(prData));
            setCalculationsResults(response);
            setShowCalc(response);
            setCalculated(true);
        } catch (err) {
            interface IError {
                message: string;
            }
            const err_ = err as IError;
            setError(err_.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (
            lsValues?.year?.value == "1" &&
            lsValues?.auto_type?.value === "suv"
        ) {
            setOffRoadVisible(true);
        } else {
            setOffRoadVisible(false);
        }
    }, [lsValues?.year?.value, lsValues?.auto_type?.value]);

    if (error) {
        return (
            <h2 style={{ color: "red", textAlign: "center", padding: "30px" }}>
                {error}
            </h2>
        );
    }


    return (
        <>
            <div
                className="calculator"
            >
                <div className="container">
                    <p className="title">{t("calc.title")}</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="fields">
                            <div className="separator"></div>
                            <div className="field-container">
                                <Input
                                    value={lsValues.price}
                                    error={errors.price}
                                    label_class="calc_field_label"
                                    type="number"
                                    label={
                                        t("calc.fields.car_price") ||
                                        "Car Price"
                                    }
                                    {...register("price", {
                                        onChange: (e) => {
                                            setLSValues({
                                                ...lsValues,
                                                price: e.target.value,
                                            });
                                        },
                                    })}
                                />
                                <div className="field">
                                    <p className="calc_field_label">
                                        {t("calc.fields.fuel_type")}
                                    </p>
                                    <Select
                                        styles={{
                                            menuList: (baseStyles) => ({
                                                ...baseStyles,
                                                color: "var(--grey)"
                                            }),
                                        }}
                                        value={lsValues.motor}
                                        onChange={(value, actionMeta) =>
                                            handleSelectionChange(
                                                value,
                                                actionMeta,
                                                "motor"
                                            )
                                        }
                                        options={TFuelType}
                                        placeholder={`${t(
                                            "calc.fields.fuel_type"
                                        )}...`}
                                    />
                                    {errors?.motor && (
                                        <p className="validation_error">
                                            {errors?.motor?.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="field-container">
                                <div className="auction">
                                    <p className="auction_label_ calc_field_label">
                                        {t("calc.fields.auction_fee")}
                                    </p>
                                    <div className="auction_content">
                                        <div
                                            className={
                                                lsValues.auction === "iaai"
                                                    ? "selected"
                                                    : ""
                                            }
                                            data-auction="iaai"
                                            onClick={handleAuctionChange}
                                        ></div>
                                        <div
                                            className={
                                                lsValues.auction === "copart"
                                                    ? "selected"
                                                    : ""
                                            }
                                            data-auction="copart"
                                            onClick={handleAuctionChange}
                                        ></div>
                                        <div
                                            className={
                                                lsValues.auction === "etc"
                                                    ? "selected"
                                                    : ""
                                            }
                                            data-auction="etc"
                                            onClick={handleAuctionChange}
                                        >
                                            <span
                                                style={{ color: "var(--grey)" }}
                                            >
                                                {t("calc.fields.other")}
                                            </span>
                                        </div>
                                        <input
                                            // ref={otherRef}
                                            value={lsValues?.auction_fee}
                                            onChange={(e) => {
                                                setLSValues({
                                                    ...lsValues,
                                                    auction_fee: e.target.value,
                                                });
                                                setValue(
                                                    "auction_fee",
                                                    parseInt(e.target.value),
                                                    { shouldValidate: true }
                                                );
                                            }}
                                            readOnly={
                                                lsValues?.auction !== "etc"
                                            }
                                            type="number"
                                        />
                                    </div>
                                    {errors?.auction && (
                                        <p className="validation_error">
                                            {errors?.auction?.message}
                                        </p>
                                    )}
                                </div>
                                <div className="field">
                                    <p className="calc_field_label">
                                        {t("calc.fields.age")}
                                    </p>
                                    <Select
                                        styles={{
                                            menuList: (baseStyles) => ({
                                                ...baseStyles,
                                                color: "var(--grey)",
                                            }),
                                        }}
                                        value={lsValues.year}
                                        onChange={(value, actionMeta) =>
                                            handleSelectionChange(
                                                value,
                                                actionMeta,
                                                "year"
                                            )
                                        }
                                        options={TAge}
                                        placeholder={`${t(
                                            "calc.fields.age"
                                        )}...`}
                                    />
                                    {errors?.year && (
                                        <p className="validation_error">
                                            {errors?.year?.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="field-container">
                                <div className="field">
                                    <p className="calc_field_label">
                                        {t("calc.fields.select_location")}
                                    </p>
                                    <Select
                                        styles={{
                                            menuList: (baseStyles) => ({
                                                ...baseStyles,
                                                color: "var(--grey)",
                                            }),
                                        }}
                                        value={lsValues.auction_location_id}
                                        options={dataArr}
                                        onChange={(value, actionMeta) =>
                                            handleSelectionChange(
                                                value,
                                                actionMeta,
                                                "auction_location_id"
                                            )
                                        }
                                        placeholder={`${t(
                                            "calc.fields.select_location"
                                        )}...`}
                                    />
                                    {errors?.auction_location_id && (
                                        <p className="validation_error">
                                            {
                                                errors?.auction_location_id
                                                    ?.message
                                            }
                                        </p>
                                    )}
                                </div>
                                <Input
                                    error={errors.engine_volume}
                                    value={lsValues.engine_volume}
                                    {...register("engine_volume", {
                                        onChange: (e) =>
                                            setLSValues({
                                                ...lsValues,
                                                engine_volume: e.target.value,
                                            }),
                                    })}
                                    label_class="calc_field_label"
                                    type="number"
                                    label={
                                        t("calc.fields.engine") || "Engine, cm³"
                                    }
                                />
                            </div>
                            <div className="field-container">
                                <div className="field">
                                    <p className="calc_field_label">
                                        {t("calc.fields.shipping")}
                                    </p>
                                    <div className="shipping">
                                        {lsValues.shippingPrice}
                                    </div>
                                </div>
                                <div className="field">
                                    <p className="calc_field_label">
                                        {t("calc.fields.vehicle_type")}
                                    </p>
                                    <Select
                                        styles={{
                                            menuList: (baseStyles) => ({
                                                ...baseStyles,
                                                color: "var(--grey)",
                                            }),
                                        }}
                                        value={lsValues.auto_type}
                                        onChange={(value, actionMeta) =>
                                            handleSelectionChange(
                                                value,
                                                actionMeta,
                                                "auto_type"
                                            )
                                        }
                                        options={TVehicleType}
                                        placeholder={`${t(
                                            "calc.fields.vehicle_type"
                                        )}...`}
                                    />
                                    {errors?.auto_type && (
                                        <p className="validation_error">
                                            {errors?.auto_type?.message}
                                        </p>
                                    )}
                                    {offRoadVisible && (
                                        <div className="off-road">
                                            <p className="calc_field_label">
                                                {t("calc.fields.off_road")}
                                            </p>
                                            <input
                                                type="checkbox"
                                                checked={lsValues?.checkbox}
                                                onChange={() =>
                                                    setLSValues({
                                                        ...lsValues,
                                                        checkbox:
                                                            !lsValues?.checkbox,
                                                    })
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            {!loadingCalculate && (
                                <button className="calculate_btn">
                                    {t("calc.fields.calculate")}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
                {loadingCalculate && (
                    <div className="calculation-loading">
                        <img src={LoadingImg} />
                    </div>
                )}

                {showCalc.price && (
                    <div className="calculations">
                        <div className="container">
                            <div className="row">
                                <Calculation
                                    color="red"
                                    label={t("calc.fields.car_price")}
                                    // value={calculationResults.price?.toLocaleString()}
                                    value={showCalc.price?.toLocaleString()}
                                />
                                <Calculation
                                    color="yellow"
                                    label={t("print.customs_duty")}
                                    // value={calculationResults.customs_clearance?.toLocaleString()}
                                    value={showCalc.customs_clearance?.toLocaleString()}
                                />
                            </div>
                            <div className="row">
                                <Calculation
                                    color="red"
                                    label={t("calc.fields.auction_fee")}
                                    // value={calculationResults.copart_price?.toLocaleString()}
                                    value={showCalc.copart_price?.toLocaleString()}
                                />
                                <Calculation
                                    color="yellow"
                                    label={t("print.vat")}
                                    // value={calculationResults.vat?.toLocaleString()}
                                    value={showCalc.vat?.toLocaleString()}
                                />
                            </div>
                            <div className="row">
                                <Calculation
                                    color="orange"
                                    label={t("calc.fields.shipping")}
                                    // value={calculationResults.auction_location_price?.toLocaleString()}
                                    value={showCalc.auction_location_price?.toLocaleString()}
                                />
                                <Calculation
                                    color="yellow"
                                    label={t("print.eco_tax")}
                                    // value={calculationResults.environmental?.toLocaleString()}
                                    value={showCalc.environmental?.toLocaleString()}
                                />
                            </div>
                            <div className="row">
                                <Calculation
                                    color="orange"
                                    label={t("main.item_titles.insurance")}
                                    // value={calculationResults.insurance_price?.toLocaleString()}
                                    value={showCalc.insurance_price?.toLocaleString()}
                                />
                                <Calculation
                                    color="yellow"
                                    label={t("print.broker_fee")}
                                    value={`75`}
                                />
                            </div>
                            <div className="row">
                                <Calculation
                                    color="orange"
                                    label={t("print.service_fee")}
                                    // value={calculationResults.servicePrice?.toLocaleString()}
                                    value={showCalc.servicePrice?.toLocaleString()}
                                />
                            </div>
                            <div className="results_row_separator"></div>
                            <div className="row results_row">
                                <span className="total">
                                    {t("print.total")}
                                </span>
                                <span className="amd">
                                    {/*{calculationResults.total_price1?.toLocaleString()}{" "}*/}
                                    {showCalc.total_price1?.toLocaleString()} ֏
                                </span>
                                <span className="dollar">
                                    {/*{calculationResults.total_price2?.toLocaleString()}{" "}*/}
                                    {showCalc.total_price2?.toLocaleString()} $
                                </span>
                            </div>
                            <div className="row results_info">
                                <div className="red_info">
                                    <span className="red"></span>
                                    <span>{t("print.col_1")}</span>
                                </div>
                                <div className="orange_info">
                                    <span className="orange"></span>
                                    <span>{t("print.col_2")}</span>
                                </div>
                                <div className="yellow_info">
                                    <span className="yellow"></span>
                                    <span>{t("print.col_3")}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {showCalc.price && !loading && (
                <button
                    className="preview_btn"
                    onClick={handlePrint}
                >
                    {t("calc.print")}
                </button>
            )}
            {showCalc.price && loading && (
                <div className="calculation-loading">
                    <img src={LoadingImg} />
                </div>
            )}
        </>
    );
};

export default Calculator;
