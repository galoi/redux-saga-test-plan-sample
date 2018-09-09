import { call, put } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

function* getUsersSaga(api) {
  const users = yield call(api.getUsers);
  yield put({ type: 'GET_USERS_SUCCESS', payload: users });
}

it('get users', () => {
  const users = ['太郎', '花子'];
  const api = {
    getUsers: () => users,
  };

  expectSaga(getUsersSaga, api)
    .put({ type: 'GET_USERS_SUCCESS', payload: users })
    .run();
});
