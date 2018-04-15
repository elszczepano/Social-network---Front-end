import React, { Component } from 'react';
import Header from '../Containers/Header';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import API from '../../api.js';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { getDetails } from '../../actions/userDetails.actions';
import Footer from '../View/Footer';
import '../../assets/scss/main.scss';
import '../../assets/scss/user/myaccount.scss';

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {errMessage: [], user: this.props.user, updated: false};
  }

  handleChange = (event) => {
      this.setState({
          user: {
              ...this.state.user,
              [event.target.id]: event.target.value
          }
      });
  }

  togglePasswordVisibility = () => {
    if(this.refs.password.type === 'password') this.refs.password.type = 'text'
    else this.refs.password.type = 'password'
  }

  getAvatar = (event) => {
    //to fix
    const reader  = new FileReader();
    this.setState({
      user: {
        ...this.state.user,
        avatar: reader.readAsDataURL(event.target.files[0])
      }
    })
  }

  updateUserDetails = (event) => {
    event.preventDefault();
    let messages = [];
    this.setState({
      updated: false,
      errMessage: []
    });
    const user = this.state.user;
    for(let key in user) {
      if(user[key] === this.props.user[key]) delete user[key];
    }
    console.log(user);
    if(Object.keys(user).length === 0) return;
    API.put(`/users/${this.props.user.id}`,
    {...user},
    {
      'headers': { 'Authorization': localStorage.getItem("token")}
    })
    .then(response => {
      if(response['data']['error']) {
        const responseMessage = response['data']['message'];
        Object.keys(responseMessage).forEach((key) => {
          messages.push(responseMessage[key].toString());
        })
        this.setState({errMessage: messages});
        return;
      }
      this.props.dispatch(getDetails(response['data']['data']));
      this.forceUpdate();
    })
    .catch(error => {
      if(error.response) console.log(error.response['data']['message']);
      else console.log(error);
    });

  }

  deleteUser = () => {

  }

  render() {
    const messageClass = classNames({
    'success-marker': this.state.updated,
    'warning-marker': !this.state.updated
    });
    if(!this.props.loginStatus) return <Redirect to="/"/>
    return (
      <div>
        <Header />
        <section className="edit-account-contaner default-container">
          <h2 className="text-marker">Edit account details</h2>
          <p>Edit your personal inforamtion and click <span className="text-marker">update</span></p>
          <form>
            <div className="edit-account-fields">
              <label htmlFor="firstName">First name</label>
              <input id="name" name="firstName" type="text" onChange={this.handleChange} defaultValue={this.state.user.name} />
              <label htmlFor="lastName">Last name</label>
              <input id="surname" name="lastName" type="text" onChange={this.handleChange} defaultValue={this.state.user.surname}/>
              <label htmlFor="birth">Birth date</label>
              <input id="birth_date" name="birth" type="date" onChange={this.handleChange} defaultValue={this.state.user.birth_date}/>
              <label htmlFor="email">E-Mail Address</label>
              <input id="email" name="email" type="email" onChange={this.handleChange} defaultValue={this.state.user.email}/>
              <label htmlFor="avatar">Avatar</label>
              <input id="avatar" name="avatar" type="file" onChange={this.getAvatar} defaultValue={this.state.user.avatar} accept=".jpg, .jpeg, .png"/>
              <label htmlFor="password">New password</label>
                <div className="eye-handler">
                  <input ref="password" id="password" name="password" onChange={this.handleChange} type="password"/>
                  <span onClick={this.togglePasswordVisibility} className="fa fa-eye"></span>
                </div>
            </div>
            <div className="error-message-box">
            {
              this.state.errMessage.map((value) =>
                <p className={messageClass} key={value.toString()}>{value}</p>
              )
            }
            </div>
            <div className="edit-account-buttons">
              <button type="submit" onClick={this.updateUserDetails}>Update</button>
              <button className="danger-button">Delete account</button>
            </div>
          </form>
        </section>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userDetails,
    loginStatus: state.loginStatus
  }
}

MyAccount.propTypes = {
  user: PropTypes.object.isRequired,
  loginStatus: PropTypes.bool.isRequired
}

export default connect(mapStateToProps)(MyAccount);
