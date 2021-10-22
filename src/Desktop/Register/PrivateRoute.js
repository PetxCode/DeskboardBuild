import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const PrivateRoute = ({ component: ComponentProps, ...rest }) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(MainProps) => {
        currentUser ? (
          <ComponentProps {...MainProps} />
        ) : (
          <Redirect to="/register" />
        );
      }}
    />
  );
};

export default PrivateRoute;
