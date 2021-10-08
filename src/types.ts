import {State as EditorState, Actions as EditorActions} from 'modules/GeneratorEditor/types';
import {State as OnboardState, Actions as OnboardActions} from 'modules/Onboard/types';
import {State as AuthState, Actions as AuthActions} from 'modules/Auth/types';

export interface ActionObject<T=any> {
  type: string;
  payload: T;
}

export type ModuleActions = 'Restaurant'

export interface StoreState {
  Auth: AuthState;
  Onboard: OnboardState;
  GeneratorEditor: EditorState;
}

export interface ActionsDispatchers {
  Auth: AuthActions;
  Onboard: OnboardActions;
  GeneratorEditor: EditorActions;
}
