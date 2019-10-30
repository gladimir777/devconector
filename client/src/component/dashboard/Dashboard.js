import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { getCurrentUser } from '../../action/profile';

const Dashboard = ({ getCurrentUser, auth, profile }) => {
  useEffect(() => {
    getCurrentUser();
  }, []);

  return <div>Dashboard</div>;
};

Dashboard.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentUser }
)(Dashboard);
