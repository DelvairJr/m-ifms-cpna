import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import Main from '../template/Main'

export default class NotFound extends Component {
    render() {
        return (
           <Main>
               <h1>Sorry, page not found.</h1>
           </Main>
        )
    }
}
