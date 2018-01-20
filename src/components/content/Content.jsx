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

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

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
      'Auth': UserAuth,
      'message': ''
    }
  }
  componentDidMount(){
    //UserAuth.refresh();
    this.refresh();
  }
  refresh(){
    UserAuth.refresh().then(() => this.setState({"message": 'REFRESH PLEASE'}));
    this.setState({
      'GameManager': ''
    });
    this.setState({
      'GameManager': <GameManager endpoint={`${api_server}/api/game`} />
    });

  }
  render() {
    return (
      <div className="content">
        {this.state.message}
        <Router>
          <div>
            <LogoutButton isAuthenticated={this.state.Auth.isAuthenticated} />
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/games">Games</Link></li>
            </ul>
          
            <hr/>
            <Route exact path="/" component={() => <div>HELLO</div>} />
            <Route exact path="/login" component={() => <Login Auth={UserAuth} endpoint={`${api_server}/api/user/login`} success={this.refresh.bind(this)} />} />
            <PrivateRoute exact path="/games" component={() => <GameManager endpoint={`${api_server}/api/game`} />} />
            <Route component={NoMatch} />
          </div>
        </Router>

      </div>
    );
  }
}

export default Content;  