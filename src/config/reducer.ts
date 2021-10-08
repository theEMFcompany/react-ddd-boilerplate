import {combineReducers} from 'redux';
import Onboard from 'modules/Onboard/state';
import Auth from 'modules/Auth/state'
import GeneratorEditor from 'modules/RequirementsCollator/state'

const rootReducer = combineReducers({
  Auth,
  Onboard,
  GeneratorEditor,
});

export default rootReducer;
