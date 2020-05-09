import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import {Fragment} from 'react'
import '../css/App.css';

/*CSS STUFF STARTS*/

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);


/*CSS STUFF ENDS*/



class Leaderboard extends Component {


    //function to get total score of a specific user (id) using an array that is made in the render method
    getTotal = (arr, id) => {

        var value = arr.filter((element) => {
            return element.id === id
        })

        return value[0].total
    }



    render() {

        const {users, usersIds, signedUser} = this.props

        if(signedUser === null){
          return <Redirect to='/'/>
      }


        //array for storing objects that have userid and total properties
        const positions = []

        usersIds.forEach(id => {
            let total = users[id].questions.length + Object.keys(users[id].answers).length

            positions.push({id, total})
        });


        //final array (this will be mapped) that stores the user from top to bottom in a sorted order
        const order = positions.sort((a,b) => b.total - a.total)



        return (
            <Fragment>
              <div className ='leaderboard-page-background'>
                <div className = 'leaderboard-container'>
                  <div className ='leaderboard-heading'> LEADERBOARD</div>
                  <TableContainer component={Paper}>
                    <Table  aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Position</StyledTableCell>
                          <StyledTableCell align="left">ID</StyledTableCell>
                          <StyledTableCell align="left">Full Name</StyledTableCell>
                          <StyledTableCell align="left">Questions Answered</StyledTableCell>
                          <StyledTableCell align="left">Questions Asked</StyledTableCell>
                          <StyledTableCell align="right">Total Score</StyledTableCell>
                        </TableRow>
                      </TableHead>
                    <TableBody>
                      {order.map((element) => (
                        <StyledTableRow key={element.id}>
                          <StyledTableCell component="th" scope="row"><p className ='row-text'>{order.indexOf(element) + 1}</p></StyledTableCell>
                          <StyledTableCell align="left"><Avatar src= {users[element.id].avatarURL}/><h4>{users[element.id].id}</h4></StyledTableCell>
                          <StyledTableCell align="left"><h4>{users[element.id].name}</h4></StyledTableCell>
                          <StyledTableCell align="left"><p className ='row-text'>{Object.keys(users[element.id].answers).length}</p></StyledTableCell>
                          <StyledTableCell align="left"><p className ='row-text'>{users[element.id].questions.length}</p></StyledTableCell>
                          <StyledTableCell align="right"><p className ='row-text-total'>{this.getTotal(positions, element.id)}</p></StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                    </Table>
                  </TableContainer>
                  </div>
                </div>
              </Fragment>
        );
    }
}

function mapStatetoProps({users, signedUser}){
    return{
        usersIds: Object.keys(users),
        users,
        signedUser,
    }
}


export default connect(mapStatetoProps)(Leaderboard);