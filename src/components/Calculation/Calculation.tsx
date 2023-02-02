import React, {FC} from "react";
import "./Calculation.scss";

interface ICalculationProps{
    color: string;
    label: string;
    value: string;
}

const Calculation: FC<ICalculationProps> = ({color, label, value}) => {
    return (
        <div className="calculation_field">
            <span className={`color ${color}`}></span>
            <span className="label">{label}</span>
            <span className="value">{value}</span>
        </div>
    );
};

export default Calculation;
