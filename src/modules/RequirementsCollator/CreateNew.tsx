import  React, {useEffect} from 'react';
import {
  Wizard,
  WizActions,
  WizActionButton,
  WizSteps,
  WizStep,
  WizViews,
  WizView,
  WizActionButtonState
} from "components/Wizard";
import { Wrap, } from 'components/Wrap';
import { Space } from 'components/Space';
import {TemplateType} from './components/TemplateType';
import Requirements from './components/Requirements';
import Stakeholders from './components/Stakeholders';
import {Connect} from 'lib/Connect';
import * as T from './types';
import {requirementsCollator as L} from 'resources/locales';

interface Props extends Pick<T.State, 'activeStep' | 'isCreatingNewGenerator' | 'templateType'> {
  actions: Pick<T.Actions, 'nextStep' | 'prevStep' | 'creatingNewGenerator' | 'fetchRequirementsFields'>
}

const _CreateNew: React.FC<Props> = (props) => {

  function _handleNext(nextStep: number): void {
    [
      () => {
        props.actions.fetchRequirementsFields(props.templateType.selected);
        props.actions.nextStep()
      },
      () => props.actions.nextStep(),
      () => {
        props.actions.creatingNewGenerator();
        props.actions.nextStep()
      },
    ][nextStep -1]();
  }

  function getActionDisabledState(step: number): boolean {
    return [
      props.templateType.selected ? false : true
    ][step] || false;
  }

  function getActionVisibility(step: number): boolean {
    return true;
  }

  function getActionLabel(step: number): string {
    return step === 2 ? 'Finish' : 'Next';
  }

  return (
    <Space top2>
    <Wrap width='large'>
        <Wizard onNext={(step: number) => _handleNext(step)} onPrev={(step: number) => props.actions.prevStep()}>
          <WizSteps>
            <WizStep label={L.templateType.title} />
            <WizStep label={L.requirementFields.title} />
            <WizStep label={L.stakeholders.title} />
          </WizSteps>
          <WizViews>
            <WizView>
              <TemplateType/>
            </WizView>
            <WizView>
              <Requirements/>
            </WizView>
            <WizView>
              <Stakeholders/>
            </WizView>
          </WizViews>
          <WizActions>
            <WizActionButton text='Back' direction='backward'/>
            <WizActionButton
              primary
              text='Next'
              direction='forward'
              getActionState={(step: number): WizActionButtonState => ({
                disabled: getActionDisabledState(step),
                visible: getActionVisibility(step),
                label: getActionLabel(step)
              })}/>
          </WizActions>
        </Wizard>
    </Wrap>
    </Space>
  )
}


export const CreateNew = Connect<Props>(([actions, stores]) => {
  return ({
    savedValues: stores.GeneratorEditor.savedValues,
    activeStep: stores.GeneratorEditor.activeStep,
    isCreatingNewGenerator: stores.GeneratorEditor.isCreatingNewGenerator,
    templateType: stores.GeneratorEditor.templateType,
    actions: {
      nextStep: actions.GeneratorEditor.nextStep,
      prevStep: actions.GeneratorEditor.prevStep,
      updateValue: actions.GeneratorEditor.updateValue,
      resetValues: actions.GeneratorEditor.resetValues,
      creatingNewGenerator: actions.GeneratorEditor.creatingNewGenerator,
      fetchRequirementsFields: actions.GeneratorEditor.fetchRequirementsFields,
    }
  })
})(_CreateNew);
