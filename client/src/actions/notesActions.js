import axios from "axios";

import {
    GET_NOTES,
    GET_NOTES_TODO,
    UPDATE_NOTES_TODO,
    GET_NOTE, CLEAR_NOTE,
    NOTE_LOADING,
    GET_ERRORS,
    NOTES_LOADING,
    NOTES_TODO_LOADING
} from "./types";

export const getNotes = () => dispatch => {
    dispatch({
       type: NOTES_LOADING
    });
    axios
        .get("/api/notes")
        .then(res => res.data)
        .then(data => {
            dispatch({
                type: GET_NOTES,
                payload: data.notes
            });
        })
        .catch(e => console.log(e));
};

export const getNotesTodo = () => dispatch => {
    dispatch({
        type: NOTES_TODO_LOADING
    });
    axios
        .get("/api/lists")
        .then(res => res.data)
        .then(data => {
            dispatch({
                type: GET_NOTES_TODO,
                payload: data.lists
            });
        })
        .catch(e => console.log(e));
};

export const updateCompleted = (id, data) => dispatch => {
    axios
        .put(`/api/lists/${id}`, {items: data})
        .then(res => res.data)
        .then(data => {
            dispatch({
                type: UPDATE_NOTES_TODO,
                payload: data.list
            });
        })
        .catch(e => console.log(e.response.data))
};


export const getNote = id => dispatch => {
    dispatch({
        type:NOTE_LOADING
    });
    axios
        .get(`/api/notes/${id}`)
        .then(res => res.data)
        .then(data => {
            dispatch({
                type: GET_NOTE,
                payload: data.note
            })
        })
        .catch(e => {
            dispatch({
                type: GET_ERRORS,
                payload: e.response.data
            })
        })
};

export const addNote = (data, history) => dispatch => {
    axios
        .post("/api/notes", data)
        .then(() => history.push("/"))
        .catch(e => console.log(e))
};

export const updateNote = (data, id, history) => dispatch => {
    axios
        .put(`/api/notes/${id}`, data)
        .then(() => history.push("/"))
        .catch(e => console.log(e))
};

export const deleteNote = (id) => dispatch => {
    axios
        .delete(`/api/notes/${id}`)
        .then(() => dispatch(getNotes()))
        .catch(e => console.log(e))
};

export const clearNote = () => {
    return {
        type: CLEAR_NOTE
    }
};