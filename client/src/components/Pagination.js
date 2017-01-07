import { Menu } from 'semantic-ui-react';
import React from 'react';

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    let page = parseInt(name, 10);
    this.props.onPageChange(page);
  }

  render() {
    let { pageCount, page } = this.props;

    let pagination = () => {
      let items = [];

      for (let i = 1; i <= pageCount; i++) {
        if (i === page) {
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
          <Menu pagination borderless>
            {items}
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
