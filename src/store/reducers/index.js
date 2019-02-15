import { combineReducers } from 'redux-immutable';
import { home } from './module/home';
import { user } from './module/user';
import { articles } from './module/articles';
import { connectRouter } from 'connected-react-router/immutable'
const rootReducer = (history) => combineReducers({
  /* your reducers */
  home,
  user,
  articles,
  router: connectRouter(history)
});
export default rootReducer;
