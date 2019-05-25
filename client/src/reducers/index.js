import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import notesReducer from "./notesReducer";

export default combineReducers({
    auth: authReducer,
    notes: notesReducer,
    errors: errorsReducer
});