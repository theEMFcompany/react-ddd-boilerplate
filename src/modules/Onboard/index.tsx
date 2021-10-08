import  React, {useEffect} from 'react';
import {
  Wizard,
  WizActions,
  WizActionButton,
  WizSteps,
  WizStep,
  WizViews,
  WizView,
} from "components/Wizard";
import { Wrap, } from 'components/Wrap';
import UserInfo from './components/UserInfo';
import AccountType from './components/AccountType';
import LocationDetails from './components/LocationDetails';
import SubscritionPlan from './components/SubsriptionPlan';
import {Connect} from 'lib/Connect';
import * as T from './types';
import Card from 'components/Card';

interface Props extends Pick<T.State, 'savedValues' | 'activeStep' | 'onboardingUserComplete' | 'isOnboardingUser'> {
  onUserOnboarded(): void;
  actions: Pick<T.Actions, 'updateValue' | 'nextStep' | 'prevStep' | 'onboardUser'>
}

const Onboard: React.FC<Props> = (props) => {

  useEffect(() => {
    if(props.onboardingUserComplete) {
      props.onUserOnboarded && typeof props.onUserOnboarded === 'function' && props.onUserOnboarded();
    }
  }, [props.isOnboardingUser]);

  function _handleUpdate(key: string, value: string): void {
    props.actions.updateValue(key, value);
  }

  function _handleNext(step: number): void {
    console.log()
    if(props.activeStep === T.ONBOARDING_STEP.SUNSCRIPTION_PLAN) {
      props.actions.onboardUser(props.savedValues)
    }
    props.actions.nextStep();
  }

  return (
    <Wrap width='large'>
      <Card>
        <Wizard onNext={(step: number) => _handleNext(step)} onPrev={(step: number) => props.actions.prevStep()}>
          <WizSteps>
            <WizStep label="User" />
            <WizStep label="Account" />
            <WizStep label="Location" />
            <WizStep label="Plan" />
          </WizSteps>
          <WizViews>
            <WizView>
              <UserInfo onUpdate={(key, value) => _handleUpdate(key, value)} values={props.savedValues[T.ONBOARDING_STEP.USER_INFO]}/>
            </WizView>
            <WizView>
              <AccountType  onUpdate={(key, value) => _handleUpdate(key, value)} values={props.savedValues[T.ONBOARDING_STEP.ACCOUNT_TYPE]}/>
            </WizView>
            <WizView>
              <LocationDetails  onUpdate={(key, value) => _handleUpdate(key, value)} values={props.savedValues[T.ONBOARDING_STEP.LOCATION_DETAILS]}/>
            </WizView>
            <WizView>
              <SubscritionPlan  onUpdate={(key, value) => _handleUpdate(key, value)} values={props.savedValues[T.ONBOARDING_STEP.SUNSCRIPTION_PLAN]}/>
            </WizView>
          </WizViews>
          <WizActions>
            <WizActionButton text='Back' direction='backward'/>
            <WizActionButton primary text='Next' direction='forward'/>
          </WizActions>
        </Wizard>
      </Card>
    </Wrap>
  )
}


export default Connect<Props, 'onUserOnboarded'>(([actions, stores]) => {
  return ({
    savedValues: stores.Onboard.savedValues,
    activeStep: stores.Onboard.activeStep,
    onboardingUserComplete: stores.Onboard.onboardingUserComplete,
    isOnboardingUser: stores.Onboard.isOnboardingUser,
    actions: {
      nextStep: actions.Onboard.nextStep,
      prevStep: actions.Onboard.prevStep,
      updateValue: actions.Onboard.updateValue,
      resetValues: actions.Onboard.resetValues,
      onboardUser: actions.Onboard.onboardUser,
    }
  })
})(Onboard);
