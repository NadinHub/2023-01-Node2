import { useState } from "react";
import "./formInput.css"

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const { label: label1, errorMessage, onChange, id, className, ...inputProps } = props;
    // label = "Username" or ...
    // we take key from Odject props and assign them their value.
    //unorderd

    const handleFocus = (e) => {
        setFocused(true);
    }

    if (props.type !== "radio") {
        return (
            <div className="joinForm__input">
                <label className="joinForm__label">{label1}</label>
                {/* {label && <label htmlFor="input-field">{label}</label>} */}
                <input
                    className="joinInput" {...inputProps}
                    onChange={onChange}
                    onBlur={handleFocus}
                    onFocus={() => { inputProps.name === "confirmPassword" && setFocused(true) }}
                    focused={focused.toString()} />
                <span className="joinForm__error">{errorMessage}</span>            </div>
        )
    } else {
        return (
            // <div className="form-check-input-wraper">
            <div className="form-check-input">
                <input {...inputProps} onChange={onChange} />
                <label>{label1}</label>
            </div>
            // </div>
        )
    }
}

export default FormInput
