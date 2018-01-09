// Dependencies
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom'
import axios from 'axios';

// Styles
import './Content.scss';
// Components
import Login from '../user/login/Login.jsx';
import Register from '../user/register/Register.jsx';
import GameManager from '../game/GameManager.jsx';

// Decorators
import PrivateRoute from '../../decorators/PrivateRoute.jsx';

// Constants
const api_server = "http://localhost:3001";


const Auth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}


const LogoutButton = withRouter(({ history }) => (
  Auth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        Auth.logout().then(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
));


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
    history.push('/');
  }
  render() {
    return (
      <div className="content">
        
        <Router>
          <div>
            <LogoutButton />
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/Login">Login</Link></li>
              <li><Link to="/Games">Games</Link></li>
            </ul>
          
            <hr/>
            <Route exact path="/" component={() =><Login endpoint={`${api_server}/api/user/login`} success={() => console.log("Logged In")} />} />
            <Route exact path="/Login" component={() => <Login endpoint={`${api_server}/api/user/login`} success={this.refresh.bind(this)} />} />
            <PrivateRoute exact path="/Games" component={() => <GameManager endpoint={`${api_server}/api/game`} />} />
          </div>
        </Router>

      </div>
    );
  }
}

export default Content;  