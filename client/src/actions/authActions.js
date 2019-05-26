import axios from "axios";
import jwt_decode from "jwt-decode";

import { LOGIN_USER, GET_ERRORS, LOGOUT_USER } from "./types";
import { setAuthToken, removeAuthToken } from "../utils/authTokenHandler";

export const loginUser = (data, history) => dispatch => {
    axios
        .post("/api/users/login", data)
        .then(res => res.data)
        .then(data => {
            setAuthToken(data.token);
            window.localStorage.setItem("token", data.token);
            dispatch({
                type: LOGIN_USER,
                payload: data.user
            });
            history.push("/")
        })
        .catch(e => {
            dispatch({
                type: GET_ERRORS,
                payload: e.response.data
            })
        })
};

export const setCurrentUser = token => {
    setAuthToken(token);
    return {
        type: LOGIN_USER,
        payload: jwt_decode(token)
    };
};

export const registerUser = (userData,history) => dispatch => {
    axios
        .post("/api/users/register", userData)
        .then(() => history.push("/login"))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};

export const logoutUser = () => {
    removeAuthToken();
    window.localStorage.removeItem("token");
    return {
        type: LOGOUT_USER
    };
};