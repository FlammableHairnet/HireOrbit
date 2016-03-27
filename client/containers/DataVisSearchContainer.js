import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDataVis } from '../actions';
import DataVisContainer from '../containers/DataVisContainer';
import dataVisual from '../reducers/index';
import d3 from 'd3';

  class DataVisSearchContainer extends Component {

    constructor(props){
      super(props)
      console.log('props', props)
      this.state = {
        term: ''
      }
      // Bind keyboard input change to DataVisSearchContainer
      this.onPutChange = this.onPutChange.bind(this);
      // Bind keyboard input submit to DataVisSearchContainer
      this.onSubmit = this.onSubmit.bind(this);
    }
    // Change state on each keyboard input
    onPutChange (e) {
      this.setState({term: e.target.value});
    }
    // Pervent refresh, send data to action creator, reset keyboard input to empty string.
    onSubmit (e) {
      e.preventDefault();
      // call the term value inside the fetchWeater from action creator
      this.props.fetchDataVis(this.state.term);
      //reset the term back to a empty string
      this.setState({term: ''});
      console.log(this.state.term)
    }
    // Form data
    render() {
      return (
        <div>
          <form onSubmit={this.onSubmit}>
            <input
            placeholder="Enter Job title"
            value={this.state.term}
            onChange={this.onPutChange}
            />
            <span>
              <button type="submit">Submit</button>
            </span>
          </form>
            <DataVisContainer />
        </div>
      );
    }
  };

  function mapToDispatchProps(dispatch) {
    return bindActionCreators({ fetchDataVis: fetchDataVis }, dispatch);
  };

  // DataVisContainer.propTypes = {
  //   fetchDataVis: PropTypes.func.isRequired
  // }

  export default connect (null, mapToDispatchProps)(DataVisSearchContainer)
