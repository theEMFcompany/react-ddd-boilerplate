import * as restaurantActions from 'modules/Restaurant/actions';
import * as authActions from 'modules/Auth/actions';
import * as onboardActions from 'modules/Onboard/actions';
import * as generatorEditorActions from 'modules/RequirementsCollator/actions'
export const actions = {
  Auth: authActions,
  Onboard: onboardActions,
  Restaurant: restaurantActions,
  GeneratorEditor: generatorEditorActions
}
export default actions;
