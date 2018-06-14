import {ADD_GROUP} from "../actions/index";
import {DELETE_GROUP} from "../actions/index";
import {GET_GROUPS} from "../actions/index";

const initialState = {

    groups :[]
};

const groupdata = (state = initialState, action) => {

    console.log(action);
    switch (action.type) {


        case ADD_GROUP :
            return {
                groups:[
                    ...state.groups,
                    action.payload
                ]
            }


        case GET_GROUPS :
            return {
                groups:action.payload

            }
        case DELETE_GROUP :
            return {
                groups:[
                    ...state.groups.slice(0, action.payload),
                    ...state.groups.slice(action.payload + 1)
                ]
            }


        default :
            return state;

    }
};

export default groupdata;