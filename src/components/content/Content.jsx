// Dependencies
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
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
//import PrivateRoute from '../../decorators/PrivateRoute.jsx';

// Constants
const api_server = "http://localhost:3001";


const UserAuth = {
    isAuthenticated: false,
    async refresh() {
        try {
          console.log('refreshing');
            const res = await axios.get(`${api_server}/api/user`);
            this.isAuthenticated = res && res.data && res.data.userid;
            console.log(res && res.data && res.data.userid);
        }catch(ex){
            console.log(ex);
            this.isAuthenticated = false;
        }
    },
    login(username, password){
        try {
            return axios.post(`${api_server}/api/user/login`, {username: username, password: password});
        }catch(ex){
            console.log(ex);
            this.isAuthenticated = false;
        }
    },
    logout(){
        try{
          this.isAuthenticated = false;
          return axios.get(`${api_server}/api/user` + '/logout');
        }catch(ex){
          console.log('Error logging out');
          console.log(ex);
        }
        
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    UserAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
const LogoutButton = withRouter(({ history }) => {
  if (UserAuth.isAuthenticated) 
    return (
      <p>
        Welcome! <button onClick={() => {
          UserAuth.logout().then(() => history.push('/'))
        }}>Sign out</button>
      </p>
  ) 
  return <p>You are not logged in.</p>;
});


class Content extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {
      'GameManager': '',
      'Auth': UserAuth
    }
  }
  componentDidMount(){
    UserAuth.refresh();
  }
  refresh(){
    UserAuth.refresh();
    this.setState({
      'GameManager': ''
    });
    this.setState({
      'GameManager': <GameManager endpoint={`${api_server}/api/game`} />
    });

  }
  async logout(){
    const res = await axios.get(`${api_server}/api/user/logout`);
    Auth.signout
    history.push('/');
  }
  render() {
    let auth = this.state.UserAuth;
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
            <Route exact path="/" component={() => <Login 
              endpoint={`${api_server}/api/user/login`} 
              Auth={UserAuth}
              success={() => console.log("Logged In")}
              failure={() => UserAuth.isAuthenticated = false }
              />} />
            <Route exact path="/Login" component={() => <Login Auth={UserAuth} endpoint={`${api_server}/api/user/login`} success={this.refresh.bind(this)} />} />
            <PrivateRoute exact path="/Games" component={() => <GameManager endpoint={`${api_server}/api/game`} />} />
          </div>
        </Router>

      </div>
    );
  }
}

export default Content;  