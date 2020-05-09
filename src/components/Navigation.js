import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import {setSignedUser} from '../actions/signedUser'
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AddIcon from '@material-ui/icons/Add';
import '../css/App.css';


class Navigation extends Component {

    
    //function to dispatch the call for setting the signed user to null (logout)
    logoutUser = () => {
        const {dispatch} = this.props

        dispatch(setSignedUser(null))
    }

    

    render() {

        const {signedUser, users} = this.props

        if(signedUser !== null){
            return (
                <div>
                    <div className="topnav">
                    <Link to ='/home'><p><HomeIcon className ='nav-icon'/>Home</p></Link>
                    <Link to='/leaderboard'><p><AssignmentIcon className='nav-icon'/>Leaderboard</p></Link>
                    <Link to='/add'><p><AddIcon className='nav-icon'/>Add Question</p></Link>
                    <h3 className='login-wyr'>WOULD YOU RATHER...?</h3>
                    <Link onClick = {this.logoutUser} className='logout-link' to = '/'><p className = 'active'>Logout</p></Link>
                    <span className='welcome'>{`Hello,  ${users[signedUser].name}`}</span>
                    <Avatar className='avatar-login' src={users[signedUser].avatarURL}/>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <Redirect to='/'/>
                <div className="topnav">
                <Link to ='/home'><p><HomeIcon className ='nav-icon'/>Home</p></Link>
                <Link to='/leaderboard'><p><AssignmentIcon className='nav-icon'/>Leaderboard</p></Link>
                <Link to='/add'><p><AddIcon className='nav-icon'/>Add Question</p></Link>
                <h3 className='login-wyr'>WOULD YOU RATHER...?</h3>
                <Link className='login-link' to = '/'><p className = 'active'>Login</p></Link>
                </div>
            </div>
        );
    }
}

function mapStatetoProps({signedUser, users}){
    return{
        signedUser,
        users
    }
}

export default connect(mapStatetoProps)(Navigation);