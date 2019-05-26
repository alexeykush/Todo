import { LOGIN_USER, LOGOUT_USER } from "../actions/types";

import isEmpty from "../validation/isEmpty"

const initialState = {
    isAuth: false,
    user: {}
};

export default function (state = initialState, { type, payload }) {
    switch (type) {
        case LOGIN_USER:
            return {
                ...state,
                isAuth: !isEmpty(payload),
                user: payload
            };
        case LOGOUT_USER:
            return {
                ...state,
                ...initialState
            };
        default:
            return state
    }
}