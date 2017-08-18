import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {

  componentWillMount() {
    this.props.fetchMessage();
  };

  render() {
    console.log(this.props);
    return (
      <div>
        info from server: {this.props.message}
      </div>
    );
  };
}

const mapStateToProps = ({ auth: { message }}) => ({message});

export default connect(mapStateToProps, actions)(Feature);
