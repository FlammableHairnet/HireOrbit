import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../../client/reducers';
import chaiJquery from 'chai-jquery';

// Set up testing environment to run like a browser in the command line
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;
const $ = jquery(global.window);

// build 'renderComponent' helper that should render a given react class
  // three parameters: Component, props placed ComponentClass and application level state to be injected into store.
function renderComponent(ComponentClass, props, state) {
  // Make an instance of ComponentClass, renderIntoDocument renders component
    // into detached DOM in document, requires a dom given by jsdom.
    // Provide store with initial state, and reducers
    // Instead of props={props}, use spread operator to prevent this.props.props
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );
  // Working with react and dom, wrap with jquery call to access matchers from chai-jquery
  return $(ReactDOM.findDOMNode(componentInstance)); // produces HTML
}


// Build helper for simulating events, creating an extension of jQuery.
  // any new instantiation of will have access to the jquery prototype
$.fn.simulate = function(eventName, value) {
  // if value passed in
  if (value) {
    // this html elemented selected, this.val will set value input
    this.val(value);
  }
  // .simulate; This is possibly the single most useful utility in ReactTestUtils.
    // Example: var node = this.refs.button; ReactTestUtils.Simulate.click(node);
      // Example: $('div').simulate('change', 'new comment')
  TestUtils.Simulate[eventName](this[0]);
}

// Set up chai-jquery
chaiJquery(chai, chai.util, $);

export { renderComponent, expect };
