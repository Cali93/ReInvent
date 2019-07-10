import { createStore } from 'easy-peasy';
import { todos } from './entities/todos';
import { user } from './entities/user';

export const store = createStore({
  todos,
  user
});
