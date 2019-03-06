import React from "react"
import { Route, Switch } from "react-router-dom"

import UsersList from "./containers/users/UsersList"
import UserInfo from "./containers/users/UserInfo"

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/users/:id" component={UserInfo} />
        <Route exact path="/" component={UsersList} />
      </Switch>
    </div>
  )
}

export default App
