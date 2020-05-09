export const SET_SIGNED_USER = 'SET_SIGNED_USER'


//Action Creators for signedUser


export function setSignedUser(id){
    return{
        type: SET_SIGNED_USER,
        id
    }
}


