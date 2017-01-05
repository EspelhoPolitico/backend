import Deputy from './Deputy';
import { Item } from 'semantic-ui-react'
import React from 'react';

export default class DeputiesList extends React.Component {
  render() {
    let { deputies } = this.props;

    let renderDeputies = () => {
      return deputies.map((deputy) => {
        return (<Deputy key={deputy.cod} {...deputy} />)
      })
    };

    return (
      <Item.Group divided>
        {renderDeputies()}
      </Item.Group>
    )
  }
}
