import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";
import store from "./store";

import KeenTracking from "keen-tracking";

import ProgressBar from "./components/layout/ProgressBar";
import AppNavbar from "./components/layout/AppNavbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import SecondNav from "./components/layout/SecondNav";
import Dashboard from "./components/main/Dashboard";
import Clients from "./components/main/Clients";
import CreateClient from "./components/main/clients/CreateClient.js";
import EditClient from "./components/main/clients/EditClient.js";

import Invoices from "./components/main/Invoices";
import CreateInvoice from "./components/main/invoices/CreateInvoice";
import EditInvoice from "./components/main/invoices/EditInvoice";
import Bills from "./components/main/Bills";
import CreateBill from "./components/main/bills/CreateBill";
import EditBill from "./components/main/bills/EditBill";

import ToPdf from "./components/main/ToPdf";

import Footer from "./components/layout/Footer";

import Analytics from "./components/analytics/Analytics";

import jwt_decode from "jwt-decode";
import setAuthToken from "./util/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrashAlt,
  faTrash,
  faEdit,
  faFilePdf
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Profile from "./components/main/Profile";

library.add(faTrash, faTrashAlt, faEdit, faFilePdf);
const KPI = require("./config/keys").keenProjectId;
const KWK = require("./config/keys").keenWriteKey;

if (localStorage.jwt) {
  // Set auth token header
  setAuthToken(localStorage.jwt);
  // Decode token
  const decoded = jwt_decode(localStorage.jwt);
  // Set User
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    const client = new KeenTracking({
      projectId: KPI,
      writeKey: KWK
    });

    client.initAutoTracking({
      recordPageViews: true,
      recordPageViewsOnExit: true,
      recordScrollState: false,
      recordClicks: true,
      recordFormSubmits: true,
      ignoreDisabledFormFields: false,
      ignoreFormFieldTypes: ["password"],
      recordElementViews: true
    });
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <SecondNav />
            <div id="main">
              <ProgressBar />
              <PrivateRoute exact path="/analytics" component={Analytics} />
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/clients" component={Clients} />
                <PrivateRoute
                  exact
                  path="/clients/create"
                  component={CreateClient}
                />
                <PrivateRoute
                  exact
                  path="/clients/edit/"
                  component={EditClient}
                />
                <PrivateRoute exact path="/invoices" component={Invoices} />
                <PrivateRoute
                  exact
                  path="/invoices/create"
                  component={CreateInvoice}
                />
                <PrivateRoute
                  exact
                  path="/invoices/edit"
                  component={EditInvoice}
                />
                <PrivateRoute exact path="/bills" component={Bills} />
                <PrivateRoute
                  exact
                  path="/bills/create"
                  component={CreateBill}
                />
                <PrivateRoute exact path="/bills/edit" component={EditBill} />
                <PrivateRoute exact path="/generate-pdf" component={ToPdf} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
