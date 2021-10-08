import React from 'react';
import {configure, shallow, ShallowWrapper} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {WizSteps, WizStep} from 'components/Wizard';

configure({ adapter: new Adapter() });

describe('Component - WizSteps', ()=>{
  let wrapper: ShallowWrapper<WizSteps>;
  beforeEach(()=>{
    wrapper = shallow(
      <WizSteps activeView={0}
                done={[]}>
        <WizStep label='Step One'/>
        <WizStep label='Step Two'/>
        <WizStep label='Step Three'/>
        <div></div>
      </WizSteps>
    );
  });

  it('Renders valid children', () => {
    expect(wrapper.containsMatchingElement(<WizStep label='Step One'/>)).toEqual(true);
    expect(wrapper.containsMatchingElement(<WizStep label='Step Two'/>)).toEqual(true);
    expect(wrapper.containsMatchingElement(<WizStep label='Step Three'/>)).toEqual(true);
  });

  it('Does not render invalid children', () => {
    expect(wrapper.containsMatchingElement(<div></div>)).toEqual(false);
  });

  it('it passes the right default props to its children', () => {
    const _WizStep0Props = wrapper.find(WizStep).get(0).props;

    expect(_WizStep0Props.isActive).toEqual(true);
    expect(_WizStep0Props.isDone).toEqual(false);
    expect(_WizStep0Props.count).toEqual(3);

    const _WizStep1Props = wrapper.find(WizStep).get(1).props;

    expect(_WizStep1Props.isActive).toEqual(false);
    expect(_WizStep1Props.isDone).toEqual(false);
    expect(_WizStep1Props.count).toEqual(3);

    const _WizStep2Props = wrapper.find(WizStep).get(2).props;

    expect(_WizStep2Props.isActive).toEqual(false);
    expect(_WizStep2Props.isDone).toEqual(false);
    expect(_WizStep2Props.count).toEqual(3);
  });
});
