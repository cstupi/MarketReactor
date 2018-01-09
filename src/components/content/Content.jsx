// Dependencies
import React from 'react';

// Styles
import './Content.scss';
import Login from '../login/Login.jsx';
import Register from '../register/Register.jsx';
import GameManager from '../game/GameManager.jsx';
import axios from 'axios';

const api_server = "http://localhost:3001";
class Content extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      'GameManager': ''
    }
  }
  componentDidMount(){

  }
  refresh(){
    this.setState({
      'GameManager': ''
    });
    this.setState({
      'GameManager': <GameManager endpoint={`${api_server}/api/game`} />
    });
  }
  async logout(){
    const res = await axios.get(`${api_server}/api/user/logout`);
    this.setState({
      'GameManager': ''
    });
  }
  render() {
    return (
      <div className="content">
        <div>
          <button onClick={this.logout.bind(this)}>Logout</button>
          <Login endpoint={`${api_server}/api/user/login`} success={this.refresh.bind(this)} />
          <Register endpoint={`${api_server}/api/user/register`} success={this.refresh.bind(this)} />
        </div>
        <div>
          {this.state.GameManager}
        </div>
      </div>
    );
  }
}

export default Content;  