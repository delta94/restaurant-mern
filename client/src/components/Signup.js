import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';

import { showErrorMsg, showSuccessMsg } from '../helper/message';
import { showLoading } from '../helper/loading';
import { signup } from '../api/auth';

function Signup(props) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    successMsg: false,
    errMsg: false,
    loading: true,
  });

  const {
    username,
    email,
    password,
    password2,
    successMsg,
    errMsg,
    loading,
  } = formData;
  console.log(formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      successMsg: '',
      errMsg: '',
    });
  };

  const handleSubmit = (e) => {
    console.log(isEmpty(username));
    e.preventDefault();
    if (isEmpty(username) || isEmpty(password) || isEmpty(password2)) {
      setFormData({
        ...formData,
        errMsg: 'All fields are required',
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errMsg: 'Invalid email',
      });
    } else if (!equals(password, password2)) {
      setFormData({
        ...formData,
        errMsg: 'Passwords do not match',
      });
    } else {
      //success
      const { username, email, password } = formData;
      const data = { username, email, password };
      setFormData({
        ...formData,
        loading: true,
      });
      signup(data)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log('Axios sign up error', err);
        });
    }
  };
  /****************************
   * VIEWS
   ***************************/
  const showSignupForm = () => (
    <form className="signup-form" onSubmit={handleSubmit} noValidate>
      {/* username */}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-user"></i>
          </span>
        </div>
        <input
          name="username"
          value={username}
          className="form-control"
          placeholder="Username"
          type="text"
          onChange={handleChange}
        />
      </div>
      {/* email */}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-envelope"></i>
          </span>
        </div>
        <input
          name="email"
          value={email}
          className="form-control"
          placeholder="Email address"
          type="email"
          onChange={handleChange}
        />
      </div>
      {/* password */}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-lock"></i>
          </span>
        </div>
        <input
          name="password"
          value={password}
          className="form-control"
          placeholder="Create password"
          type="password"
          onChange={handleChange}
        />
      </div>
      {/* password2 */}
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-lock"></i>
          </span>
        </div>
        <input
          name="password2"
          value={password2}
          className="form-control"
          placeholder="Confirm password"
          type="password"
          onChange={handleChange}
        />
      </div>
      {/* signup button */}
      <div className="form-group">
        <button type="submit" className="btn btn-primary btn-block">
          Signup
        </button>
      </div>
      {/* already have account */}
      <p className="text-center text-white">
        Have an account? <Link to="/signin">Log In</Link>
      </p>
    </form>
  );

  /****************************
   * RENDER
   ***************************/
  return (
    <div className="signup-container">
      <div className="row px-2 vh-100">
        <div className="col-md-5 mx-auto align-self-center">
          {successMsg && showSuccessMsg(successMsg)}
          {errMsg && showErrorMsg(errMsg)}
          {loading && <div className="text-center pb-4">{showLoading()}</div>}
          {showSignupForm()}
        </div>
      </div>
    </div>
  );
}

export default Signup;
