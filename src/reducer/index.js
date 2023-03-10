import {actions} from '../actions/authentification';


export function reducer(state, action) {
  console.log(action)
  switch (action.type) {
    case actions.SET_TOKEN:
      return {jwt: action.jwt};
    case actions.SET_REFRESH:
      return {refreshToken: action.refreshToken};
    default:
      throw new Error();
  }
}