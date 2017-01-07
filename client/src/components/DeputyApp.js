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
      limitedDeputiesList: [],
      page: 1,
      isLoading: true,
      searchDeputy: '',
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSearchDeputy = this.handleSearchDeputy.bind(this);
  }

  loadDeputiesFromServer() {
    ServerAPI.getResource('deputies').then((deputies) => {
      this.setState({ deputies });
      this.limitDeputies();
    }).catch((error) => {
      console.error(error);
    });
  }

  componentDidMount () {
    this.loadDeputiesFromServer();
  }

  componentWillUpdate(nextProps, nextState) {
    window.scrollTo(0, 0);
  }

  limitDeputies() {
    let { deputies, pageSize, page, searchDeputy } = this.state;

    let limitedDeputiesList = deputies.filter((deputy) => {
      if (searchDeputy) {
        let name = Diacritics.remove(deputy.name).toLowerCase();

        if (name.indexOf(searchDeputy) < 0) {
          return false;
        }
      }

      return true;
    });

    let pageCount = Math.ceil(limitedDeputiesList.length / pageSize);
    let start = pageSize * (page - 1);
    let end = pageSize * page;

    limitedDeputiesList = limitedDeputiesList.slice(start, end);

    this.setState({ limitedDeputiesList, pageCount, isLoading: false });
  }

  handlePageChange(page) {
    this.setState({ page }, () => {
      this.limitDeputies();
    });
  }

  handleSearchDeputy(searchDeputy) {
    this.setState({ searchDeputy }, () => {
      this.limitDeputies();
    });
  }

  render() {
    let {
      limitedDeputiesList,
      isLoading,
      page,
      pageCount,
    } = this.state;

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
              <DeputiesList deputies={limitedDeputiesList} />
            </div>
            <Pagination onPageChange={this.handlePageChange} pageCount={pageCount} page={page} />
          </div>
        )
      }
    }

    return (loadedPage());
  }
}
