import { combineReducers } from 'redux'
import filesreducer from './filesreducer'
import userreducer from './userreducer'
import userlogreducer from './userlogreducer'
import groupreducer from './groupreducer'
import memberreducer from './memberreducer'

export default combineReducers({
    filesreducer,
    userreducer,
    userlogreducer,
    groupreducer,
    memberreducer
})