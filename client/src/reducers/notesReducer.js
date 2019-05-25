import {
    GET_NOTES,
    GET_NOTES_TODO,
    UPDATE_NOTES_TODO,
    GET_NOTE,
    NOTE_LOADING,
    NOTES_LOADING,
    CLEAR_NOTE,
    NOTES_TODO_LOADING
} from "../actions/types";

const initialState = {
    notes: [],
    notesTodo: [],
    note: {},
    todo: {},
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
            return {
                ...state,
                loading: true
            };
        case GET_NOTE :
            return {
                ...state,
                loading: false,
                note: payload
            };
        case CLEAR_NOTE:
            return {
                ...state,
                note: {}
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