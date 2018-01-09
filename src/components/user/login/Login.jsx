// Dependencies
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

import PropTypes from 'prop-types';
import axios from 'axios';
import Auth from '../../../auth/auth';
// Styles
import './Login.scss';

 
class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            message: '',
            redirectToReferrer: false
        };
    }
    login(){
        Auth.login(this.state.username, this.state.password).then(() => {
            this.setState({ redirectToReferrer: true });
        });    
    }
    render(){
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state
        if (redirectToReferrer) {
          return (
            <Redirect to={from}/>
          )
        }
        return <form>
            <div>
                <input 
                    type="text"
                    className="text-input"
                    onChange={ e => this.setState({"username": e.target.value})}
                    placeholder="Username"
                    value={this.state.username} />
            </div>
            <div className="text-row">
                <input
                    className="text-input"
                    type="password"
                    placeholder="Password"
                    onChange={ e => this.setState({"password": e.target.value})}
                    value={this.state.password} />
            </div>
            <div className="login-btn">
                <button onClick={this.login.bind(this)}>Login</button>
            </div>
            <div className="login-results">
                <span>{this.state.message}</span>
            </div>
        </form>
    }
}
Login.propTypes = {
    endpoint: PropTypes.string.isRequired,
    success: PropTypes.func.isRequired,
    failure: PropTypes.func
};
export default withRouter(Login);