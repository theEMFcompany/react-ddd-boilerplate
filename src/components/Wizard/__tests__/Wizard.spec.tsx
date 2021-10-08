import React from 'react';
import {configure, shallow, mount, ShallowWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Wizard, WizSteps, WizStep, WizViews, WizView, WizActions, WizActionButton} from 'components/Wizard';

configure({ adapter: new Adapter() });

describe('Component - Wizard', ()=>{
  let wrapper: ShallowWrapper<Wizard>;
  beforeEach(() => {
    wrapper = shallow(
      <Wizard>
        <WizSteps/>
        <div></div>
        <WizViews/>
        <ul>
          <li>Invalid</li>
        </ul>
        <WizActions/>
      </Wizard>
    );
  });

  it('Renders valid children', () => {
    expect(wrapper.containsMatchingElement(<WizSteps/>)).toEqual(true);
    expect(wrapper.containsMatchingElement(<WizViews/>)).toEqual(true);
    expect(wrapper.containsMatchingElement(<WizActions/>)).toEqual(true);
  });
  it('Does not renders invalid children', () => {
    expect(wrapper.containsMatchingElement(<div></div>)).toEqual(false);
    expect(wrapper.containsMatchingElement(<ul><li>Invalid</li></ul>)).toEqual(false);
  });
  it('it passes the right props to its children', () => {
    const _WizStepsProps = wrapper.find(WizSteps).at(0).props();

    expect(_WizStepsProps.activeView).toEqual(0);
    expect(_WizStepsProps.done).toEqual([]);

    const _WizViewsProps = wrapper.find(WizViews).props();

    expect(_WizViewsProps.activeView).toEqual(0);

    const _WizActionsProps = wrapper.find(WizActions).props();

    expect(_WizActionsProps.activeView).toEqual(0);
  });
});
