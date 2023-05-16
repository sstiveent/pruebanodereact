import * as constants from './constants';
import axios from 'axios';

export const login = (username, password) => {
    return async dispatch => {
        try {
            const response = axios.post(process.env.REACT_APP_URL + 'login', { username: username, password: password })
                .then(response => {
                    const token = response.data.data.token
                    dispatch(
                        {
                            type: constants.LOGIN,
                            payload: {
                                token: token
                            }
                        }
                    );
                    return true;
                })
                .catch(error => {
                    return false;
                });
            return response;
        } catch (error) {
            return false;
        }
    }
}

export const signup = (fullname, username, password) => {
    return async dispatch => {
        try {
            const response = axios.post(process.env.REACT_APP_URL + 'users', { fullname:fullname, username: username, password: password })
                .then(response => {
                    return true;
                })
                .catch(error => {
                    return false;
                });
            return response;
        } catch (error) {
            return false;
        }
    }
}

export const logout = () => {
    return async dispatch => {
        dispatch({ type: constants.LOGOUT });
        return true;
    }
}