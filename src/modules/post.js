import { createAction, handleActions } from 'redux-actions';
import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

function getPostAPI(postId) {
  return axios.get('https://jsonplaceholder.typicode.com/posts/${postId}');
}

//action
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_FAILURE';

//redux-actions 를 이용한 액션 생성함수
export const getPost = createAction(GET_POST, postId => postId); //GET_POST액션을 payload => payload 형태로 넘김
// = export const getPost = () => ({ type: GET_POST, payload => postId }) -> 일반 액션 생성함수
// = export const getPost = createAction(GET_POST) -> 생략하면 기본이 payload => payload로 지정됨
// 위 세 코드는 같은 기능을 하고 있다

const something = () => ({
  data: { title: 'hello', body: 'world' },
});

/**
 * Redux-sage 문법 
 * put: 새 액션을 dispatch 합니다
 * delay: 작업을 지연시킵니다.
 * takeEvery: 특정 액션을 모니터링 하고, 발생하면 특정 함수를 발생시킵니다.
 * call: 첫번째 파라미터로 전달한 함수에 그 뒤에 있는 파라미터들은 전달하여 호출해줍니다. 이를 사용하면 나중에 테스트를 작성하게 될 때 용이합니다.
 */
//generator
function* getPostSaga(action) {
  console.log(call(something, ''));
  try {
    const response = yield call(getPostAPI, action.payload);
    yield put({ type: GET_POST_SUCCESS, payload: response });
  } catch (e) {
    yield put({ type: GET_POST_FAILURE, payload: e });
  }
}
const initialState = {
  data: {
    title: '',
    body: '',
  },
};

export function* postSaga() {
  yield takeEvery('GET_POST', getPostSaga);
}

export default handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) => {
      const { title, body } = action.payload.data;
      return {
        data: { title, body },
      };
    },
  },
  initialState,
);
