import {BrowserRouter,Switch,Route} from "react-router-dom"
import FormComponent from "./components/FormComponent"
import SingleComponent from "./components/SingleComponent"
import EditComponent from "./components/EditComponent"
import LoginComponent from "./components/LoginComponent"
import App from "./App"
import React from "react"
import AdminRoute from "./AdminRoute"


const MyRoute = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App}/>
        <AdminRoute path="/create" exact component={FormComponent}/>
        <Route path="/blog/:slug" exact component={SingleComponent}/>
        <AdminRoute path="/blog/edit/:slug" exact component={EditComponent}/>
        <Route path="/login" exact component={LoginComponent}/>
      </Switch>
    </BrowserRouter>
  )
}

export default MyRoute
