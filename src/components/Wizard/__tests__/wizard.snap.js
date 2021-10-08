import React from 'react';
import renderer from 'react-test-renderer';
import {Wizard, WizSteps, WizStep, WizViews, WizView, WizActions, WizActionButton} from 'components/Wizard';

test('Wizard renders the right children', () => {
    const component = renderer.create(
      <Wizard >
        <WizSteps>
            <WizStep label='1'></WizStep>
            <WizStep label='2'></WizStep>
        </WizSteps>
        <WizViews>
            <WizView>1</WizView>
            <WizView>2</WizView>
        </WizViews>
        <WizActions>
            <WizActionButton />
            <WizActionButton text='Save' />
            <WizActionButton  primary/>
        </WizActions>
      </Wizard>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });