import React, {Component} from 'react';
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import Home from './Home'
import LoginPage from './LoginPage'
import Error404 from './Error404'
import {BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import NewQuestion from './NewQuestion'
import QuestionView from './QuestionView'
import LeaderBoard from './Leaderboard'
import Navigation from './Navigation'
import { LastLocationProvider } from 'react-router-last-location';
import LoadingBar from 'react-redux-loading'
import '../css/App.css';


class App extends Component {

  //Lifecylce method to dispatch the action creator for getting initial data
  componentDidMount(){
    const {dispatch} = this.props

    dispatch(handleInitialData())
  }



  //render method for app - has loading bar, router, navigation bar, and lastlocationProvider for use in child components
  render() {
    return (
      <Router>
      <LastLocationProvider>
      <LoadingBar/>
      <div>      
        <div>
          {this.props.loading === true
          ? null
          : <div>
              <Navigation/>
              <Switch>
              <Route path='/' exact component={LoginPage} />
              <Route path='/home' exact component={Home} />
              <Route path='/add' exact component={NewQuestion} />
              <Route path='/leaderboard' exact component={LeaderBoard} />
              <Route path='/questions/:id' exact component={QuestionView} />
              <Route component = {Error404}/>
              </Switch>
            </div> 
          }
        </div>
      </div>
      </LastLocationProvider>
      </Router>
    );
  }
}


function mapStatetoProps({users}){
  return{
    loading: users === {}
  }
}

export default connect(mapStatetoProps)(App);
