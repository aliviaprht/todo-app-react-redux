import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    size: PropTypes.string,
    color: PropTypes.string,
    handleClick: PropTypes.func
  };

  static defaultProps = {
    type: 'primary'
  }

  render() {
    const { label, type, handleClick, size, color } = this.props;

    return (
      <div className="control">
        <button className={`button is-${size} is-${color} is-${type}`} onClick={handleClick}>{label}</button>
      </div>
    );
  }
};