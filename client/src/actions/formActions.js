import axios from "axios";
import {
  FORM_LOADING,
  GET_BILLS,
  GET_BILL,
  DELETE_BILL,
  GET_INVOICE,
  GET_INVOICES,
  DELETE_INVOICE,
  GET_ERRORS,
  GET_FORMS
} from "./types";

export const setFormLoading = () => {
  return {
    type: FORM_LOADING
  };
};

// GET forms of the last year
export const getForms = () => dispatch => {
  dispatch(setFormLoading());
  axios
    .get("/api/forms")
    .then(res => {
      dispatch({
        type: GET_FORMS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err
      })
    );
};

// Get all Invoices
export const getInvoices = () => dispatch => {
  dispatch(setFormLoading());
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
  dispatch(setFormLoading());
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
  dispatch(setFormLoading());
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

// Get all Bills
export const getBills = () => dispatch => {
  dispatch(setFormLoading());
  axios
    .get("/api/forms/bills")
    .then(res => {
      dispatch({
        type: GET_BILLS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_BILLS,
        payload: null
      })
    );
};

// Get bill by ID
export const getBill = (id, history, location) => dispatch => {
  dispatch(setFormLoading());
  axios
    .get(`/api/forms/bills/${id}`)
    .then(res => {
      dispatch({
        type: GET_BILL,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
  if (location) {
    history.push(location);
  } else {
    history.push("/bills/edit");
  }
};

// Get recent bills
export const getRecentBills = days => dispatch => {
  dispatch(setFormLoading());
  axios
    .get(`/api/forms/bills/days/${days}`)
    .then(res => {
      dispatch({
        type: GET_BILLS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

// Create bill
export const createBill = (billData, history) => dispatch => {
  axios
    .post("/api/forms", billData)
    .then(res => history.push("/bills"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Clear Bill from redux state
export const clearBill = () => dispatch => {
  dispatch({
    type: GET_BILL,
    payload: null
  });
};

// Edit Bill
export const editBill = (id, billData, history) => dispatch => {
  axios
    .post(`/api/forms/${id}`, billData)
    .then(res => {
      history.push("/bills");
      // Clear bill from state
      dispatch({
        type: GET_BILL,
        payload: null
      });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err }));
};

// Delete Bill
export const deleteBill = id => dispatch => {
  axios
    .delete(`/api/forms/bills/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_BILL,
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
