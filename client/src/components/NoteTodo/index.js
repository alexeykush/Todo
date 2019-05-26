import React from 'react';
import {connect} from "react-redux";

import DeleteBtn from "../common/Buttons/DeleteBtn";
import EditBtn from "../common/Buttons/EditBtn";
import CheckboxFieldGroup from "../common/Form/CheckboxFieldGroup";

import {updateCompleted, deleteTodo} from "../../actions/notesActions";

const NoteTodo = ({title, lists, _id, image, updateCompleted, deleteTodo}) => {
    const handleChange = (listItemId) => {
        const newData = [...lists];
        const changedItem = newData.find(item => item._id === listItemId);
        changedItem.completed = !changedItem.completed;

        updateCompleted(_id, newData);
    };

    const generateList = () => {
        const notCompleted = lists
            .filter(item => !item.completed)
            .map(item => (
                <CheckboxFieldGroup
                    key={item._id}
                    id={item._id}
                    checked={false}
                    handleChange={() => handleChange(item._id)}
                    text={item.text}
                />
            ));

        const completed = lists
            .filter(item => item.completed)
            .map(item => (
                <CheckboxFieldGroup
                    key={item._id}
                    id={item._id}
                    checked={true}
                    handleChange={() => handleChange(item._id)}
                    text={item.text}
                />
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
            {image && image.url && <img className="card-img-top" src={image.url} alt="Card image cap" />}
            <div className="card-body position-relative">
                {title && <h5 className="card-title">{title}</h5>}
                {generateList()}
                <DeleteBtn onClick={() => deleteTodo(_id)}/>
                <EditBtn linkTo={`todo/${_id}`}/>
            </div>
        </div>
    );
};

const mapDispatchToProps = {
    updateCompleted,
    deleteTodo
};

export default connect(null, mapDispatchToProps)(NoteTodo);