import {RECEIVE_USERS, USER_ASKED_QUESTION, USER_ANSWERED_QUESTION} from '../actions/users'

//Reducers for users

export default function users(state={}, action){
    switch(action.type){
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case USER_ASKED_QUESTION:
            return {
                ...state,
                [action.signedUser]: {
                ...state[action.signedUser],
                questions: [...state[action.signedUser].questions, action.qs_id]
                }
            };
        case USER_ANSWERED_QUESTION:
            return {
                  ...state,
                  [action.signedUser]: {
                    ...state[action.signedUser],
                    answers: {
                      ...state[action.signedUser].answers,
                      [action.qs_id]: action.answer
                    }
                }
            };
        default:
            return state
    }
}