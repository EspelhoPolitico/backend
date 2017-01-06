import { Input, Menu } from 'semantic-ui-react'

import Diacritics from 'diacritics';
import React from 'react';

export default class FilterBar extends React.Component {
  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e, { value }) {
    let searchDeputy = Diacritics.remove(value).toLowerCase()
    this.props.onChange(searchDeputy);
  }

  render() {
    let { searchString } = this.props;

    return (
      <Menu secondary>
        <Menu.Menu position="right">
          <Menu.Item>
            <Input
              icon="search"
              placeholder={`Pesquisar ${searchString}`}
              ref="searchDeputy"
              onChange={this.handleChange}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
