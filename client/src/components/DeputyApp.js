import * as ServerAPI from '../serverAPI';

import DeputiesList from './DeputiesList';
import Diacritics from 'diacritics';
import FilterBar from './FilterBar';
import { Loader } from 'semantic-ui-react';
import Pagination from './Pagination';
import React from 'react';

export default class DeputyApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deputies: [],
      pageSize: 25,
      page: 1,
      isLoading: true,
      searchDeputy: '',
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSearchDeputy = this.handleSearchDeputy.bind(this);
  }

  componentDidMount() {
    this.loadDeputiesFromServer();
  }

  loadDeputiesFromServer() {
    ServerAPI.getResource('deputies').then((deputies) => {
      this.setState({ deputies, isLoading: false });
    }).catch((error) => {
      console.error(error);
    });
  }

  filterDeuties(deputies, pageSize, page, searchDeputy) {

    let filteredDeputies = deputies.filter((deputy) => {
      if (searchDeputy) {
        let name = Diacritics.remove(deputy.name).toLowerCase();

        if (name.indexOf(searchDeputy) < 0) {
          let fullName = Diacritics.remove(deputy.fullName).toLowerCase();

          if (fullName.indexOf(searchDeputy) < 0) {
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

  handleSearchDeputy(searchDeputy) {
    this.setState({ page: 1, searchDeputy });
  }

  render() {
    let {
      deputies,
      isLoading,
      pageSize,
      page,
      searchDeputy,
    } = this.state;

    let {
      filteredDeputies,
      pageCount,
    } = this.filterDeuties(deputies, pageSize, page, searchDeputy);

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
