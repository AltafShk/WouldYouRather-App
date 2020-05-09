import React, { Component } from 'react';
import {connect} from 'react-redux'
import '../css/App.css';
import Question from './Question'
import {Redirect} from 'react-router-dom'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';



class Home extends Component {


    //for managing local state of toggling between unanswered and answered questions
    state = {
        showUnanswered: true
    }


    //function to reset the state as to show the answered questions
    showAnsweredqs = () => {
        this.setState({
            showUnanswered: false
        })
    }


    //function to reset the state as to show the unanswered questions
    showUnansweredqs = () => {
        this.setState({
            showUnanswered: true
        })
    }

    

    render() {
         
        const {signedUser, questions, questionIds} = this.props
        const {showUnanswered} = this.state

        if(signedUser === null){
            return <Redirect to='/'/>
        }


        return (
            <div className='home-bg'>
                <div>
                    <ButtonGroup className='buttons' disableElevation variant="contained" color="primary">
                        <Button onClick={this.showUnansweredqs}>Unanswered Questions</Button>
                        <Button onClick={this.showAnsweredqs}>Answered Questions</Button>
                    </ButtonGroup>
                    {showUnanswered ? <h4 className='qs-note'>Currently showing unanswered questions</h4> : <h4 className='qs-note'>Currently showing answered questions</h4>}
                
                <ul className ='qs-list'>

                    {showUnanswered 
                    ? questionIds.filter((id) => (
                        !questions[id].optionOne.votes.includes(signedUser) && !questions[id].optionTwo.votes.includes(signedUser)
                    )).map((id) => (
                        <Question key={id} id={id}/>
                                         
                    ))
                    : questionIds.filter((id) => (
                        questions[id].optionOne.votes.includes(signedUser) || questions[id].optionTwo.votes.includes(signedUser)                    
                    )).map((id) => (
                        
                        <Question key={id} id={id}/>
                                    
                    ))}
                    
                </ul>
                </div>
            </div>
        );
    }
}

function mapStatetoProps({questions, signedUser}){
    return{
        signedUser,
        questions,
        questionIds: Object.keys(questions).sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStatetoProps)(Home);