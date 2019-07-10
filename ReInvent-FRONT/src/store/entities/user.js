import { action } from 'easy-peasy';

export const user = {
  user: {},
  login: action((state, loginResponse) => {
    state.user = loginResponse;
    return state;
  }),
  logout: action((state, loginResponse) => {
    state.user = {};
    return state;
  }),
  // saveTodo: thunk(async (actions, payload) => {
  //   // In this example we call a service to save the todo
  //   // const savedTodo = await todoService.save(payload);
  //   console.log(data);

  //   // Then dispatch an action with the result to add it to our state
  //   // actions.todoSaved(savedTodo);
  // }),

  setUser: action((state, payload) => {
    state.user = payload;
    return state;
  })
};
