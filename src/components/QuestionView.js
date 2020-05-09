import React, { Component } from 'react';
import {connect} from 'react-redux'
import '../css/App.css';
import {formatDate} from '../utils/helpers'
import { LinearProgress } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import {Redirect} from 'react-router-dom'
import {handleAnswer} from '../actions/shared'




class QuestionView extends Component {


    //local state to manage the selection of option the user chooses when answering question
    state={
        optionSelected: ""
    }


    //function to manage the submission of an answer - handles dispatch to the 'handleAnswer' action creator
    submitAnswer = () =>{
        const {optionSelected} = this.state
        const {signedUser, id, dispatch} = this.props

        if(optionSelected !== ""){
            if(optionSelected === 'one'){
                dispatch(handleAnswer({signedUser:signedUser, qs_id:id, answer:'optionOne'}))
            }
            else if(optionSelected === 'two'){
                dispatch(handleAnswer({signedUser: signedUser, qs_id:id, answer:'optionTwo'}))
            }
        }
    }


    //function to handle the change in the selection of options - the two radio buttons
    handleChange = () =>{
        const optionOne = document.getElementById('optionOne').checked
        const optionTwo = document.getElementById('optionTwo').checked

        if(optionOne){
            this.setState({optionSelected: 'one'})
        }
        else if(optionTwo){
            this.setState({optionSelected: 'two'})
        }

    }


    render() {

        const {signedUser, questions, question, author, id} = this.props

        if(signedUser === null){
            return <Redirect to='/'/>
        }

        if(!Object.keys(questions).includes(id)){
            console.log('check')
            return(
                <div>
                    <h1 className ='error-msg'>
                    ERROR 404
                    </h1>  
                    <h1 className='error-msg'>QUESTION NOT FOUND</h1>
                </div>
            )
        }


        //condition if the signedUser has answered the current question
        if(question.optionOne.votes.includes(signedUser) ||
            question.optionTwo.votes.includes(signedUser)){

                const {optionOne, optionTwo} = question
                const textOfOne = optionOne.text
                const textOfTwo = optionTwo.text
                const votesOfOne = optionOne.votes
                const votesOfTwo = optionTwo.votes

                const userAnsweredOne = votesOfOne.includes(signedUser)
                const userAnsweredTwo = votesOfTwo.includes(signedUser)

                const totalVotes = votesOfOne.length + votesOfTwo.length

                const percOne = `(${((votesOfOne.length/totalVotes)*100).toFixed(2).toString()}%)`
                const percTwo = `(${((votesOfTwo.length/totalVotes)*100).toFixed(2).toString()}%)`

                
            return (
                <div className='qs-view-bg'>
                    <div className="question">
                    <div className="question-title">
                        <img src={author.avatarURL} alt="avatar" className="avatar" />
                        <h4>
                        {author.name}<br/> <small>{formatDate(question.timestamp)}</small>
                        </h4>
                    </div>
                    <div className="question-body">
                        <h4>
                            Results:
                        </h4>
                    <div>
                        <div className = 'answer'>
                            <p>{`Would you rather ${textOfOne}?`}
                            {userAnsweredOne ? (<StarIcon className='star'></StarIcon>) : ''}
                            {userAnsweredOne ? (<h6 className='vote-highlight'>YOUR VOTE</h6>) : ''}
                            </p>
                            <LinearProgress variant='determinate' value={(votesOfOne.length/totalVotes)*100}></LinearProgress>
                            <h4>{votesOfOne.length} out of {totalVotes} {totalVotes === 1 ? 'vote' : 'votes  '}{percOne}</h4>              
                        </div>
                        <div className = 'answer'>
                            <p>{`Would you rather ${textOfTwo}?`}
                            {userAnsweredTwo ? (<StarIcon className='star'></StarIcon>) : ''}
                            {userAnsweredTwo ? (<h6 className='vote-highlight'>YOUR VOTE</h6>) : ''}
                            </p>        
                            <LinearProgress variant='determinate' value={(votesOfTwo.length/totalVotes)*100}></LinearProgress>      
                            <h4>{votesOfTwo.length} out of {totalVotes} {totalVotes === 1 ? 'vote' : 'votes  '} {percTwo}</h4>              
                        </div>
                    </div>
                    </div>
                    
                </div>
                </div>
            )
        }


        //if the signedUser has not answered the current question
        return (

            
            
                <div className='qs-view-bg'>
                    <div className="question">
                    <div className="question-title">
                        <img src={author.avatarURL} alt="avatar" className="avatar" />
                        <h4>
                        {author.name}<br/> <small>{formatDate(question.timestamp)}</small>
                        </h4>
                    </div>
                    <div className="question-body">
                        <h5>Would you rather:</h5>
                        <p className = 'optionsAB'>
                        <input className='radio-input' type="radio" id="optionOne" name='answer'  value="optionOne" onChange={this.handleChange}/>
                        <label className='label-input' >{'A: ' + question.optionOne.text} </label><br/>
                        <input className='radio-input' type="radio" id="optionTwo" name='answer'  value="optionTwo" onChange={this.handleChange}/>
                        <label className='label-input' >{'B: ' + question.optionTwo.text} </label><br/>
                        </p>
                    </div>
                    <div className="question-footer">
                        <button onClick={this.submitAnswer} className="vote-button">SUBMIT</button>
                    </div>
                </div>
                </div>
               
        );
    }
}


function mapStatetoProps({users, questions, signedUser}){
    const id = window.location.pathname.slice(11)

    if(!Object.keys(questions).includes(id)){
        return{
            id,
            questions,
        }
    }

    const question = questions[id]
    const author = users[question.author]

    return{
        signedUser,
        questions,
        question,
        author,
        id,
    }
}

export default connect(mapStatetoProps)(QuestionView);