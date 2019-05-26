import React from 'react';

import DeleteBtn from "../Buttons/DeleteBtn";

const styles = {
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    borderRadius: 0,
    boxShadow: "none",
    backgroundImage: "none"
};

const checkboxStyles = {
    position: "absolute",
    zIndex: 1,
    opacity: 0,
    left: 2,
    top: 6
};

const TodoGroup = ({ text, placeholder, onChange, completed, onCheckboxChange, onDelete}) => {
    return (
        <div className="form-group d-flex justify-content-between align-items-center position-relative mb-2">
            <div className=" custom-control custom-checkbox pr-2">
                <input type="checkbox" className="custom-control-input" style={checkboxStyles} onChange={onCheckboxChange} checked={completed}/>
                <label className="custom-control-label"/>
            </div>
            <input
                type="text"
                className="form-control form-control-lg p-0"
                placeholder={placeholder}
                onChange={onChange}
                value={text}
                style={styles}
            />
            <DeleteBtn onClick={onDelete} addStyles={{top:-5, right: 0}}/>
        </div>
    );
};

export default TodoGroup;