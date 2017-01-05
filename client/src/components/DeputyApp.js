import * as ServerAPI from '../serverAPI';

import DeputiesList from './DeputiesList';
import { Menu } from 'semantic-ui-react';
import React from 'react';

export default class DeputyApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      deputies: [],
      pageSize: 25,
      limitedDeputiesList: [],
      page: 1,
    };

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  loadDeputiesFromServer() {
    ServerAPI.getResource('deputies').then((deputies) => {
      let pageCount = Math.ceil(deputies.length / this.state.pageSize);

      this.setState({ deputies, pageCount });
      this.limitDeputies();
    }).catch((error) => {
      console.error(error);
    });
  }

  componentDidMount() {
    this.loadDeputiesFromServer();
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

    return (
      <div className="deputies">
        <DeputiesList deputies={limitedDeputiesList} />

        <Menu pagination borderless>
          {renderMenuItems()}
        </Menu>
      </div>
    )
  }
}
