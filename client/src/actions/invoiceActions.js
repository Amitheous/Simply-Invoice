import axios from "axios";
import {
  INVOICE_LOADING,
  GET_INVOICES,
  GET_INVOICE,
  DELETE_INVOICE,
  GET_ERRORS
} from "./types";

export const setInvoiceLoading = () => {
  return {
    type: INVOICE_LOADING
  };
};

// Get all Invoices
export const getInvoices = () => dispatch => {
  dispatch(setInvoiceLoading());
  axios
    .get("/api/forms/invoices")
    .then(res => {
      dispatch({
        type: GET_INVOICES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_INVOICES,
        payload: {}
      })
    );
};

// Get invoice by ID
export const getInvoice = (id, history, location) => dispatch => {
  dispatch(setInvoiceLoading());
  axios
    .get(`/api/forms/invoices/${id}`)
    .then(res => {
      dispatch({
        type: GET_INVOICE,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
  if (location) {
    history.push(location);
  } else {
    history.push("/invoices/edit");
  }
};
// Get recent invoices
export const getRecentInvoices = days => dispatch => {
  dispatch(setInvoiceLoading());
  axios
    .get(`/api/forms/invoices/days/${days}`)
    .then(res => {
      dispatch({
        type: GET_INVOICES,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// Create invoice
export const createInvoice = (invoiceData, history) => dispatch => {
  axios
    .post("/api/forms", invoiceData)
    .then(res => history.push("/invoices"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Edit Invoice
export const editInvoice = (id, invoiceData, history) => dispatch => {
  axios
    .post(`/api/forms/${id}`, invoiceData)
    .then(res => {
      history.push("/invoices");
      // Clear invoice from state
      dispatch({
        type: GET_INVOICE,
        payload: null
      });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};

// Delete Invoice
export const deleteInvoice = id => dispatch => {
  axios
    .delete(`/api/forms/invoices/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_INVOICE,
        payload: id
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Clear Invoice from redux state
export const clearInvoice = () => dispatch => {
  dispatch({
    type: GET_INVOICE,
    payload: null
  });
};
