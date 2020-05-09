export const RECEIVE_USERS = 'RECEIVE_USERS'
export const USER_ASKED_QUESTION = "USER_ASKED_QUESTION";
export const USER_ANSWERED_QUESTION = 'USER_ANSWERED_QUESTION'


//Action Creators for users


export function receiveUsers(users){
    return{
        type: RECEIVE_USERS,
        users,
    }
}


export function userAsks({signedUser, qs_id}){
    return{
        type: USER_ASKED_QUESTION, 
        signedUser, 
        qs_id, 
    }
}


export function userAnsweredQuestion({ signedUser, qs_id, answer }) {
    return { 
        type: USER_ANSWERED_QUESTION,
        answer, qs_id, signedUser 
    };
  }