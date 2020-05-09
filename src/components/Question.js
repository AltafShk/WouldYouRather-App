import React, { Component } from 'react';
import {connect} from 'react-redux'
import '../css/App.css';
import {formatDate} from '../utils/helpers'
import {Link} from 'react-router-dom'



class Question extends Component {

    render() {

        const {author, question } = this.props
        const {id} = question
  

        return (


            <div className="question">
                <div className="question-title">
                    <img src={author.avatarURL} alt="avatar" className="avatar" />
                    <h4>
                        {author.name}<br/> <small>{formatDate(question.timestamp)}</small>
                    </h4>
                </div>
                <div className="question-body">
                    <h5>Would you rather:</h5>
                    <p>A: {question.optionOne.text}</p>
                    <p>B: {question.optionTwo.text}</p>
                </div>
                <div className="question-footer">
                    <Link to={`/questions/${id}`}>
                    <button className="vote-button">VIEW POLL</button>
                    </Link>
                </div>
            </div>
    )    
    }
}


function mapStatetoProps({users, questions}, {id}){
    const question = questions[id]

    return{
        question,
        author: users[question.author]
    }
}

export default connect(mapStatetoProps)(Question);