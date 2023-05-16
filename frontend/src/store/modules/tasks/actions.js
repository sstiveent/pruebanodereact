import * as constants from './constants';
import axios from 'axios';

export const getTasks = () => {
    return async (dispatch, getState) => {
        try {
            axios.defaults.headers.common['Authorization'] = getState().app.token;
            const response = axios.get(process.env.REACT_APP_URL + 'tasks')
                .then(response => {
                    dispatch(
                        {
                            type: constants.UPDATE,
                            payload: response.data
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

export const createTask = (title, description) => {
    return async (dispatch, getState) => {
        try {
            axios.defaults.headers.common['Authorization'] = getState().app.token;
            const response = axios.post(process.env.REACT_APP_URL + 'tasks', { title: title, description: description })
                .then(response => {
                    dispatch(getTasks());
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

export const deleteTask = (id) => {
    return async (dispatch, getState) => {
        try {
            axios.defaults.headers.common['Authorization'] = getState().app.token;
            const response = axios.delete(process.env.REACT_APP_URL + 'tasks/' + id)
                .then(response => {
                    dispatch(getTasks());
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