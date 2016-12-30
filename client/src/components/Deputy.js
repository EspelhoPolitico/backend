import React from 'react';

export default class Deputy extends React.Component {
  render() {
    let {
      email,
      gender,
      name,
      party,
      photo,
      state,
      telephone,
    } = this.props;

    return (
      <div>
        <h1>{name}</h1>
        <img src={photo} alt='deputy {name}'/>
        <p>{party}</p>
        <p>{state}</p>
        <p>{telephone}</p>
        <p>{email}</p>
        <p>{gender}</p>
      </div>
    );
  }
}
