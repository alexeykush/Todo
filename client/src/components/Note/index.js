import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import DeleteBtn from "../common/DeleteBtn";

import {deleteNote} from "../../actions/notesActions";

const Note = ({text, title, _id, deleteNote}) => {
    return (
        <div className="card">
            <div className="card-body">
                {title && <h5 className="card-title">{title}</h5>}
                <p className="card-text">{text}</p>
                <DeleteBtn onClick={() => deleteNote(_id)}/>
                <Link
                    to={`note/${_id}`}
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
    deleteNote
};

export default connect(null, mapDispatchToProps)(Note);