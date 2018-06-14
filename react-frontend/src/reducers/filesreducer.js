import {ADDFILE, INC_SHARECOUNT} from "../actions/index";
import {DELETE_FILE} from "../actions/index";
import {GET_FILES} from "../actions/index";
import {MARK_STAR} from "../actions/index";


// https://github.com/reactjs/react-redux/blob/d5bf492ee35ad1be8ffd5fa6be689cd74df3b41e/src/components/createConnect.js#L91
const initialState = {

    files :[]
};

const filedata = (state = initialState, action) => {

    switch (action.type) {


        case ADDFILE :
            return {
                files:[
                    ...state.files,
                    action.payload
                ]
            }


        case GET_FILES :
            return {
                files:action.payload

            }
        case DELETE_FILE :
            return {
                files:[
                    ...state.files.slice(0, action.payload),
                    ...state.files.slice(action.payload + 1)
                ]
            }

        case MARK_STAR :

            var newfiles=state.files;

            newfiles[action.index].starred=action.payload;

            return {
                files:newfiles


            }

        case INC_SHARECOUNT :

            var newfiles=state.files;
            console.log(action)

            newfiles[action.index].sharedcount=action.payload;

            return {
                files:newfiles
            }


        default :
            return state;

    }
};

export default filedata;