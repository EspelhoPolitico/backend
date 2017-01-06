import { Item, Message } from 'semantic-ui-react'

import Deputy from './Deputy';
import React from 'react';

export default class DeputiesList extends React.Component {
  render() {
    let { deputies } = this.props;

    if (!deputies.length) {
      return (
        <Message info>
          <Message.Header>Nenhum deputado encontrado</Message.Header>
          <p>Tente realizar uma nova pesquisa com outros parâmetros.</p>
        </Message>
      );
    }

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
