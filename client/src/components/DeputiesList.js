import * as ServerAPI from '../serverAPI';

import Deputy from './Deputy';
import React from 'react';

export default class DeputiesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deputies: [],
    };
  }

  componentDidMount() {
    ServerAPI.getResource('deputies').then((deputies) => {
      this.setState({ deputies });
    }).catch((error) => {
      console.error(error);
    });
  }

  render() {
    let { deputies } = this.state;

    let renderDeputies = () => {
      return deputies.map((deputy) => {
        return (<Deputy key={deputy.cod} {...deputy}/>)
      })
    };

    return (
      <div className="deputies">
        {renderDeputies()}
      </div>
    )
  }
}
