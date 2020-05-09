import {_getUsers, _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA'
import {receiveUsers, userAsks, userAnsweredQuestion} from '../actions/users'
import {receiveQuestions, addQuestion, answerQuestion} from '../actions/questions'
import { showLoading, hideLoading } from 'react-redux-loading'



//Action Creators for shared uses (both questions and users)


export function handleInitialData(){
    return (dispatch) => {
        dispatch(showLoading())
        return Promise.all([_getQuestions(), _getUsers()])
        .then((values) => {
            let questions = values[0]
            let users = values[1]
            
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(hideLoading())
        }) 
    }
}


export function addNewQuestion(question){
    return (dispatch) => {
        dispatch(showLoading())
        return _saveQuestion(question)
        .then((formattedQuestion) => {

            dispatch(userAsks({signedUser: formattedQuestion.author, qs_id: formattedQuestion.id }))
            dispatch(addQuestion(formattedQuestion))
            dispatch(hideLoading())
        })
    }
}


export function handleAnswer({ signedUser, qs_id, answer }) {
    console.log(signedUser, qs_id)
    return (dispatch) => {
        dispatch(showLoading())
      return _saveQuestionAnswer({ authedUser:signedUser, qid:qs_id, answer })
      .then(() => {
        dispatch(answerQuestion({ signedUser, qs_id, answer }));
        dispatch(userAnsweredQuestion({ signedUser, qs_id, answer }));
        dispatch(hideLoading())

      });
    };
  }