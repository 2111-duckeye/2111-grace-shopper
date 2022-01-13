import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from "@material-ui/core";
import { ShoppingCart } from '@material-ui/icons';

import useStyles from "../../public/navBarStyles"

const Navbar = ({handleClick, isLoggedIn}) => {
  const classes = useStyles();
  return (
  <div>
    <AppBar position="fixed" className={classes.appBar} color="inherit">
      <Toolbar>
        <Typography variant="h6" className={classes.title} color="inherit">
        Duck Eye
        </Typography>
        <div className={classes.grow} />
        <div className={classes.grow}>
          {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/" style={{ marginRight: 10 }}>Home</Link>
          <Link to="/login" style={{ marginRight: 10 }}>Login</Link>
          <Link to="/signup" style={{ marginRight: 10 }}>Sign Up</Link>
        </div>
      )}</div>
        <div className={classes.button}>
          <IconButton aria-label="Show cart items" color="inherit">
            <Badge badgeContent={2} color="secondary"></Badge>
             <ShoppingCart />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)