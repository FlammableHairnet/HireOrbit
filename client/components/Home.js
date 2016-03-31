import React, { Component } from 'react';
import Utils from '../utils/Utils';
import { Link } from 'react-router';

class Home extends Component {
  constructor(){
    super();

    this.state = {
      jobSet: [],
      employerSet: [],
      employerType: '',
      jobType: '',
      location: '',
      position: '',
      radius: 0,
      sort: 'relevance',
      start: 0,
      q: {}
    };

    this.stateChange = this.stateChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  componentDidMount() {
    this.setState({
      jobSet: [{label: 'Any', value: ''}, {label: 'Fulltime', value: 'fulltime'}, {label: 'Part Time', value: 'parttime'}, {label: 'Contract', value: 'contract'}, {label: 'Internship', value: 'internship'}, {label: 'Temporary', value: 'temporary'}],
      employerSet: [{label: 'Any', value: ''}, {label: 'Recruiter', value: 'recruiter'}, {label: 'Employer', value: 'employer'}],
      employerType: '',
      jobType: '',
      location: '',
      position: '',
      radius: 50,
      sort: 'relevance',
      start: 0
    });
  }

  submitForm() {
    var q = {
      q: this.state.position,
      l: this.state.location,
      radius: this.state.radius,
      jt: this.state.jobType,
      st: this.state.employerType,
      sort: this.state.sort,
      start: 0
    }

    this.props.updateCurrentQuery(q);
    return q;
  }

  onFocus(event) {
    let key = event.target.name;
    this.setState({
      [key]: ''
    });
  }

  stateChange(event) {
    let key = event.target.name;
    this.setState({
      [key]: event.target.value
    });
  }

  render(){
    // TODO refactor this to a component
    var Tabs = (props) => (
      <div className="radio-box">
        {props.types.map((item, i) =>
          // make this active based on the 'checked' match
          <div key={i} className={ (item.value === this.state[props.name]) ? 'active' : '' }>
            <span>{item.label}</span>
            <input type="radio" name={props.name} value={item.value} checked={item.value === this.state[props.name]} onChange={ this.stateChange } />
          </div>
        )}
      </div>
    );

    return (
      <div className="search-container">
        <div className="video-overlay"></div>
        <video autoPlay loop poster="img/EarthShineCyan.jpg" id="bgvid">
          <source src="video/EarthShineCyan.mp4" type="video/mp4" />
        </video>
        <img  className="searchLogo" src="img/hireOrbit.png"/>
        <form action="" className="search">
          <div className="main-search">
            <div>
              <input className="main__input left" type="text" placeholder="Keywords" name="position" value={this.state.position} onChange={ this.stateChange } onClick={ this.onFocus } autoComplete="off" />
            </div>
            <div>
              <input className="main__input right" type="text" placeholder="Location" name="location" value={this.state.location} onChange={ this.stateChange } onClick={ this.onFocus } autoComplete="off" />
            </div>
            <Link to={{ pathname: '/search', query: this.submitForm.bind(this)() }} ><button className="main__search__button">Search</button></Link>
          </div>
          <div className="advanced">
            <div className="advanced__container">
              <div className="radius">
                <input type="range" value={this.state.radius} name="radius" min="0" max="100" step="25" onChange={ this.stateChange } />
                <div className="range">
                  <span>0<br/><span className="range__miles__label">miles</span></span>
                  <span>50</span>
                  <span>100<br/><span className="range__miles__label">miles</span></span>
                </div>
              </div>
              <Tabs types={this.state.jobSet} name={"jobType"} title={""} />
              <Tabs types={this.state.employerSet} name={"employerType"} title={""} />
            </div>
          </div>
          </form>
      </div>
    );
  }
}

export default Home;
