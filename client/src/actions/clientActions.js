import axios from "axios";
import {
  CLIENT_LOADING,
  GET_CLIENTS,
  GET_CLIENT,
  DELETE_CLIENT,
  GET_ERRORS
} from "./types";

export const setClientLoading = () => {
  return {
    type: CLIENT_LOADING
  };
};

// Get all Clients
export const getClients = () => dispatch => {
  dispatch(setClientLoading());
  axios
    .get("/api/clients")
    .then(res => {
      dispatch({
        type: GET_CLIENTS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(`Error: ${err}`);
      dispatch({
        type: GET_CLIENTS,
        payload: null
      });
    });
};

// Get client by ID
export const getClient = (id, history) => dispatch => {
  dispatch(setClientLoading());
  axios
    .get(`/api/clients/${id}`)
    .then(res => {
      dispatch({
        type: GET_CLIENT,
        payload: res.data
      });
      history.push(`/clients/edit`);
    })
    .catch(err => console.log(err));
};

// Create client
export const createClient = (clientData, history) => dispatch => {
  axios
    .post("/api/clients", clientData)
    .then(res => history.push("/clients"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Update Client
export const updateClient = (id, clientData, history) => dispatch => {
  axios
    .post(`/api/clients/${id}`, clientData)
    .then(res => {
      // Clear client from state
      dispatch({
        type: GET_CLIENT,
        payload: {}
      });
      history.push("/clients");
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Delete Client
export const deleteClient = id => dispatch => {
  axios
    .delete(`/api/clients/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_CLIENT,
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
