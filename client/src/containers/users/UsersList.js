import React from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import posed from "react-pose"

import { ListWrapper } from "../../styles/userStyles"

const ListContainer = posed.ul({
  enter: { staggerChildren: 50 },
  exit: { staggerChildren: 20, staggerDirection: -1 }
})

const Item = posed.li({
  enter: { y: 0, opacity: 1 },
  exit: { y: 50, opacity: 0 }
})

class UsersList extends React.Component {
  state = {
    users: []
  }

  componentDidMount = () => {
    axios
      .get("http://localhost:8080/api/users")
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
      <ListWrapper>
        <ListContainer>
          {this.state.users.map(user => (
            <Item key={user.id}>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </Item>
          ))}
        </ListContainer>
      </ListWrapper>
    )
  }
}

export default UsersList
