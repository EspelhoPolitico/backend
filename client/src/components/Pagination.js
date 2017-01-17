import { Icon, Menu } from 'semantic-ui-react';

import React from 'react';

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleGoToPage = this.handleGoToPage.bind(this);
  }

  handleItemClick(e, { name }) {
    let page = parseInt(name, 10);
    this.props.onPageChange(page);
  }

  handleGoToPage(page) {
    this.props.onPageChange(page);
  }

  render() {
    let { numberOfPages, currentPage } = this.props;

    let pagination = () => {
      let items = [];
      let firstPage = (currentPage < 3) ? 1 : currentPage - 2;
      let visiblePages = (numberOfPages < 5) ? numberOfPages : 5;

      if ((numberOfPages - firstPage) < visiblePages) {
        firstPage = numberOfPages - visiblePages + 1;
      }

      let lastPage = firstPage + (visiblePages - 1);

      for (let i = firstPage; i <= lastPage; i++) {
        if (i === currentPage) {
          items.push(<Menu.Item key={i} active={true} disabled>{i}</Menu.Item>);
        } else {
          items.push(
            <Menu.Item
              key={i}
              name={i.toString()}
              onClick={this.handleItemClick}
              />
          );
        }
      }

      if (items.length) {
        return (
          <Menu pagination size='small'>
            {currentPage > firstPage &&
              <Menu.Item
                link
                onClick={() => this.handleGoToPage(currentPage - 1)}
                >
                <Icon fitted name='angle left' />
              </Menu.Item>
            }
            {items}
            {currentPage < lastPage &&
              <Menu.Item
                link
                onClick={() => this.handleGoToPage(currentPage + 1)}
                >
                <Icon fitted name='angle right' />
              </Menu.Item>
            }
          </Menu>
        );
      }
    }

    return (
      <div>
        {pagination()}
      </div>
    );
  }
}
