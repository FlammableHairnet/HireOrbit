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
      this.state = {
        term: ''
      }
      this.onPutChange = this.onPutChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

    onPutChange (e) {
      this.setState({term: e.target.value});
    }

    onSubmit (e) {
      e.preventDefault();
      // call the term value inside the fetchWeater from action creator
      this.props.fetchDataVis(this.state.term);
      //reset the term back to a empty string
      this.setState({term: ''});
      console.log(this.state.term)
    }

      render() {
      return (
        <div>
          <form onSubmit={this.onSubmit}>
            <input
            placeholder="Get a five-day forecast in your favorite cities"
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
