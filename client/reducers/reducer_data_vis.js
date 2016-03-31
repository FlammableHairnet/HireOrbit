import { actions } from '../constants';

export default function(state = [], action) {
  switch (action.type) {
    case actions.FETCH_DATA_VIS:
      return action.payload
    default: return state;
  }
}
