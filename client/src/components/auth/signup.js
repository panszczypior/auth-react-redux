import React, { Component } from 'react';
import { Field,reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const validate = ({ email, password, passwordConfirm }) => {

  const errors = {};

  if (!email) {
    errors.email = 'Please enter email';
  }

  if (!password) {
    errors.password = 'Please enter a password';
  }

  if (!passwordConfirm) {
    errors.passwordConfirm = 'Please repeat your password';
  }

  if (password !== passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
};

const renderField = ({ type, label, input, className, meta: { error, touched } }) => {
  return (
    <div>
      <label>
        {label}
      </label>
      <input type={type} {...input} className={className}/>
      {touched && error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

class Signup extends Component {


  handleFormSubmit(values) {
    this.props.signupUser(values);
  };

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Opps! {this.props.errorMessage}</strong>
        </div>
      )
    }
  }

  render() {

    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">

            <Field
              className="form-control"
              component={renderField}
              name="email"
              type="email"
              label="Email:"
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              className="form-control"
              component={renderField}
              name="password"
              type="password"
              label="Password:"
            />
          </fieldset>
          <fieldset className="form-group">
            <Field
              className="form-control"
              component={renderField}
              name="passwordConfirm"
              type="password"
              label="Password confirm:"
            />
          </fieldset>
          <button className="btn btn-primary" action="submit">Sign up</button>
          {this.renderAlert()}
        </form>
      </div>
    );
  };

}

let SignupReduxForm = reduxForm({
  form: 'signup',
  validate,
})(Signup);

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.error,
  }
};

SignupReduxForm = connect(mapStateToProps, actions)(SignupReduxForm);

export default SignupReduxForm;
