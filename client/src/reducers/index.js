import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import clientReducer from "./clientReducer";
import invoiceReducer from "./invoiceReducer";
import profileReducer from "./profileReducer";
import billReducer from "./billReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  client: clientReducer,
  invoice: invoiceReducer,
  profile: profileReducer,
  bill: billReducer
});
