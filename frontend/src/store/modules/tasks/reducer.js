import * as constants from './constants';

const initialState = {
    taskList: []
}

export default ( state = initialState, action) => {

    switch (action.type){
        case constants.UPDATE:
            return {
                taskList: action.payload
            };
        default:
            return state;
    }

}