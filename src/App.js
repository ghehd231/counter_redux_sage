import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as counterActions from './modules/counter';
import * as postActions from './modules/post';

import { rootSaga } from './modules';

console.log(rootSaga);
class App extends Component {
  componentDidMount() {
    const { PostActions, number } = this.props;
    PostActions.getPost(number);
  }

  //   componentDidUpdate(preProps, prevState) {
  //     if (this.props.number !== nextProps.number) {
  //       PostActions.getPost(nextProps.number);
  //     }
  //   }
  render() {
    const { CounterActions, number, post, error, loading } = this.props;

    return (
      <div>
        <h1>
          {number}
        </h1>
        {/* <button onClick={CounterActions.increment}>+</button>
        <button onClick={CounterActions.decrement}>-</button> */}
        <button onClick={() => CounterActions.increment()}>+</button>
        <button onClick={() => CounterActions.decrement()}>-</button>
        {loading && <h2>로딩중...</h2>}
        {error
          ? <h1>에러발생!</h1>
          : <div>
              <h1>
                {post.title}
              </h1>
              <p>
                {post.title}
              </p>
            </div>}
      </div>
    );
  }
}

// export default connect(
//     (state) => ({
//         number: state.counter,
//         post: state.post.data,
//         loading: state.post.pending,
//         error: state.post.error
//     }),
//     (dispatch) => ({
//         CounterActions: bindActionCreators(counterActions, dispatch),
//         PostActions: bindActionCreators(postActions, dispatch)
//     })
// )(App);

export default connect(
  state => ({
    number: state.counter,
    post: state.post.data,
    // loading: state.pender.pending['GET_POST'],
    // error: state.pender.failure['GET_POST']
  }),
  dispatch => ({
    CounterActions: bindActionCreators(counterActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch),
  }),
)(App);
