import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.message}
    </div>
  ));

const mapStateToProps = state => ({
  alerts: state.alert
});

alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(alert);
