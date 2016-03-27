import React, { Component } from 'react';
import { connect } from 'react-redux';
import dataVisual from '../reducers/index';
import d3 from 'd3';
import _ from 'lodash';

  const filler = {
    fill: 'white',
    textAnchor: 'middle'
  }
  const alt = {
    fill : 'steelblue',
    textAnchor: 'middle'
  }

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

  // Cross-cutting-concerns
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

  // Create Chart component to return svg
  let Chart = React.createClass({
    render: function () {
      return (
        <svg className="svg" width={this.props.width}
             height={this.props.height} >
              {this.props.children}
        </svg>
      )
    }
  });


  //Bar components returns content of Rect component
  let Bar = React.createClass({
    getDefaultProps: function() {
      return {
        data: []
      }
    },

    render: function () {
      let props = this.props
      // Padding of 25 percent of max value
      let padding = d3.max(props.data) * 0.25;
      // Create a xScale to scale width inputs
      let xScale = d3.scale.ordinal()
                     .domain(d3.range(props.data.length))
                     .rangeRoundBands([0, props.width], 0.4)

      // padding: domain input of 0 to max, max + plus 25 percent of max value obtain in data array.
      let yScale = d3.scale.linear()
                     .domain( [ 0, d3.max(props.data)+padding] )
                     .range([0, props.height])
      // Iterate through the data array
      let bars = props.data.map(function(dataPoint, i) {
        // scale the height
        var height = yScale(dataPoint),
        // scale width using rangeBand, outputs an integer
            width = xScale.rangeBand(),
            // props height minus scaled height
            y = props.height - height,
            // scale index
            x = xScale(i);
        // for each iteration, send props to Rect component
        return (
          <Rect
            key={dataPoint}
            width={width}
            height={height}
            x={x}
            y={y}
            data={dataPoint}
          />
        )
      });
      // When bar returns, render contents of bars
      return (
        <g>{bars}</g>
      )
    }


  });

  //
  var Rect = React.createClass({
    // use Mixins to cancel setIntervals when not needed
    mixins: [SetIntervalMixin],
    getDefaultProps: function () {
      return {
        width: 0,
        height: 0,
        x: 0,
        y: 0
      }
    },

    // Set the lifecycle
    getInitialState: function () {
      return {
        milliseconds: 0,
        height: 0
      }
    },

    // Should return true to avoid bugs, when return false,
      // render() will be skipped shouldComponentUpdate, componentWillUpdate will be not be called.
    shouldComponentUpdate: function (nextProps) {
      return this.props.height !== this.state.height;
    },
    // Before render, log the message
    componentWillMount: function () {
      console.log('will mount');
    },
    // When component receives new props, not on initial render.
    componentWillReceiveProps: function (nextProps) {
      console.log('next props', nextProps)
      this.setState({milliseconds: 0, height: this.props.height})
    },
    // When render activates, run the setInterval with the tick function.
    componentDidMount: function () {
      this.setInterval(this.tick, 10);
    },
    // Every tick, add 10 to the state.milliseconds
    tick: function (start) {
        this.setState({milliseconds: this.state.milliseconds + 10});
    },

    render: function () {
      var bounce = d3.ease('bounce');
      var height = this.state.height + (this.props.height - this.state.height) * bounce(Math.min(1, this.state.milliseconds/1000));
      var y = height + this.props.y;
      return (
        <g>
        <rect
          className="bar"
          height={height}
          width={this.props.width}
          x={this.props.x}
          y={this.props.y} >
          </rect>
          <text
          x={this.props.x + (this.props.width/2)}
          y={ height < 35 ? this.props.y : this.props.y+20}
          style={ height < 35 ? alt : filler}
          >
          {this.props.data}
          </text>
        </g>
      )
    }

  })





class DataVisContainer extends Component {

  constructor(props) {
    super(props)
  }

  // Chart returns svg, with contents of Bar components.
  render () {
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
