
import {ADD_MEMBER} from "../actions/index";
import {DELETE_MEMBER} from "../actions/index";
import {GET_MEMBERS} from "../actions/index";

const initialState = {

    members :[]
};

const memberdata = (state = initialState, action) => {

    console.log(action);
    switch (action.type) {

        case ADD_MEMBER :
            return {
                members: [

                    ...state.members,
                    action.payload
                ]
            }


        case GET_MEMBERS :
            return {
                members: action.payload

            }


        case DELETE_MEMBER :
            return {
                members:[
                    ...state.members.slice(0, action.payload),
                    ...state.members.slice(action.payload + 1)
                ]
            }


        default :
            return state;

    }
};

export default memberdata;