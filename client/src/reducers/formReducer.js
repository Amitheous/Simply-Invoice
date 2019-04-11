import {
  GET_INVOICES,
  GET_INVOICE,
  GET_BILL,
  GET_BILLS,
  DELETE_BILL,
  FORM_LOADING,
  DELETE_INVOICE,
  GET_FORMS
} from "../actions/types";

const initialState = {
  invoice: null,
  invoices: null,
  bill: null,
  bills: null,
  forms: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_FORMS:
      return {
        ...state,
        forms: action.payload,
        loading: false
      };
    case FORM_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_INVOICES:
      return {
        ...state,
        invoices: action.payload,
        loading: false
      };
    case GET_INVOICE:
      return {
        ...state,
        invoice: action.payload,
        loading: false
      };
    case DELETE_INVOICE:
      return {
        ...state,
        invoices: state.invoices.filter(
          invoice => invoice._id !== action.payload
        )
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
