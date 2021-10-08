import computeState, { updateOnboardingValue, resetOnboardingFields, switchOnboardingStage } from "../state";

describe('State - Onboarding', () => {
  let state;

  beforeEach(() => {
    state = computeState(undefined, { type: '' });
  });

  it('Should start at stage 0', () => {
    expect(state.stage).toBe(0);
  });

  it('Should contain no values', () => {
    expect(state.values).toMatchObject({});
  });

  describe('when user fills a form field', ()=>{
    it('Should add the field value', () => {
      state = computeState(state, updateOnboardingValue('firstName', 'Buchi'));
      state = computeState(state, updateOnboardingValue('lastName', 'Buchanora'));
      expect(state.values).toMatchObject({
        firstName: 'Buchi',
        lastName: 'Buchanora'
      });
    });

    it('Should update a field value', () => {
      state = computeState(state, updateOnboardingValue('firstName', 'Buchi'));
      state = computeState(state, updateOnboardingValue('firstName', 'Buch'));
      expect(state.values).toMatchObject({
        firstName: 'Buch'
      });
    });

    describe('when a user resets the form', ()=>{
      it('Should contain no values', () => {
        state = computeState(state, updateOnboardingValue('firstName', 'Buchi'));
        state = computeState(state, updateOnboardingValue('lastName', 'Buchanora'));
        state = computeState(state, resetOnboardingFields());
        expect(state.values).toMatchObject({});
      });
    });

    describe('when a user moves to a new stage', ()=>{
      it('Should change the stage on state', () => {
        state = computeState(state, switchOnboardingStage(2));
        expect(state.stage).toBe(2);
      });
    });
  })
});