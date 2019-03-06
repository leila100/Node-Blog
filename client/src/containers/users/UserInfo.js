import React, { Component } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import posed from "react-pose"

import { InfoWrapper, Name } from "../../styles/userStyles"

const ListContainer = posed.ul({
  enter: { staggerChildren: 50 },
  exit: { staggerChildren: 20, staggerDirection: -1 }
})

const Item = posed.li({
  enter: { x: 0, opacity: 1 },
  exit: { x: 50, opacity: 0 }
})

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
    let posts = <Item>No posts</Item>
    if (this.state.posts.length !== 0) {
      posts = this.state.posts.map(post => (
        <Item key={post.id}>{post.text}</Item>
      ))
    }
    return (
      <InfoWrapper>
        <Name>{this.state.name}</Name>
        <ListContainer>{posts}</ListContainer>
        <Link to="/">Users</Link>
      </InfoWrapper>
    )
  }
}

export default UserInfo
