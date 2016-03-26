import React, { Component } from 'react';
import { connect } from 'react-redux';
import dataVisual from '../reducers/index';
import d3 from 'd3';
import _ from 'lodash';

  const spec = {
    h: 600,
    w: 300
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


  let Chart = React.createClass({
    render: function () {
      console.log('chart this.props.children ', this.props.children)
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
      let props = this.props;
      let data = props.data.map(function (d) {return d.y})

      let xScale = d3.scale.ordinal()
                     .domain(d3.range(data.length))
                     .rangeRoundBands([0, this.props.width, 0.05])

      let yScale = d3.scale.linear()
                     .domain( [ 0, d3.max(data)] )
                     .range([0, this.props.height])

      console.log('xScale.rangeBand() ', xScale.rangeBand())
      let Bars = data.map(function(e, i) {
        var height = yScale(e),
            y = props.height - height,
            width = xScale.rangeBand(),
            x = xScale(i)
            console.log('bars', height, y, width, x);
      });

      return (
        <g>{Bars}</g>
      )
    }

  });



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
      <Chart width={spec.w} height={spec.h}>
        <Bar data={dataset2} width={spec.w} height={spec.h} />
      </Chart>
    )
  }
}




function mapStateToProps({dataVisual}) {
  return {dataVisual};
}

export default connect(mapStateToProps, null)(DataVisContainer)
