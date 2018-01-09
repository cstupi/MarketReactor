// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// Styles
import './Login.scss';

 
class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            message: ''
        };
    }
    async login(){
        try { 
            const res = await axios.post(this.props.endpoint, this.state);
            this.props.success(res);
            this.setState({message: "Success!"});
            return res;
        } catch(ex){
            if(ex.response.status === 401){
                if(this.props.failure)
                    this.props.failure(401);
                this.setState({password: '', message: "Wrong Credentials"});
                return 401;
            }
            this.setState({message: "Error Connecting!"});
            return "Error making connecting to login server";
        }
    }
    render(){
        return <div>
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
        </div>
    }
}
Login.propTypes = {
    endpoint: PropTypes.string.isRequired,
    success: PropTypes.func.isRequired,
    failure: PropTypes.func
};
export default Login;