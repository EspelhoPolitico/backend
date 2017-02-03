import { Item, Message } from 'semantic-ui-react'

import Parliamentary from './Parliamentary';
import React from 'react';

export default class ResourceList extends React.Component {
  render() {
    let { resource, resourceName } = this.props;

    if (!resource.length) {
      return (
        <Message info>
          <Message.Header>Nenhum {resourceName} encontrado</Message.Header>
          <p>Tente realizar uma nova pesquisa com outros parâmetros.</p>
        </Message>
      );
    }

    let renderresource = () => {
      return resource.map((parliamentary) => {
        return (<Parliamentary key={parliamentary.cod} {...parliamentary} />)
      })
    };

    return (
      <Item.Group divided>
        {renderresource()}
      </Item.Group>
    )
  }
}
