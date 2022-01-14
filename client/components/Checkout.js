import React, { Component } from 'react';
import { connect } from "react-redux";


const catWavingImageUrl = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F386042999283520943%2F&psig=AOvVaw1LeuB7fXO9MDgckQtd43eD&ust=1642215502079000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLCp2fOgsPUCFQAAAAAdAAAAABAD'

export const Checkout = (props) => {
  const { username } = props;

  return (
    <div>
      <h1>{username}, Thank you for your purchase!</h1>
      <img src={catWavingImageUrl} style={{ width: "500px", height: "500px" }} />
    </div>
  )
}
const mapState = (state) => {
  return {
    username: state.auth.username,
  }
}
export default connect(mapState)(Checkout);
