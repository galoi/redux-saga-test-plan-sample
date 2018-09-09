import { call, put } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";

const api = {
  getUsers: () => ""
};

function* fetchUsersSaga() {
  const users = yield call(api.getUsers);
  yield put({ type: "FETCH_USERS_SUCCESS", payload: users });
}

it("fetches users", () => {
  const users = ["Jeremy", "Tucker"];

  return expectSaga(fetchUsersSaga)
    .provide([[call(api.getUsers), users]])
    .put({ type: "FETCH_USERS_SUCCESS", payload: users })
    .run();
});
