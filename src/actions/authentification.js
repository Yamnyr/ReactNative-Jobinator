export const actions = {
  SET_TOKEN: "SET_TOKEN",
  SET_STATUS: "SET_STATUS",
};

export function setToken(jwt) {
  return {
    type: actions.SET_TOKEN,
    jwt : jwt,
  };
}
export function setStatus(status) {
  return {
    type: actions.SET_STATUS,
    status : status,
  };
}