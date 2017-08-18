import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {

  class Authentication extends Component {

    static contextTypes = {
      router: React.PropTypes.object,
    }

    pushToHomeScreen(authenticated) {
      if (!authenticated) {
        this.context.router.push('/');
      }
    }

    componentWillMount() {
      this.pushToHomeScreen(this.props.authenticated);
    };

    componentWillUpdate(nextProps) {
      this.pushToHomeScreen(nextProps.authenticated);
    };

    render(){
      return <ComposedComponent {...this.props}/>
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated,
    };
  };

  return connect(mapStateToProps)(Authentication);
};
