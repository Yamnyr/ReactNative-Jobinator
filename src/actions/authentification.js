export const actions = {
  SET_TOKEN: "SET_TOKEN",
  SET_REFRESH: "SET_REFRESH",
};

export function setToken(jwt) {
  return {
    type: actions.SET_TOKEN,
    jwt : jwt,
  };
}
export function setRefreshToken(jwt) {
  return {
    type: actions.SET_REFRESH,
    jwt : jwt,
  };
}