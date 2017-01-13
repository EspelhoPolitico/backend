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
      page: 1,
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
      this.setState({isLoading: true});
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

  filterParliamentarians() {
    let {
      parliamentarians,
      page,
      pageSize,
      searchName,
      searchParty,
      searchState
    } = this.state;

    let filteredParliamentarians = parliamentarians.filter((parliamentary) => {
      if (searchState !== 'any') {
        if (parliamentary.state.indexOf(searchState) < 0) {
          return false;
        }
      }

      if (searchParty !== 'any') {
        if (parliamentary.party.indexOf(searchParty) < 0) {
          return false;
        }
      }

      if (searchName) {
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

    let pageCount = Math.ceil(filteredParliamentarians.length / pageSize);
    let start = pageSize * (page - 1);
    let end = pageSize * page;

    filteredParliamentarians = filteredParliamentarians.slice(start, end);

    return ({ filteredParliamentarians, pageCount });
  }

  handlePageChange(page) {
    window.scrollTo(0, 0);
    this.setState({ page });
  }

  handleSearchParliamentary(searchArgs) {
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

    let resource = this.props.route.path;

    let {
      filteredParliamentarians,
      pageCount,
    } = this.filterParliamentarians();

    let resourceName = (resource === 'deputados') ? 'deputado' : 'senador';

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
              searchName={searchName}
              searchParty={searchParty}
              searchState={searchState}
              />
            <div className={resource}>
              <ResourceList
                resource={filteredParliamentarians}
                resourceName={resourceName}
                />
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
