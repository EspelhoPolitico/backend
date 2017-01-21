import * as ServerAPI from '../serverAPI';

import Diacritics from 'diacritics';
import FilterBar from './FilterBar';
import { Loader } from 'semantic-ui-react';
import Pagination from './Pagination';
import React from 'react';
import ResourceList from './ResourceList';
import _ from 'lodash';

export default class ParliamentApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      parliamentarians: [],
      pageSize: 25,
      currentPage: 1,
      isLoading: true,
      searchName: '',
      searchState: 'any',
      searchParty: 'any',
      parties: [],
      states: [],
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSearchParliamentary = this.handleSearchParliamentary.bind(this);
  }

  componentWillMount() {
    let resource = this.props.route.path;
    this.loadResourceFromServer(resource);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.route.path !== nextProps.route.path) {
      this.setState({
        isLoading: true,
        currentPage: 1,
        searchName: '',
        searchState: 'any',
        searchParty: 'any',
      });
      let resource = nextProps.route.path;
      this.loadResourceFromServer(resource);
    }
  }

  loadResourceFromServer(resource) {
    ServerAPI.getResource(resource).then((parliamentarians) => {
      let states = [];
      let parties = [];

      parliamentarians.forEach((parliamentary) => {
        parties.push(parliamentary.party);
        states.push(parliamentary.state);
      })

      parliamentarians = _.sortBy(parliamentarians, 'name');
      parties = [...new Set(parties)].sort();
      states = [...new Set(states)].sort();

      this.setState({
        parliamentarians,
        isLoading: false,
        parties,
        states
      });
    }).catch((error) => {
      console.error(error);
    });
  }

  filterParliamentarians(parliamentarians, searchName, searchParty, searchState) {
    return parliamentarians.filter((parliamentary) => {
      if (searchState !== 'any' && parliamentary.state !== searchState) {
        return false;
      }

      if (searchParty !== 'any' && parliamentary.party !== searchParty) {
        return false;
      }

      if (searchName) {
        searchName = Diacritics.remove(searchName).toLowerCase();
        let name = Diacritics.remove(parliamentary.name).toLowerCase();

        if (name.indexOf(searchName) < 0) {
          let fullName = Diacritics.remove(parliamentary.fullName).toLowerCase();

          if (fullName.indexOf(searchName) < 0) {
            return false;
          }
        }
      }

      return true;
    });
  }

  resourcePerPage(resource, pageSize, currentPage) {
    let start = pageSize * (currentPage - 1);
    let end = pageSize * currentPage;

    return resource.slice(start, end);
  }

  handlePageChange(currentPage) {
    window.scrollTo(0, 0);
    this.setState({ currentPage });
  }

  handleSearchParliamentary(searchArgs) {
    this.setState({ currentPage: 1, ...searchArgs });
  }

  render() {
    let {
      isLoading,
      searchName,
      currentPage,
      pageSize,
      parliamentarians,
      parties,
      searchParty,
      states,
      searchState,
    } = this.state;
    let resource = this.props.route.path;
    let resourceName = (resource === 'deputados') ? 'deputado' : 'senador';
    let filteredParliamentarians = this.filterParliamentarians(
      parliamentarians,
      searchName,
      searchParty,
      searchState,
    );
    let resourcePerPage = this.resourcePerPage(
      filteredParliamentarians,
      pageSize,
      currentPage,
    );
    let numberOfPages = Math.ceil(filteredParliamentarians.length / pageSize);

    let loadedPage = () => {
      if (isLoading) {
        return (
          <Loader active={true} size='big'>Carregando Informações...</Loader>
        );
      } else {
        return (
          <div>
            <FilterBar
              searchString={resourceName}
              onChange={this.handleSearchParliamentary}
              partiesOptions={parties}
              statesOptions={states}
              searchParty={searchParty}
              searchState={searchState}
              />
            <ResourceList
              className={resource}
              resource={resourcePerPage}
              resourceName={resourceName}
              />
            <Pagination
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
              numberOfPages={numberOfPages}
              />
          </div>
        )
      }
    }

    return (loadedPage());
  }
}
