import React from 'react';

import Note from "../Note";
import NoteTodo from "../NoteTodo";

const NoteList = ({ data }) => {
    const generateData = () => (
        data.map(item => (
            <div className="col-md-4 mb-3" key={item._id}>
                {
                    item.type === "note"
                        ? <Note {...item} />
                        : <NoteTodo {...item} />
                }
            </div>
        ))
    );

    return (
        <section className="notes">
            <div className="container">
                <div className="row">
                    {generateData()}
                </div>
            </div>
        </section>
    );
};

export default NoteList;