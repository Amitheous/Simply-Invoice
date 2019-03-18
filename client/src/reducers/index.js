import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import clientReducer from "./clientReducer";
import profileReducer from "./profileReducer";
import formReducer from "./formReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  errors: errorReducer,
  client: clientReducer,
  profile: profileReducer
});
