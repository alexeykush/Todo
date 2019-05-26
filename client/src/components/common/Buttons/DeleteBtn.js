import React from 'react';

const styles = {
    position: "absolute",
    top: 0,
    right: 5,
    outline: "none"
};

const DeleteBtn = ({ onClick, addStyles }) => {
    return (
        <button onClick={onClick} type="button" className="close" aria-label="Close" style={{...styles, ...addStyles}}>
            <span aria-hidden="true">&times;</span>
        </button>
    );
};

export default DeleteBtn;