import React from 'react';

import Note from "../Note";
import NoteTodo from "../NoteTodo";

const NoteList = ({data, user}) => {
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

    const noDataCase = () => (
        <>
            <h1 className="text-center w-100">Hi, {user.name}!</h1>
            <h2 className="text-center">You don't have any notes yet. Click on one of the buttons to add note/todo  </h2>
        </>
    );

    return (
        <section className="notes">
            <div className="container">
                <div className="row">
                    {data && data.length ? generateData() : noDataCase()}
                </div>
            </div>
        </section>
    );
};

export default NoteList;