import { IndexLink, Link } from 'react-router';

import { Menu } from 'semantic-ui-react';
import React from 'react';

export default class Navigation extends React.Component {
  render() {
    return (
      <Menu>
        <Menu.Item name="espelho-político" as={IndexLink} to="/"/>
      </Menu>
    )
  }
}
