import * as constants from './constants';

const initialState = {
    loggedIn: false,
    token:    null
}

export default ( state = initialState, action) => {

    switch (action.type){
        case constants.LOGIN:
            return {
                loggedIn: true,
                token: action.payload.token
            };
        case constants.LOGOUT:
            return {
                loggedIn: false,
                token: null
            };
        default:
            return state;
    }

}