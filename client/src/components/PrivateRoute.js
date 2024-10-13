import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  user,
  requiredRole,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      user && user.role === requiredRole ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default PrivateRoute;
