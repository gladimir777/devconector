import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../action/profile';
import Spiner from '../layout/Spiner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  console.log(match.params.id);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spiner />
      ) : (
        <Fragment>
          <Link className="btn btn-light" to="/profiles">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
          auth.loading === false &&
          auth.user._id === profile.user._id ? (
            <Link className="btn btn-dark" to="/edit-profile">
              Edit Profile
            </Link>
          ) : (
            ''
          )}
          <div class="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);
