import React, { Component } from 'react';
import PropTypes from 'prop-types';
import API from '../../api.js';
import { connect } from 'react-redux';
import { signOut } from '../../actions/login.actions';
import '../../assets/scss/main.scss';
import '../../assets/scss/header/panel.scss';

class UserPanel extends Component {
  signOut = () => {
    API.post('/logout', {}, { 'headers': { 'Authorization': localStorage.getItem("token")} })
    .then(response => {
      localStorage.removeItem('token');
      this.props.dispatch(signOut());
    })
    .catch(error => {
      console.log(error.response);
    });
  }

  render() {
    return (
      <div className="user-panel-box">
          <input type="text" placeholder="Search groups and hit enter!"/>
          <ul className="user-icons">
            <li><span className="fa fa-user" aria-hidden="true"></span></li>
            <li><span className="fa fa-bell active" aria-hidden="true"></span></li>
            <li><button onClick={this.signOut}>Logout</button></li>
          </ul>
      </div>
    );
  }
}

UserPanel.propTypes = {
  logout: PropTypes.func
}

export default connect()(UserPanel);
