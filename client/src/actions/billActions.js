import axios from "axios";
import {
  BILL_LOADING,
  GET_BILLS,
  GET_BILL,
  DELETE_BILL,
  GET_ERRORS
} from "./types";

export const setBillLoading = () => {
  return {
    type: BILL_LOADING
  };
};

// Get all Bills
export const getBills = () => dispatch => {
  dispatch(setBillLoading());
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
        payload: {}
      })
    );
};

// Get bill by ID
export const getBill = (id, history, location) => dispatch => {
  dispatch(setBillLoading());
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
    history.push("/invoices/edit");
  }
};
// Get recent bills
export const getRecentBills = days => dispatch => {
  dispatch(setBillLoading());
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
