import { IndexLink, Link } from 'react-router';

import { Menu } from 'semantic-ui-react';
import React from 'react';

export default class Navigation extends React.Component {
  render() {
    return (
      <Menu fixed="top">
        <Menu.Item name="espelho-político" as={IndexLink} to="/" />
        <Menu.Item name="deputados" as={Link} to="/deputados" />
        <Menu.Item name="senadores" as={Link} to="/senadores" />
      </Menu>
    )
  }
}
