import {
  GET_CLIENTS,
  GET_CLIENT,
  CLIENT_LOADING,
  DELETE_CLIENT
} from "../actions/types";

const initialState = {
  client: null,
  clients: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CLIENT_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CLIENTS:
      return {
        ...state,
        clients: action.payload,
        loading: false
      };
    case GET_CLIENT:
      return {
        ...state,
        client: action.payload,
        loading: false
      };
    case DELETE_CLIENT:
      return {
        ...state,
        clients: state.clients.filter(client => client._id !== action.payload)
      };
    default:
      return state;
  }
}
