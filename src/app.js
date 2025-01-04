import React from "react";
import LoginPage from "./containers/login";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "./library/helper";

import ToastManager from "./components/toast";

// pages
import DashboardPage from "./containers/dashboard";
import RegisterPage from "./containers/register";
import ForgotpasswordPage from "./containers/forgotpassword";
import ChangepasswordPage from "./containers/changepassword";
import NotfoundPage from "./containers/notfound";
import UserProfilePage from "./containers/userprofile";
import EmployeeDetailsPage from "./containers/EmployeeDetailsPage";
import LeaveManagementPage from "./containers/LeaveManagementPage"; 
import ViewEmployeeList from "./containers/ViewEmployeeList"; 

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/forgot-password" component={ForgotpasswordPage} />
          <Route exact path="/change-password" component={ChangepasswordPage} />
          <PrivateRoute exact path="/dashboard" component={DashboardPage} />
          <PrivateRoute exact path="/user-profile" component={UserProfilePage} />
          <Route exact path="/employee-details" component={EmployeeDetailsPage} />
          <Route path="/employee-list" component={ViewEmployeeList} /> {/* Add the route for Leave Management */}
          <Route path="/leave-management" component={LeaveManagementPage} /> {/* Add the route for Leave Management */}
          <Route path="*" component={NotfoundPage} />
        </Switch>
      </Router>
      
      <ToastManager />
    </>
  );
}

export default App;
