import { Icon, Item, Label } from 'semantic-ui-react'

import React from 'react';

export default class Deputy extends React.Component {
  render() {
    let {
      email,
      gender,
      fullName,
      name,
      party,
      photo,
      state,
      telephone,
    } = this.props;

    let genderIcon = (gender === 'Masculino') ? 'male' : 'female';

    return (
      <Item>
        <Item.Image size='small' shape='circular' src={photo} />
        <Item.Content verticalAlign='middle'>
          <Item.Header as='a'>
            <Icon name={genderIcon}/>
            {name}
          </Item.Header>
          <Item.Meta>
            <span>{fullName}</span>
          </Item.Meta>
          <Item.Description>
            <p>{telephone}</p>
            <p>{email}</p>
          </Item.Description>
          <Item.Extra>
            <Label>{party}</Label>
            <Label>{state}</Label>
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}
