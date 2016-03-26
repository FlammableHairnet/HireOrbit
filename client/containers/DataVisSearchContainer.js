import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchDataVis } from '../actions';
import DataVisContainer from '../containers/DataVisContainer';
import dataVisual from '../reducers/index';
import d3 from 'd3';
import Utils from '../utils/Utils'
import _ from 'lodash';

  class DataVisSearchContainer extends Component {
    constructor(props){
      super(props)
      // Declare initial state
      this.state = {
        term: '',
        city1: '',
        city2: '',
        city3: ''
      }
      // Bind keyboard input submit to DataVisSearchContainer
      this.onSubmit = this.onSubmit.bind(this);
      // Bind keyboard stateChange to DataVisSearchContainer
      this.stateChange = this.stateChange.bind(this);
    }
    // Change state on each keyboard input
    stateChange (e) {
      // Save name of input in key
      let key = e.target.name;
      // if key exist, change the state value to input value
      this.setState({[key]: e.target.value});
    }
    // On submit, obtain user job position and city, send data to redux store.
    onSubmit (e) {
      var dataVisArray = [];
      var self = this;
      // Filter for user city choices, filter out search term and empty strings.
      var cities = _.filter(this.state, function (city, key) {
        return key !== 'term' && city !== '';
      });

      // Use Asynchronus callback to query search term and city
      var listOfPromises = cities.map(function (city) {
        return new Promise(function (resolve, reject){
          return Utils.getJobsFromIndeed({q: self.state.term, l: city}, resolve, reject);
        });
      });
      // Iterate through array of promises
      Promise.all(listOfPromises)
        .then(function  (arrayOfResponses) {
          // iterate through array of objects
          arrayOfResponses.forEach(function (res) {
            // use object destructuring to obtain data              
            let { location, totalResults, query } = res;
            // Every iteration, push into dataVisArray
            dataVisArray.push({ location, totalResults, query} );
          })
          // Prevent free invocation of keyword 'this' using self.
          self.props.fetchDataVis(dataVisArray);
          // self.setState({term: ''});
        })
        .catch(err => {
          console.log('error in promise: ', err)
        })
      // Prevent page refresh    
      e.preventDefault();
    }
    // Form data
    render() {
      return (
        <div>
          <form onSubmit={this.onSubmit}>
            <div>
              <input type="text" placeholder="Search for job" name="term" value={this.state.term} onChange={ this.stateChange } required/>
            </div>
            <div>
              <input type="text" placeholder="Enter the city you're interested in" name="city1" value={this.state.city1} onChange={ this.stateChange } />
            </div>
            <div>
              <input type="text" placeholder="Enter the city you're interested in" name="city2" value={this.state.city2} onChange={ this.stateChange } />
            </div>
            <div>
              <input type="text" placeholder="Enter the city you're interested in" name="city3" value={this.state.city3} onChange={ this.stateChange } />
            </div>
            <span>
              <button type="submit">Submit</button>
            </span>
          </form>
            <DataVisContainer />
        </div>
      );
    }
  };
  // Obtain the action creator fetchDataVis
  function mapToDispatchProps(dispatch) {
    return bindActionCreators({ fetchDataVis: fetchDataVis }, dispatch);
  };
  // Convert DataVisSearchContainer into a Smart Container
  export default connect (null, mapToDispatchProps)(DataVisSearchContainer)
