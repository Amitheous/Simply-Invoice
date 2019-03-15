import {
  GET_BILLS,
  GET_BILL,
  BILL_LOADING,
  DELETE_BILL
} from "../actions/types";

const initialState = {
  bill: null,
  bills: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case BILL_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_BILLS:
      return {
        ...state,
        bills: action.payload,
        loading: false
      };
    case GET_BILL:
      return {
        ...state,
        bill: action.payload,
        loading: false
      };
    case DELETE_BILL:
      return {
        ...state,
        bills: state.bills.filter(bill => bill._id !== action.payload)
      };
    default:
      return state;
  }
}
