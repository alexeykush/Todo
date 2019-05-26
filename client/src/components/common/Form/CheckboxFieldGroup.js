import React from 'react';

const CheckboxFieldGroup = ({ handleChange, text, id, checked }) => {
    return (
        <div className="custom-control custom-checkbox">
            <input
                type="checkbox"
                className="custom-control-input"
                id={id}
                onChange={handleChange}
                checked={checked}
            />
            <label className="custom-control-label" htmlFor={id}>{text}</label>
        </div>
    );
};

export default CheckboxFieldGroup;