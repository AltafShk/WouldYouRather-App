import {SET_SIGNED_USER} from '../actions/signedUser'

//Reducers for signedUser

export default function signedUser(state=null, action){
    switch(action.type){
        case SET_SIGNED_USER:
            return action.id
        default:
            return state
    }
}