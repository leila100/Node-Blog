import React, { Component } from "react"
import axios from "axios"

class UserInfo extends Component {
  state = {
    name: "",
    posts: []
  }

  componentDidMount = () => {
    const { id } = this.props.match.params
    axios.get(`http://localhost:8080/api/users/${id}`).then(response => {
      this.setState({ name: response.data.name })
      axios
        .get(`http://localhost:8080/api/users/${id}/posts`)
        .then(response => {
          this.setState({ posts: response.data })
        })
        .catch(error => console.log(error))
    })
  }

  render() {
    return (
      <div>
        <div>{this.state.name}</div>
        <ul>
          {this.state.posts.map(post => (
            <li key={post.id}>{post.text}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default UserInfo
