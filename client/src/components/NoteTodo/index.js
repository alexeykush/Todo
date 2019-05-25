import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import DeleteBtn from "../common/DeleteBtn";

import { updateCompleted } from "../../actions/notesActions";

const NoteTodo = ({title, lists, _id, updateNotesTodo}) => {
    const handleChange = (listItemId) => {
        const newData = [...lists];
        const changedItem = newData.find(item => item._id === listItemId);
        changedItem.completed = !changedItem.completed;

        updateNotesTodo(_id, newData);
    };


    const generateList = () => {
        const notCompleted = lists
            .filter(item => !item.completed)
            .map(item => (
                <div className="custom-control custom-checkbox" key={item._id}>
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id={item._id}
                        onChange={() => handleChange(item._id)}
                        checked={false}
                    />
                    <label className="custom-control-label" htmlFor={item._id}>{item.text}</label>
                </div>
            ));

        const completed = lists
            .filter(item => item.completed)
            .map(item => (
                <div className="custom-control custom-checkbox" key={item._id}>
                    <input
                        type="checkbox"
                        className="custom-control-input"
                        id={item._id}
                        onChange={() => handleChange( item._id)}
                        checked
                    />
                    <label className="custom-control-label" htmlFor={item._id}>{item.text}</label>
                </div>
            ));
        return (
            <>
                {notCompleted}
                {completed.length > 0 && <hr/>}
                {completed}
            </>
        )
    };

    return (
        <div className="card">
            <div className="card-body position-relative">
                {title && <h5 className="card-title">{title}</h5>}
                {generateList()}
                <DeleteBtn/>
                <Link
                    to={`note-list/${_id}`}
                    style={{
                        position: "absolute",
                        top: 6,
                        right: 30,
                        fontSize: 16
                    }}
                    className="close"
                >
                    <span className='fas'
                    >&#xf044;</span>
                </Link>
            </div>
        </div>
    );
};

const mapDispatchToProps = {
    updateNotesTodo: updateCompleted
};

export default connect(null, mapDispatchToProps)(NoteTodo);