import { call, put } from "redux-saga/effects";
import { expectSaga } from "redux-saga-test-plan";

function* fetchUsersSaga(api) {
  const users = yield call(api.getUsers);
  yield put({ type: "FETCH_USERS_SUCCESS", payload: users });
}

it("fetches users", () => {
  const users = ["Jeremy", "Tucker"];

  const api = {
    getUsers: () => users
  };

  return expectSaga(fetchUsersSaga, api)
    .put({ type: "FETCH_USERS_SUCCESS", payload: users })
    .run();
});
