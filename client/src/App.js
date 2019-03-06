import React from "react"
import { Route, Switch } from "react-router-dom"
import posed, { PoseGroup } from "react-pose"

import UsersList from "./containers/users/UsersList"
import UserInfo from "./containers/users/UserInfo"
import { Container } from "./styles/globalStyles"

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 }
})

const App = props => (
  <Route
    render={({ location }) => (
      <Container>
        <PoseGroup>
          <RouteContainer key={location.key}>
            <Switch location={location}>
              <Route path="/users/:id" component={UserInfo} key="user" />
              <Route exact path="/" component={UsersList} key="home" />
            </Switch>
          </RouteContainer>
        </PoseGroup>
      </Container>
    )}
  />
)

export default App
