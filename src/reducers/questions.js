import {RECEIVE_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION} from '../actions/questions'

//Reducers for questions

export default function questions(state={}, action){
    switch(action.type){
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            const { question } = action;
            
            return {
                ...state, [question.id]: question 
            };
        case ANSWER_QUESTION:
            const { signedUser, qs_id, answer } = action;

            return {
                  ...state,
                  [qs_id]: {
                    ...state[qs_id],
                    [answer]: {
                      ...state[qs_id][answer],
                      votes: [...state[qs_id][answer].votes, signedUser]
                    }
                }
            };
        default:
            return state
    }
}
