export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'



//Action Creators for questions

export function receiveQuestions(questions){
    return{
        type: RECEIVE_QUESTIONS,
        questions,
    }
}


export function addQuestion(question){
    return{
        type: ADD_QUESTION,
        question
    }
}


export function answerQuestion({ signedUser, qs_id, answer }) {
    return {
      type: ANSWER_QUESTION,
      signedUser,
      qs_id,
      answer
    };
  }