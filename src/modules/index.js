// import { combineReducers } from 'redux';
// import counter from './counter';

// import post from './post';
// export default combineReducers({
//     counter,
//     post
// });
import { combineReducers } from 'redux';
import counter, { counterSaga } from './counter';
import post, { postSaga } from './post';
import { all } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([counterSaga(), postSaga()]);
}

export default combineReducers({
  counter,
  post,
});
