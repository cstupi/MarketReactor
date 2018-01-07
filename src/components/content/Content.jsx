// Dependencies
import React from 'react';

// Styles
import './Content.scss';
import Login from '../login/Login.jsx';
import Register from '../register/Register.jsx';
const api_server = "http://localhost:3001";
class Content extends React.Component {  
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      input: 'World',
    };
  }
  handleInputChange(e) {
    this.setState({ input: e.target.value });
  }
  render() {
    return (
      <div>
        <div className="content">
          <input
            type="text"
            value={this.state.input}
            onChange={this.handleInputChange}
          />
          <span>Hello {this.state.input} OOGA</span>
        </div>
        <div>
          <Login endpoint={`${api_server}/api/user/login`} success={(res) => console.log("You are logged in")} />
          <Register endpoint={`${api_server}/api/user/register`} success={(res) => console.log("You are now registered")} />
        </div>
      </div>
    );
  }
}

export default Content;  