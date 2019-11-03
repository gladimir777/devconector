import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Spiner from '../layout/Spiner';
import DashboardAction from './DashboardAction';
import Experience from './Experience';
import Education from './Education';

import { getCurrentProfile, deleteAccount } from '../../action/profile';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile == null ? (
    <Spiner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fas fa-user"></i>
        Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardAction />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" />
              Delete my account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet set up a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
