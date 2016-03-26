import React, { Component } from 'react';
import { connect } from 'react-redux';
import dataVisual from '../reducers/index';
import d3 from 'd3';
import _ from 'lodash';

  const dataset = [ 5, 10, 15, 20, 25 ];

  const dataset2 = [
    {x: 'a', y: 20},
    {x: 'b', y: 14},
    {x: 'c', y: 12},
    {x: 'd', y: 19},
    {x: 'e', y: 18},
    {x: 'f', y: 15},
    {x: 'g', y: 10},
    {x: 'h', y: 14}
  ];

  const SetIntervalMixin = {
    componentWillMount: function() {
      this.intervals = [];
    },
    setInterval: function() {
      this.intervals.push(setInterval.apply(null, arguments));
    },
    componentWillUnmount: function() {
      this.intervals.map(clearInterval);
    }
  };


  let Chart = React.createClass({
    render: function () {
      return (
        <svg width={this.props.width}
             height={this.props.height} >
              {this.props.children}
        </svg>
      )
    }
  });

  let Bar = React.createClass({
    getDefaultProps: function() {
      return {
        data: []
      }
    },

    render: function () {
      let props = this.props
      console.log('PRRROOOPSS', props)
      let xScale = d3.scale.ordinal()
                     .domain(d3.range(props.data.length))
                     .rangeRoundBands([0, props.width, 0.05])
      let yScale = d3.scale.linear()
                     .domain( [ 0, d3.max(props.data)] )
                     .range([0, props.height])

      let bars = props.data.map(function(e, i) {
        console.log('asfeeee',e)
        var height = yScale(e),
            width = xScale.rangeBand(),
            y = props.height - height,
            x = xScale(i)

        return (
          <Rect
            width={width}
            height={height}
            x={x}
            y={y}
          />
        )
      });

      return (
        <g>{bars}</g>
      )
    }
  });

  var Rect = React.createClass({
    mixins: [SetIntervalMixin],
    getDefaultProps: function () {
      return {
        width: 0,
        height: 0,
        x: 0,
        y: 0
      }
    },

    render: function () {
      console.log('this !', this.props)
      return (
        <rect
          className="bar"
          height={this.props.height}
          width={this.props.width}
          x={this.props.x}
          y={this.props.y}
        ></rect>
      )
    }
  })



class DataVisContainer extends Component {

  constructor(props) {
    super(props)
  }

  renderList (data) {
    const location = data.location;
    const totalResults = data.totalResults;
    const query = data.query;
  }



  render () {
    console.log('adsfa',this.props.dataVisual)
    return (
      <Chart width={500} height={500}>
        <Bar data={this.props.dataVisual} width={500} height={500} />
      </Chart>
    )
  }
}




function mapStateToProps({dataVisual}) {
  return {dataVisual};
}

export default connect(mapStateToProps, null)(DataVisContainer)
