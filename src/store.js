// import { createStore, applyMiddleware } from 'redux';
// import modules from './modules';
// //import loggerMiddleware from './lib/loggerMiddleware';
// import {createLogger} from 'redux-logger';
// import ReduxThunk from 'redux-thunk';
// // 미들웨어가 여러개인경우에는 파라미터로 여러개를 전달해주면 됩니다. 예: applyMiddleware(a,b,c)
// // 미들웨어의 순서는 여기서 전달한 파라미터의 순서대로 지정됩니다.
// //const store = createStore(modules, applyMiddleware(loggerMiddleware))
// const logger = createLogger();

// const store = createStore(modules, applyMiddleware(logger, ReduxThunk))

// export default store;
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import modules, { rootSaga } from './modules';
const logger = createLogger();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(modules, applyMiddleware(logger, sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
