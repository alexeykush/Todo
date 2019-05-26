import React from 'react';
import { Link } from "react-router-dom";

const Button = ({ linkTo, text, classes = "" }) => {
    return (
        <Link to={linkTo} role="button" className={`btn btn-lg mb-2 font-weight-bold ${classes}`}>
            {text}
            <i className="fas fa-plus" style={{paddingLeft: 15, fontSize: 24, color:"#fff"}}/>
        </Link>
    );
};

export default Button;