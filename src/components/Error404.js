import React, { Component } from 'react';
import '../css/App.css';


class Error404 extends Component {
    render() {
        return(
            <div>
                <h1 className ='error-msg'>
                ERROR 404
                </h1>  
                <h1 className='error-msg'>PAGE NOT FOUND</h1>
            </div>
        );
    }
}

export default Error404;