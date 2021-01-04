import { authReducer } from "./auth";
import { massageReducer } from "./massageReducer";
import { combineReducers } from "redux";

const allReducer = combineReducers({
  authReducer: authReducer,
  massages: massageReducer,
});

export default allReducer;
