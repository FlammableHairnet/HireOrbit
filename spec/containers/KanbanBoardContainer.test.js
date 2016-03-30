// import KanbanBoardContainer from '../../client/containers/KanbanBoardContainer';
// import ListContainer from '../../client/containers/ListContainer';
// import ToolbarContainer from '../../client/containers/ToolbarContainer';
// import reducersCard from '../../client/reducers/reducer_cards';
// import {updateCardStatus, updateCardPosition, updateFilterValue} from '../../client/actions/index';
// import React from 'react';
// import TestUtils from 'react-addons-test-utils';

// // One solution is to mock out other components from the test with __Rewire__.

// describe('KanbanBoardContainer', () => {
//   let props;
//   let Link;
//   beforeEach(() => {
//     // some mock props, this will be use when the frontend/backend starts communicating
//     // Does a get request and gives us a array of data or whatever.
//     props = {
//       api_function: sinon.stub(),
//       data: [
//         { id: 1, content: 'data content 1' },
//         { id: 2, content: 'data content 1' }
//       ]
//     };
//     // create a mock component called link
//     Link = React.createClass({
//           render() {
//             return (<div>MOCK COMPONENT CLASS</div>)
//           }
//         });
//         // issues: we usually render other components within a component
//         // mock out other components from the test with __Rewire__.
//         KanbanBoardContainer.__Rewire__('Link', Link);
//   });

//   it('KanbanBoardContainer container', function(){
//     // render into....ListContainer
//     // let doc = TestUtils.renderIntoDocument(<KanbanBoardContainer {...props} />);
//     // scryRenderedDOMComponentsWithTag(reactComponent tree, 'string tag name')
//     // let questionElements = TestUtils.scryRenderedDOMComponentsWithTag(doc, 'div');
//     // console.log('questionElements', questionElements)
//     // expect(link).not.to.be.undefined;
//     // might want to say, render a link back to '/';
//     // expect(link.props.to).to.equal('/');
//     expect(true).to.equal(true);
//   });

// });
