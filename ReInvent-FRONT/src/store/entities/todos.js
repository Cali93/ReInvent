import { action, thunk } from 'easy-peasy';

export const todos = {
  items: ['Create store', 'Wrap application', 'Use store'],
  user: {},
  add: action((state, todoPayload) => {
    state.items.push(todoPayload);
  }),
  // saveTodo: thunk(async (actions, payload) => {
  //   // In this example we call a service to save the todo
  //   // const savedTodo = await todoService.save(payload);
  //   console.log(data);

  //   // Then dispatch an action with the result to add it to our state
  //   // actions.todoSaved(savedTodo);
  // }),

  todoSaved: action((state, payload) => {
    state.items.push(payload);
  })
};
