import React from 'react';
import classnames from "classnames";

const TextFieldGroup = ({name, placeholder, value, error, type = "text", onChange, ...rest}) => {
    return (
        <div className="form-group">
            <input
                type={type}
                className={classnames("form-control form-control-lg", {
                    "is-invalid": error
                })}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                {...rest}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default TextFieldGroup;