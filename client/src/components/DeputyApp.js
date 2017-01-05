import * as ServerAPI from '../serverAPI';

import { Loader, Menu } from 'semantic-ui-react';

import DeputiesList from './DeputiesList';
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
    };

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  loadDeputiesFromServer() {
    ServerAPI.getResource('deputies').then((deputies) => {
      let pageCount = Math.ceil(deputies.length / this.state.pageSize);

      this.setState({ deputies, pageCount, isLoading: false });
      this.limitDeputies();
    }).catch((error) => {
      console.error(error);
    });
  }

  componentDidMount() {
    this.loadDeputiesFromServer();
  }

  componentWillUpdate (nextProps, nextState) {
    window.scrollTo(0, 0);
  }

  limitDeputies() {
    let { deputies, pageSize, page } = this.state;

    let start = pageSize * (page - 1);
    let end = pageSize * page;
    let limitedDeputiesList = deputies.slice(start, end);
    this.setState({ limitedDeputiesList });
  }

  handleItemClick(e, { name }) {
    this.setState({ page: name }, () => {
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

    let renderMenuItems = () => {
      let items = [];

      for (let i = 1; i <= pageCount; i++) {
        items.push(<Menu.Item key={i} name={i.toString()} active={page === i} onClick={this.handleItemClick}/>);
      }

      return items;
    }

    let loadedPage = () => {
      if (isLoading) {
        return (
          <Loader active='true' size='big'>Carregando Informações...</Loader>
        );
      } else {
        return(
          <div className="deputies">
            <DeputiesList deputies={limitedDeputiesList} />

            <Menu pagination borderless>
              {renderMenuItems()}
            </Menu>
          </div>
        )
      }
    }

    return (loadedPage());
  }
}
