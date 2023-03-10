import {actions} from '../actions/authentification';


export function reducer(state, action) {
  console.log(action)
  switch (action.type) {
    case actions.SET_TOKEN:
      return {jwt: action.jwt};
    case actions.SET_STATUS:
      return {status: action.status};
    default:
      throw new Error();
  }
}