import React from 'react';
import PropTypes from 'prop-types';
import axios from '../../../node_modules/axios/dist/axios';

// Styles
import './Register.scss';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            confirm: '',
            message: ''
        }
    }
    async Register(){
        if(this.state.password == '' || this.state.username == '')
            return;
        if(this.state.password !== this.state.confirm){
            this.setState({message: "Passwords do not match"});
            return;
        }
        if(this.props.usernameRegex){
            if(!new RegExp(this.props.usernameRegex).test(this.state.username)){
                this.setState({message: "Username does not meet the format"});
                return;
            }
        }
        if(this.props.passwordRegex){
            if(!new RegExp(this.props.passwordRegex).test(this.state.password)){
                this.setState({message: "Password does not meet the requirements"});
                return;
            }
        }
        try {
            const res = await axios.post(this.props.endpoint, this.state);
            this.props.success(res);
            this.setState({message: "Success!"});
            return;
        }catch(ex){
            if(this.props.failure)
                this.props.failure(ex);
            this.setState({message: "Error Connecting!"});
            return;
        }
    }
    render(){
        return <div>
            <div>
                <input 
                    type="text"
                    className="text-input"
                    placeholder="Username"
                    onChange={v => this.setState({"username": v.target.value})}
                    value={this.state.username} />
            </div>
            <div>
                <input
                    type="password"
                    className="text-input"
                    placeholder="Password"
                    onChange={p => this.setState({"password": p.target.value})}
                    value={this.state.password} />
            </div>
            <div>
                <input
                    type="password"
                    className="text-input"
                    placeholder="Confirm Password"
                    onChange={c => this.setState({"confirm": c.target.value})}
                    value={this.state.confirm} />
            </div>
            <div>
                <button onClick={this.Register.bind(this)}>Register</button>
            </div>
            <div>
                <span>{this.state.message}</span>
            </div>
        </div>
    }
}
Register.propTypes = {
    endpoint: PropTypes.string.isRequired,
    success: PropTypes.func.isRequired,
    failure: PropTypes.func,
    usernameRegex: PropTypes.string,
    passwordRegex: PropTypes.string
};
export default Register;