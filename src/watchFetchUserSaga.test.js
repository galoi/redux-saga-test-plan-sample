import { call, put, takeLatest } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";

const api = {
  getUser: () => ""
};

function* fetchUserSaga(action) {
  const id = action.payload;
  const user = yield call(api.getUser, id);

  yield put({ type: "FETCH_USER_SUCCESS", payload: user });
}

function* watchFetchUserSaga() {
  yield takeLatest("FETCH_USER_REQUEST", fetchUserSaga);
}

it("fetches a user", () => {
  const id = 42;
  const user = { id, name: "Jeremy" };

  return expectSaga(watchFetchUserSaga)
    .provide([[call(api.getUser, id), user]])
    .put({ type: "FETCH_USER_SUCCESS", payload: user })
    .dispatch({ type: "FETCH_USER_REQUEST", payload: id })
    .silentRun();
});
