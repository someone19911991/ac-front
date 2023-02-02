import React, { useEffect } from "react";
import "./OrderCall.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Input from "../../components/UI/Input/Input";
import callImg from "../../assets/images/call.jpg";
import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { orderCall } from "../App/appApiSlice";
import { setStatus } from "../App/appSlice";

export interface IOrderCallFormProps {
    fullName?: string;
    phone: string;
    budget?: string;
    min?: string;
    max?: string;
    car_model?: string;
    notes?: string;
    file?: FileList;
}


const OrderCall = () => {
    const { t } = useTranslation();
    const invalid_number = t("order_a_call.invalid_number");
    const pdf_only = t("order_a_call.pdf_only");
    const file_max_size = t("order_a_call.file_max_size");
    const schema = yup.object().shape({
        fullName: yup.string(),
        phone: yup
            .mixed()
            .test("phone", invalid_number, (value) => {
                const pattern = /\+374\d{8}/i;
                return value.match(pattern);
            }),
        budget: yup.string(),
        min: yup.string(),
        max: yup.string(),
        car_model: yup.string(),
        notes: yup.string(),
        file: yup
            .mixed()
            .test("fileSize", file_max_size, (value) => {
                if (value[0]) {
                    return value[0] && value[0]?.size <= 5000000;
                }
                return true;
            })
            .test("fileType", pdf_only, (value) => {
                if (value[0]) {
                    return value[0] && value[0]?.type === "application/pdf";
                }
                return true;
            }),
    });

    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector((state) => state.appSliceReducer);
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm<IOrderCallFormProps>({ resolver: yupResolver(schema) });

    const submitHandler = async (data: IOrderCallFormProps) => {
        await dispatch(orderCall(data));
    };

    useEffect(() => {
        if (status === "fulfilled") {
            setTimeout(() => dispatch(setStatus("idle")), 3000);
            reset();
        }
    }, [status]);

    return (
        <div className="order_call">
            <div className="call_img">
                <img src={callImg} alt="Order a call" />
            </div>
            <form onSubmit={handleSubmit(submitHandler)}>
                {error && <h3 className="error">{error}</h3>}
                {status === "fulfilled" && (
                    <h3 className="success">Mail sent successfully</h3>
                )}
                <Input
                    placeholder={`${t("order_a_call.name")}`}
                    {...register("fullName")}
                />
                <Input
                    placeholder={`${t("order_a_call.phone")}`}
                    error={errors.phone}
                    {...register("phone")}
                />
                <Input
                    placeholder={`${t("order_a_call.budget")}`}
                    {...register("budget")}
                />
                <div className="min_max">
                    <Input
                        placeholder={`${t("order_a_call.min")}`}
                        {...register("min")}
                    />
                    <Input
                        placeholder={`${t("order_a_call.max")}`}
                        {...register("max")}
                    />
                </div>
                <Input
                    placeholder={`${t("order_a_call.car_model")}`}
                    {...register("car_model")}
                />
                <Input
                    placeholder={`${t("order_a_call.notes")}`}
                    {...register("notes")}
                />
                <div className="attach_file">
                    <label htmlFor="attach_file">
                        <span>{`${t("order_a_call.attach_calculation")}`}</span>
                        <FontAwesomeIcon icon={faCalculator} />
                    </label>
                    <input
                        id="attach_file"
                        multiple
                        type="file"
                        {...register("file")}
                    />
                    {errors?.file && (
                        <p className="validation_error">
                            {errors?.file.message}
                        </p>
                    )}
                </div>
                <div>
                    <button disabled={status === "pending"}>
                        {t("order_call")}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OrderCall;
