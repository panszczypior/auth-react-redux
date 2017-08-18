import React, { Component } from 'react';
import { Field,reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {

  handleFormSubmit({email, password}) {
    this.props.signinUser({email, password});
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
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field
            className="form-control"
            component="input"
            name="email"
            type="email"
          />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field
            className="form-control"
            component="input"
            name="password"
            type="password"
          />
        </fieldset>
        {this.renderAlert()}
        <button className="btn btn-primary" action="submit">Sign in</button>
      </form>
    );
  }
}

let SigninReduxForm = reduxForm({
  form: 'signin',
})(Signin);

const mapStateToProps = ({ auth: { error }}) => ({errorMessage: error});

SigninReduxForm = connect(mapStateToProps, actions)(SigninReduxForm);

export default SigninReduxForm;
