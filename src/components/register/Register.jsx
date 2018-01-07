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
            confirm: ''
        }
    }
    async Register(){

    }
    render(){
        return <div>
        </div>
    }
}
Login.propTypes = {
    endpoint: PropTypes.string.isRequired,
    success: PropTypes.func.isRequired,
    failure: PropTypes.func,
    usernameRegex: PropTypes.string,
    passwordRegex: PropTypes.string
}
export default Register;