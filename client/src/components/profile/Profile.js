import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import ProfileTop from './ProfileTop';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';

const Profile = ({ 
    match, 
    getProfileById, 
    profile:{ profile, loading }, 
    auth
}) => {
    useEffect(()=> {
        getProfileById(match.params.id);
    },[getProfileById, match.params.id]);

    return (
        <Fragment>
            {profile === null || loading ? <Spinner /> : (<Fragment>
                <Link to="/profiles" className="btn btn-light">
                    Back To Profiles
                </Link>
                {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (<Link to="/edit-profile" className="btn btn-dark">
                    Edit Profile
                </Link>)}
                <div class="profile-grid my-1">
                    <ProfileTop profile={profile} />
                </div>
            </Fragment>
            )}
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);
