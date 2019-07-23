import { createStore } from 'easy-peasy';
import { user } from './entities/user';
import { composeWithDevTools } from 'remote-redux-devtools';

export const store = createStore({
  user
}, { compose: composeWithDevTools({ realtime: true, trace: true }) });
