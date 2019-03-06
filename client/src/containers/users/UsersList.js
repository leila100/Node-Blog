import React from "react"
import { Link } from "react-router-dom"
import axios from "axios"

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
      <div>
        <ul>
          {this.state.users.map(user => (
            <Link to={`/users/${user.id}`} key={user.id}>
              <li>{user.name}</li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }
}

export default UsersList
