import React from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { ItemCreator } from './components/ItemCreator'
import { ContainerComments } from './containers/ContainerComments'
import { ContainerMain } from './containers/ContainerMain'
import './App.css'

function App() {
  const routes = (
    <Switch>
      <Route path="/create-item" component={ItemCreator} />
      <Route path="/item/:id" component={ContainerComments} />
      <Route path="/" exac component={ContainerMain} />
      <Redirect to={"/"} />
    </Switch>
  )

  return (
    <div className="App">
      {routes}
    </div>
  )
}

export default withRouter(App)
