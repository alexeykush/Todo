import React from 'react';
import {Link} from "react-router-dom";

const EditBtn = ({ linkTo }) => {
    return (
        <Link
            to={linkTo}
            style={{
                position: "absolute",
                top: 6,
                right: 30,
                fontSize: 16
            }}
            className="close"
        >
         <span className='fas'>&#xf044;</span>
        </Link>
    );
};

export default EditBtn;