import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

import Auth from '../../../auth/auth'

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

export default LogoutButton;