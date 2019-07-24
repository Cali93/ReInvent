import { action } from 'easy-peasy';

export const user = {
  user: {},
  login: action((state, loginResponse) => {
    state.user = loginResponse;
    return state;
  }),
  logout: action((state, logoutMutation) => {
    logoutMutation();
    window.location.replace('/authenticate');
    state.user = {};
    return state;
  }),
  setUser: action((state, payload) => {
    state.user = payload;
    return state;
  })
};
