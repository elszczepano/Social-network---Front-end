import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Login from '../Control/Login';
import UserPanel from '../Control/UserPanel';
import '../../assets/scss/header/header.scss';

class Header extends Component {
  render() {
    return (
      <header className="main-header">
          <div className="logo">
            <h1><Link to={this.props.loginStatus ? '/feed' : '/'}>Groupeé</Link></h1>
          </div>
          { this.props.loginStatus ? <UserPanel/> : <Login/> }
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    loginStatus: state.loginStatus
  }
}

Header.propTypes = {
  loginStatus: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(Header);
