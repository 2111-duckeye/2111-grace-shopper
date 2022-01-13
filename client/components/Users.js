import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchUsers } from '../store/users'

class Users extends Component {
  componentDidMount() {
    this.props.loadUsers()
  }

  render() {
    return (
      <div>
        {this.props.users.map((user) => {
          <div className='user' key={user.id}>
            <p>{user.username}</p>
          </div>
        })}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    users: state.users,
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapState, mapDispatch)(Users)
