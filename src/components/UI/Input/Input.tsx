import React, { forwardRef, HTMLProps, useEffect } from "react";
import "./Input.scss";

interface IUIInput extends HTMLProps<HTMLInputElement> {
    label?: string;
    label_class?: string;
    error?: any;
}

function transformLabel(labelText: string) {
    return labelText.toLowerCase().split(" ").join("_");
}

const Input = forwardRef<HTMLInputElement, IUIInput>((props, ref) => {

    return (
        <div className="ui_input">
            {props.label && (
                <label
                    className={props?.label_class || ""}
                    htmlFor={transformLabel(props?.label)}
                >
                    {props.label}
                </label>
            )}
            <input
                ref={ref}
                {...props}
                id={props?.label && transformLabel(props?.label)}
            />
            {props?.error?.ref?.name && (
                <p className="validation_error">{props?.error?.message}</p>
            )}
        </div>
    );
});

export default Input;
