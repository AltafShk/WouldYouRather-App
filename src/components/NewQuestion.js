import React, { Component } from 'react';
import {connect} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import {addNewQuestion} from '../actions/shared'
import {Redirect} from 'react-router-dom'




class NewQuestion extends Component {

    //local state to manage local state for handling options text and going to home on submitting question
    state={
        optionOne: "",
        optionTwo: "",
        toHome: false
    }

    //function to mangage option 1 text
    fillOption1 = (e) => {
        this.setState({optionOne: e.target.value})
    }

    //function to mangage option 1 text
    fillOption2 = (e) => {
        this.setState({optionTwo: e.target.value})
    }


    //function to handle pressing the submit button - dispatching the 'addNewQuestion' action creator 
    handleSubmit = () => {
        const {optionOne, optionTwo} = this.state
        const {signedUser, dispatch} = this.props

        if(optionOne === "" || optionTwo === ""){
            alert("Fill both options before submitting")
        }
        else{
            dispatch(addNewQuestion({optionOneText: optionOne, optionTwoText: optionTwo, author:signedUser}))

            this.setState({
                optionOne:'',
                optionTwo:'',
                toHome: true
            })
            
        }
    }


    render() {


        const {optionOne, optionTwo, toHome} = this.state
        const {users, signedUser} = this.props

        if(signedUser === null){
            return <Redirect to='/'/>
        }

        if(toHome === true){
            return <Redirect to='/home'/>
        }


        return (
            <div className='app-bg'>
            <div className="question-new">
                <div className="question-title">
                    <h3>NEW QUESTION</h3>
                    <img src={users[signedUser].avatarURL} alt="avatar" className="avatar" />
                    <h4>
                        
                    </h4>
                </div>
                <div className="question-body">
                    <h5>Would you rather:</h5>
                    <p>Option A:   <input type = 'text' placeholder='Write the first option' value={optionOne} onChange={this.fillOption1} /></p>
                    <p>Option B:   <input type = 'text' placeholder= 'Write the second option' value={optionTwo} onChange={this.fillOption2}/></p>
                </div>
                <div className="question-footer">
                    <button onClick={this.handleSubmit} className="vote-button">POST QUESTION</button>
                </div>
            </div>
            </div>
        );
    }
}

function mapStatetoProps({signedUser, users}){
    return{
        signedUser,
        users,
    }
}

export default connect(mapStatetoProps)(NewQuestion);