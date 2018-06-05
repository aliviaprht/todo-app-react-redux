import React from 'react';
import PropTypes from 'prop-types';

const GroupField = ({ children }) => {
  return (
    <div className="field is-grouped">
      {children}
    </div>
  );
}

GroupField.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default GroupField;