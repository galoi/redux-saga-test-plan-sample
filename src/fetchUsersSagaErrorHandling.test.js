import { call, put } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";

const api = {
  getUsers: () => ""
};

function* fetchUsersSaga() {
  try {
    const users = yield call(api.getUsers);
    yield put({ type: "FETCH_USERS_SUCCESS", payload: users });
  } catch (e) {
    yield put({ type: "FETCH_USERS_FAIL", payload: e });
  }
}

it("handles errors", () => {
  const error = new Error("Whoops");

  return expectSaga(fetchUsersSaga)
    .provide([[call(api.getUsers), throwError(error)]])
    .put({ type: "FETCH_USERS_FAIL", payload: error })
    .run();
});
