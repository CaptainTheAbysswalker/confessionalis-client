import Api from "../../api";
import openSocket from "socket.io-client";

// ACTION TYPES

const LOGIN = "app/auth/LOGIN";
const LOGIN_SUCCESS = "app/auth/LOGIN_SUCCESS";
const LOGIN_FAIL = "app/auth/LOGIN_FAIL";

const REGISTRATION = "app/auth/LOGIN";
const REGISTRATION_SUCCESS = "app/auth/LOGIN_SUCCESS";
const REGISTRATION_FAIL = "app/auth/LOGIN_FAIL";

const LOGOUT = "app/auth/LOGOUT";
const LOGOUT_SUCCESS = "app/auth/LOGOUT_SUCCESS";
const LOGOUT_FAIL = "app/auth/LOGOUT_FAIL";

const CHECK_LOGIN = "app/auth/CHECK_LOGIN";
const CHECK_LOGIN_SUCCESS = "app/auth/CHECK_LOGIN_SUCCESS";
const CHECK_LOGIN_FAIL = "app/auth/CHECK_LOGIN_FAIL";

const GET_USERS = "app/auth/GET_USERS";

// REDUCER

const initialState = {
  user: null,
  loading: false,
  online: false,
  onlineUsers: [""],
  socket: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
    case REGISTRATION:
    case LOGOUT:
    case CHECK_LOGIN:
      return {
        ...state,
        loading: true,
        error: undefined
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        online: true,
        socket: openSocket("https://confessionalis-server.herokuapp.com"),
      };

    case LOGIN_FAIL:
    if(state.socket !== null){
      state.socket.close();
    }
      return {
        ...state,
        loading: false,
        error: action.payload,
        online: false,
        socket: null,
      };
      case CHECK_LOGIN_FAIL:
    if(state.socket !== null){
      state.socket.close();
    }
      return {
        ...state,
        loading: false,
        online: false,
        socket: null,
      };

    case REGISTRATION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        online: false
      };

    case LOGOUT_FAIL:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };

    case REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case CHECK_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        online: true,
        user: action.payload,
        socket: state.socket === null ? openSocket("https://confessionalis-server.herokuapp.com") : state.socket,
      };

    case LOGOUT_SUCCESS:
    if(state.socket !== null){
      state.socket.emit("disconnection", { id: state.user.id });
      state.socket.close();
    }
      return {
        ...state,
        user: null,
        loading: false,
        online: false,
        socket: null
      };
    case GET_USERS:
      return {
        ...state,
        onlineUsers: action.payload
      };

    default:
      return state;
  }
}

// SELECTORS

const getLocalState = state => {
  return state.auth;
};

export const getUserData = state => {
  return getLocalState(state).user;
};

export const getOnlineUsers = state => {
  return getLocalState(state).onlineUsers;
};

export const getLoginLoading = state => {
  return getLocalState(state).loading;
};

export const getLoginError = state => {
  return getLocalState(state).error;
};

export const getRegistrationLoading = state => {
  return getLoginLoading(state);
};

export const getLogoutLoading = state => {
  return getLoginLoading(state);
};

export const getLogoutError = state => {
  return getLoginError(state);
};

export const getRegistrationError = state => {
  return getLoginError(state);
};

export const getChekLoginLoading = state => {
  return getLoginLoading(state);
};

export const getChekLoginError = state => {
  return getLoginError(state);
};

export const getUserStatus = state => {
  return getLocalState(state).online;
};

export const getSocket = state => {
  return getLocalState(state).socket;
};
// ACTIONS

export const login = (email, password) => {
  return dispatch => {
    dispatch({ type: LOGIN });

    return Api.auth
      .login(email, password)
      .then(response => {
        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
        return response.data;
      })
      .catch(error => {
        dispatch({ type: LOGIN_FAIL, payload: error.message });
        throw error;
      });
  };
};

export const registration = (email, password, displayName) => {
  return dispatch => {
    dispatch({ type: REGISTRATION });

    return Api.auth
      .registration(email, password, displayName)
      .then(response => {
        dispatch({ type: REGISTRATION_SUCCESS, payload: response.data });
        return response.data;
      })
      .catch(error => {
        dispatch({ type: REGISTRATION_FAIL, payload: error.message });
        throw error;
      });
  };
};

export const logout = id => {
  return dispatch => {
    dispatch({ type: LOGOUT });

    return Api.auth
      .logout(id)
      .then(response => {
        dispatch({ type: LOGOUT_SUCCESS, payload: null });
        return response.data;
      })
      .catch(error => {
        dispatch({ type: LOGOUT_FAIL, payload: error.message });
        throw error;
      });
  };
};
export const checkLogin = () => {
  return dispatch => {
    dispatch({ type: CHECK_LOGIN });

    return Api.auth
      .checkLogin()
      .then(response => {
        dispatch({ type: CHECK_LOGIN_SUCCESS, payload: response.data });
        return response.data;
      })
      .catch(error => {
        dispatch({ type: CHECK_LOGIN_FAIL, payload: error.message });
        throw error;
      });
  };
};

export const allUsers = data => {
  return {
    type: GET_USERS,
    payload: {
      data
    }
  };
};
