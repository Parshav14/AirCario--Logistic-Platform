import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AdminDashboard from "./pages/AdminDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import TrackShipment from "./pages/TrackShipment";
import { logout, getCurrentUser } from "./services/auth";

function App() {
  const [user, setUser] = useState(getCurrentUser());

  const handleSetUser = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const PrivateRoute = ({ component: Component, role, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user && user.role === role ? (
          <Component {...props} user={user} handleLogout={handleLogout} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route
            path="/login"
            render={(props) => <Login {...props} setUser={handleSetUser} />}
          />
          <Route
            path="/signup"
            render={(props) => <SignUp {...props} setUser={handleSetUser} />}
          />
          <Route path="/track-shipment" component={TrackShipment} />
          <PrivateRoute
            path="/admin-dashboard"
            component={AdminDashboard}
            role="admin"
          />
          <PrivateRoute
            path="/customer-dashboard"
            component={CustomerDashboard}
            role="customer"
          />
          <PrivateRoute
            path="/driver-dashboard"
            component={DriverDashboard}
            role="driver"
          />
        </Switch>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
