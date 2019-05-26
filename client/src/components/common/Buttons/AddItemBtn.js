import React from 'react';

const AddItemBtn = ({ onClick }) => {
    return (
        <button role="button" type="button" className="btn btn-success my-3" onClick={onClick}>
            Add Item
            <i className="fas fa-plus" style={{paddingLeft: 15, color:"#fff"}}/>
        </button>
    );
};

export default AddItemBtn;