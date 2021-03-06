import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchEvents } from '../actions';

export class Menu extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired
  };

  componentDidMount() {
    if (this.props.events.size < 1) {
      this.props.dispatch(fetchEvents());
    }
  }

  render() {
    if (!this.props.events.size) {
      return null;
    }

    return (
      <ul>
        {
          this.props.events.map((event) => {
            const id = event.get('id');
            return (
              <li key={ id }>
                <Link to={ `/viewer/${id}` }>{ event.get('title') }</Link>
              </li>
            );
          })
        }
      </ul>
    );
  }
};

export const mapStateToProps = (state) => {
  return {
    events: state.events
  };
};

export default connect(mapStateToProps)(Menu);
