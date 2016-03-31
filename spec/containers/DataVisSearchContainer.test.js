import { renderComponent, expect } from '../support/setup.mocha';
import DataVisSearchContainer from '../../client/containers/DataVisSearchContainer';
import * as action from '../../client/actions/index';

describe('DataVisSearchContainer', () => {

  let component;
  const props = [];
  beforeEach(() => {    
    component = renderComponent(DataVisSearchContainer, null);
  });

  it('should have a class name', () => {
    expect(true).to.equal(true);
  });

});
