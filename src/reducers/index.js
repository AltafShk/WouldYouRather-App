import {combineReducers} from 'redux'
import signedUser from './signedUser'
import users from './users'
import questions from './questions'
import {loadingBarReducer} from 'react-redux-loading'


export default combineReducers({
    signedUser,
    users,
    questions,
    loadingBar: loadingBarReducer
})