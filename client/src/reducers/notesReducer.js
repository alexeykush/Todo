import {
    GET_NOTES,
    GET_NOTES_TODO,
    UPDATE_NOTES_TODO,
    GET_NOTE,
    NOTE_LOADING,
    NOTES_LOADING,
    CLEAR_NOTE,
    NOTES_TODO_LOADING,
    GET_TODO,
    CLEAR_TODO,
    TODO_LOADING,
    GET_NOTE_IMAGE,
    GET_TODO_IMAGE,
    IMAGE_LOADING,
    CLEAR_NOTE_IMAGE,
    CLEAR_TODO_IMAGE
} from "../actions/types";

const initialState = {
    notes: [],
    notesTodo: [],
    note: {},
    todo: {},
    imageLoading: false,
    loading: false
};

export default function (state = initialState, {type, payload}) {
    switch (type) {
        case GET_NOTES:
            return {
                ...state,
                notes: payload,
                loading: false
            };
        case GET_NOTES_TODO:
            return {
                ...state,
                notesTodo: payload,
                loading: false
            };
        case NOTES_LOADING:
        case NOTES_TODO_LOADING:
        case NOTE_LOADING:
        case TODO_LOADING:
            return {
                ...state,
                loading: true
            };
        case IMAGE_LOADING:
            return {
                ...state,
                imageLoading: true
            };
        case GET_NOTE:
            return {
                ...state,
                loading: false,
                note: payload
            };
        case GET_NOTE_IMAGE:
            return {
                ...state,
                imageLoading: false,
                note: {...state.note, image: payload}
            };
        case GET_TODO_IMAGE:
            return {
                ...state,
                imageLoading: false,
                todo: {...state.todo, image: payload}
            };
        case CLEAR_NOTE_IMAGE:
            return {
                ...state,
                imageLoading: false,
                note: {...state.note, image: {}}
            };
        case CLEAR_TODO_IMAGE:
            return {
                ...state,
                imageLoading: false,
                todo: {...state.todo, image: {}}
            };
        case GET_TODO :
            return {
                ...state,
                loading: false,
                todo: payload
            };
        case CLEAR_NOTE:
            return {
                ...state,
                note: {}
            };
        case CLEAR_TODO:
            return {
                ...state,
                todo: {}
            };
        case UPDATE_NOTES_TODO:
            const newNotesTodo = [...state.notesTodo];
            const item = newNotesTodo.find(item => item._id === payload._id);
            newNotesTodo[newNotesTodo.indexOf(item)] = payload;
            return {
                ...state,
                notesTodo: newNotesTodo
            };
        default:
            return state
    }
}