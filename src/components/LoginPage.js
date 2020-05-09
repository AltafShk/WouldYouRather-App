import React, { Component } from 'react';
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import {setSignedUser} from '../actions/signedUser'
import {Redirect} from 'react-router-dom'
import { withLastLocation } from 'react-router-last-location';




class LoginPage extends Component {

    //local state to maintain the currently selected user from the drop down
    state = {
        selectedUser: "",
    }


    //function to dispatch the call for setting the signed user when the login button is pressed
    handleSignedUser = () => {
        const {selectedUser} = this.state
        const {dispatch} = this.props

        if(selectedUser === ""){
            alert("Please select a user before pressing the login button")
        }
        else{
            dispatch(setSignedUser(selectedUser))
        }
    }


    //function for handling the change in the value of the dropdown (change selectedUser in local state)
    changeUser = (e) =>{
        this.setState({
            selectedUser: e.target.value
        })
    }



    render() {

        const {selectedUser} = this.state
        const {users, usersIds, signedUser, lastLocation} = this.props


        if(lastLocation !== null && signedUser !== null){
            if(lastLocation.pathname !== '/'){
            return <Redirect to = {`${lastLocation.pathname}`}/>
            }
            else{
                return <Redirect to='/home'/>
            }
        }


        return (
        <div className='login-bg'>
            {lastLocation && lastLocation.pathname !== '/' ? (<h3 className='login-message'>Please login in order to open that page</h3>) : ""}
            <div className='login-container'>
                <div className='would-you-rather-logo'>
                    <img src="https://s.rrrather.com/img/homepage_cover_1.png" alt='logo'/>
                </div>
                <div className = 'select-user'>
                    <select value={selectedUser} onChange={this.changeUser} >
                        <option value = "" > Select a user to login </option>
                            {usersIds.map((id) => {
                                return(
                                    <option key={id} value={users[id].id}> {users[id].name} </option>
                                )
                            })}
                    </select>
                </div>

                <div className='login-button'>
                        <Button color='secondary' onClick={this.handleSignedUser}  className='button'><h4>LOGIN</h4></Button>
                </div>
                
            </div>
		</div>
        );
    }
}


function mapStatetoProps({users, signedUser},{lastLocation}){
    return{
        users,
        usersIds: Object.keys(users),
        signedUser,
        lastLocation,
    }
}


export default withLastLocation(connect(mapStatetoProps)(LoginPage));