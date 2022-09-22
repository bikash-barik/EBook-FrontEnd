import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
   let isAuth=sessionStorage.getItem('isAuth')
  return (
    <Route {...rest} render={
      props => {
        if (isAuth) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname: '/',
             
            }
          } />
        }
      }
    } />
  )
}

export default ProtectedRoute;