import React from 'react';
import {connect} from "react-redux";

import DeleteBtn from "../common/Buttons/DeleteBtn";
import EditBtn from "../common/Buttons/EditBtn";

import {deleteNote} from "../../actions/notesActions";

const Note = ({text, title, _id, deleteNote, image}) => {
    return (
        <div className="card">
            {image && image.url && <img className="card-img-top" src={image.url} alt="Card image cap" />}
            <div className="card-body">
                {title && <h5 className="card-title">{title}</h5>}
                <p className="card-text">{text}</p>
                <DeleteBtn onClick={() => deleteNote(_id)}/>
                <EditBtn linkTo={`note/${_id}`}/>
            </div>
        </div>
    );
};

const mapDispatchToProps = {
    deleteNote
};

export default connect(null, mapDispatchToProps)(Note);