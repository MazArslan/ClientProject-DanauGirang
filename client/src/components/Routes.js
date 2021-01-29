/* eslint-disable react/prop-types */
import React from "react";
import { Route, Redirect } from "react-router-dom";

// Private Route for Users
export const UserRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        const encodedToken = window.sessionStorage.getItem("token");
        if (encodedToken) {
          const decodedToken = JSON.parse(atob(encodedToken.split(".")[1]));
          if (!decodedToken.isAdmin) {
            return (
              <Route {...rest} render={props => <Component {...props} />} />
            );
          }
          return <Redirect to="/adminArea" />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};

// Private Route for Admins
export const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        const encodedToken = window.sessionStorage.getItem("token");
        if (encodedToken) {
          const decodedToken = JSON.parse(atob(encodedToken.split(".")[1]));
          if (decodedToken.isAdmin) {
            return (
              <Route {...rest} render={props => <Component {...props} />} />
            );
          }
          return <Redirect to="/userArea" />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
};
