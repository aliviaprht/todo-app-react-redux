import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TextBox extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    help: PropTypes.string,
    handleChange: PropTypes.func,
    val: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {input_value: ''} 
  }


  render() {
    const { label, placeholder, help, handleChange, val } = this.props;

    return (
      <div className="field">
        <label className="label is-large">{label}</label>
        <div className="control">
          <input className="input is-large" value={val} onChange={handleChange} type="text" placeholder={placeholder} />
        </div>
        {help ? <p className="help is-medium">{help}</p> : null}
      </div>
    );
  }
};