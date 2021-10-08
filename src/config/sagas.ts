
import { all } from 'redux-saga/effects';
import restaurantSagas from 'modules/Restaurant/sagas';
import authSagas from 'modules/Auth/sagas';
import onboardSagas from 'modules/Onboard/sagas';
import generatorEditorSagas from 'modules/RequirementsCollator/sagas';

export default function* rootSaga() {
  yield all([
    ...authSagas,
    ...onboardSagas,
    ...restaurantSagas,
    ...generatorEditorSagas,
  ]);
}
