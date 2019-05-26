import axios from "axios";

import {
    GET_NOTES,
    GET_NOTES_TODO,
    UPDATE_NOTES_TODO,
    GET_NOTE, CLEAR_NOTE,
    NOTE_LOADING,
    GET_ERRORS,
    NOTES_LOADING,
    NOTES_TODO_LOADING,
    GET_TODO,
    CLEAR_TODO,
    TODO_LOADING,
    GET_NOTE_IMAGE,
    GET_TODO_IMAGE,
    IMAGE_LOADING,
    CLEAR_NOTE_IMAGE,
    CLEAR_TODO_IMAGE
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

export const getTodo = id => dispatch => {
    dispatch({
        type:TODO_LOADING
    });
    axios
        .get(`/api/lists/${id}`)
        .then(res => res.data)
        .then(data => {
            dispatch({
                type: GET_TODO,
                payload: data.list
            })
        })
        .catch(e => {
            dispatch({
                type: GET_ERRORS,
                payload: e.response.data
            })
        })
};

export const uploadNoteImage = data => dispatch => {
    const config = {
        header: {'content-type':'multipart/form-data'}
    };
    dispatch(imageLoading());
    axios
        .post("/api/images", data, config)
        .then(res => res.data)
        .then(data => {
            dispatch({
                type: GET_NOTE_IMAGE,
                payload: data
            })
        })
        .catch(e => console.log(e));
};

export const uploadTodoImage = data => dispatch => {
    const config = {
        header: {'content-type':'multipart/form-data'}
    };
    dispatch(imageLoading());
    axios
        .post("/api/images", data, config)
        .then(res => res.data)
        .then(data => {
            dispatch({
                type: GET_TODO_IMAGE,
                payload: data
            })
        })
        .catch(e => console.log(e));
};

export const removeNoteImage = id => dispatch => {
    dispatch(imageLoading());
    axios
        .delete(`/api/images/${id}`)
        .then(() => {
            dispatch(clearNoteImage())
        })
        .catch(e => console.log(e));
};

export const removeTodoImage = id => dispatch => {
    dispatch(imageLoading());
    axios
        .delete(`/api/images/${id}`)
        .then(() => {
            dispatch(clearTodoImage())
        })
        .catch(e => console.log(e));
};

export const addNote = (data, history) => dispatch => {
    axios
        .post("/api/notes", data)
        .then(() => history.push("/"))
        .catch(e => console.log(e))
};

export const addTodo = (data, history) => dispatch => {
    axios
        .post("/api/lists", data)
        .then(() => history.push("/"))
        .catch(e => console.log(e))
};

export const updateNote = (data, id, history) => dispatch => {
    axios
        .put(`/api/notes/${id}`, data)
        .then(() => history.push("/"))
        .catch(e => console.log(e))
};

export const updateTodo = (data, id, history) => dispatch => {
    axios
        .put(`/api/lists/${id}`, data)
        .then(() => history.push("/"))
        .catch(e => console.log(e))
};

export const deleteNote = id => dispatch => {
    axios
        .delete(`/api/notes/${id}`)
        .then(() => dispatch(getNotes()))
        .catch(e => console.log(e))
};

export const deleteTodo = id => dispatch => {
    axios
        .delete(`/api/lists/${id}`)
        .then(() => dispatch(getNotesTodo()))
        .catch(e => console.log(e));
};

export const clearNote = () => {
    return {
        type: CLEAR_NOTE
    }
};

export const clearTodo = () => {
    return {
        type: CLEAR_TODO
    }
};

export const imageLoading = () => ({
    type: IMAGE_LOADING
});

export const clearNoteImage = () => ({
    type: CLEAR_NOTE_IMAGE
});

export const clearTodoImage = () => ({
    type: CLEAR_TODO_IMAGE
});