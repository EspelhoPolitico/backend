import '../styles/components/FilterBar.css';

import { Button, Input, Menu, Select } from 'semantic-ui-react'

import Diacritics from 'diacritics';
import React from 'react';

export default class FilterBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleCleanFilters = this.handleCleanFilters.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePartyChange = this.handlePartyChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  handleCleanFilters(e, {value}) {
    this.props.onChange({
      searchName: '',
      searchParty: 'any',
      searchState: 'any',
    });
  }

  handleNameChange(e, {value}) {
    let searchName = Diacritics.remove(value).toLowerCase();

    this.props.onChange({ searchName });
  }

  handlePartyChange(e, {value}) {
    this.props.onChange({ searchParty: value });
  }

  handleStateChange(e, {value}) {
    this.props.onChange({ searchState: value });
  }

  render() {
    let {
      partiesOptions,
      searchName,
      searchParty,
      searchState,
      searchString,
      statesOptions
    } = this.props;

    statesOptions = statesOptions.map((state) => {
      return { text: state, value: state };
    });

    statesOptions.unshift({ text: 'Estado', value: 'any' });

    partiesOptions = partiesOptions.map((party) => {
      return { text: party, value: party };
    })

    partiesOptions.unshift({ text: 'Partido', value: 'any' });

    return (
      <Menu stackable secondary id="filterBar">
        <Menu.Item fitted='horizontally'>
          <Input
            fluid
            icon="search"
            onChange={this.handleNameChange}
            placeholder={`Pesquisar ${searchString}`}
            ref="searchName"
            value={searchName}
            />
        </Menu.Item>
        <Menu.Item fitted='horizontally'>
          <Select
            fluid
            onChange={this.handlePartyChange}
            options={partiesOptions}
            search={true}
            value={searchParty}
            />
        </Menu.Item>
        <Menu.Item fitted='horizontally'>
          <Select
            fluid
            onChange={this.handleStateChange}
            options={statesOptions}
            search={true}
            value={searchState}
            />
        </Menu.Item>
        <Menu.Item fitted='horizontally'>
          <Button
            fluid
            color="red"
            onClick={this.handleCleanFilters}
            >
            Limpar Filtro
            </Button>
        </Menu.Item>
      </Menu>
    );
  }
}
