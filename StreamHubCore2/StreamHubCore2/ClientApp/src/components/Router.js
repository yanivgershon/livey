//Main Imports
import React from 'react'
import {
  BrowserRouter, 
  Route, 
  Switch,
  Redirect
} from "react-router-dom"

//Component Imports
import App from "./App"
//import ItemPage from "./ItemPage"
import TermsOfService from "./TermsOfService"


function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/home" component={App} />
        <Route exact path="/terms-of-service" component={TermsOfService} />
        {/* <Route exact path="/item" component={SignIn} /> */}
        <Redirect to="/home" />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
