// import { handleActions, createAction } from 'redux-actions';

// const INCREMENT = 'INCREMENT';
// const DECREMENT = 'DECREMENT';

// export const increment = createAction(INCREMENT);
// export const decrement = createAction(DECREMENT);

// export const incrementAsync = () => (dispatch) =>{
//     setTimeout(() => {
//         // 1 초뒤 dispatch 합니다
//         dispatch(increment()); //여러번도 가능
//       }, 1000);
// };

// export const decrementAsync = () => (dispatch) =>{
//     setTimeout(() => {
//         // 1 초뒤 dispatch 합니다
//         dispatch(decrement());
//       }, 1000);
// };
// export default handleActions({
//     [INCREMENT]: (state, action) => state + 1,
//     [DECREMENT]: (state, action) => state - 1
// }, 1); //기본갑 1

import { delay } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';
import { handleActions, createAction } from 'redux-actions';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const INCREMENT_ASYNC = 'INCREMENT_ASYNC';
const DECREMENT_ASYNC = 'DECREMENT_ASYNC';

export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);
export const incrementAsync = createAction(INCREMENT_ASYNC);
export const decrementAsync = createAction(DECREMENT_ASYNC);
/**
 * put : 새 액션을 dispatch 시킴
 * delay : 작업을 지연 시킴
 */
function* incrementAsyncSaga() {
  yield delay(1000);
  yield put(increment());
}

function* decrementAsyncSaga() {
  yield delay(1000);
  yield put(decrement());
}

/**
 *  takeEvery : 특정 액션을 모니터링하고 ,발생하면 특정함수를 발생시킴
 */
export function* counterSaga() {
  yield takeEvery(INCREMENT_ASYNC, incrementAsyncSaga);
  yield takeEvery(DECREMENT_ASYNC, decrementAsyncSaga);
}

export default handleActions(
  {
    [INCREMENT]: (state, action) => state + 1,
    [DECREMENT]: (state, action) => state - 1,
  },
  1,
);
