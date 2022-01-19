import React, { Component } from 'react';
import { connect } from 'react-redux';

const catWavingImageUrl =
  'https://i.pinimg.com/564x/45/32/a6/4532a6b46c6e5a75605d8272436d81d6.jpg';

export const Confirmation = (props) => {
  const { username } = props;

  return (
    <div>
      <h1>{username} Thank you for your purchase!</h1>
      <img src={catWavingImageUrl} />
    </div>
  );
};
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};
export default connect(mapState)(Confirmation);
