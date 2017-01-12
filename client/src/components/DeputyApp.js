import * as ServerAPI from '../serverAPI';

import DeputiesList from './DeputiesList';
import Diacritics from 'diacritics';
import FilterBar from './FilterBar';
import { Loader } from 'semantic-ui-react';
import Pagination from './Pagination';
import React from 'react';
import _ from 'lodash';

export default class DeputyApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deputies: [],
      pageSize: 25,
      page: 1,
      isLoading: true,
      searchName: '',
      searchState: 'any',
      searchParty: 'any',
      parties: [],
      states: [],
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSearchDeputy = this.handleSearchDeputy.bind(this);
  }

  componentDidMount() {
    this.loadDeputiesFromServer();
  }

  loadDeputiesFromServer() {
    ServerAPI.getResource('deputies').then((deputies) => {
      let states = [];
      let parties = [];

      deputies.forEach((deputy) => {
        parties.push(deputy.party);
        states.push(deputy.state);
      })

      deputies = _.sortBy(deputies, 'name');
      parties = [...new Set(parties)].sort();
      states = [...new Set(states)].sort();

      this.setState({
        deputies,
        isLoading: false,
        parties,
        states
      });
    }).catch((error) => {
      console.error(error);
    });
  }

  filterDeuties() {
    let {
      deputies,
      page,
      pageSize,
      searchName,
      searchParty,
      searchState
    } = this.state;

    let filteredDeputies = deputies.filter((deputy) => {
      if (searchState !== 'any') {
        if (deputy.state.indexOf(searchState) < 0) {
          return false;
        }
      }

      if (searchParty !== 'any') {
        if (deputy.party.indexOf(searchParty) < 0) {
          return false;
        }
      }

      if (searchName) {
        let name = Diacritics.remove(deputy.name).toLowerCase();

        if (name.indexOf(searchName) < 0) {
          let fullName = Diacritics.remove(deputy.fullName).toLowerCase();

          if (fullName.indexOf(searchName) < 0) {
            return false;
          }
        }
      }

      return true;
    });

    let pageCount = Math.ceil(filteredDeputies.length / pageSize);
    let start = pageSize * (page - 1);
    let end = pageSize * page;

    filteredDeputies = filteredDeputies.slice(start, end);

    return ({ filteredDeputies, pageCount });
  }

  handlePageChange(page) {
    window.scrollTo(0, 0);
    this.setState({ page });
  }

  handleSearchDeputy(searchArgs) {
    this.setState({ page: 1, ...searchArgs });
  }

  render() {
    let {
      isLoading,
      searchName,
      page,
      parties,
      searchParty,
      states,
      searchState,
    } = this.state;

    let {
      filteredDeputies,
      pageCount,
    } = this.filterDeuties();

    let loadedPage = () => {
      if (isLoading) {
        return (
          <Loader active={true} size='big'>Carregando Informações...</Loader>
        );
      } else {
        return (
          <div>
            <FilterBar
              searchString='deputado'
              onChange={this.handleSearchDeputy}
              partiesOptions={parties}
              statesOptions={states}
              searchName={searchName}
              searchParty={searchParty}
              searchState={searchState}
              />
            <div className="deputies">
              <DeputiesList deputies={filteredDeputies} />
            </div>
            <Pagination
              onPageChange={this.handlePageChange}
              page={page}
              pageCount={pageCount}
              />
          </div>
        )
      }
    }

    return (loadedPage());
  }
}
