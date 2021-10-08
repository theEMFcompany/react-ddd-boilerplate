import React, {PropsWithChildren} from "react";
import {Button} from 'components/Button';
import {ActionIcon} from './Icon';

interface Props extends InheritedProps{
  direction: Direction;
  getActionState?(step?: number): ActionState;
  text: string;
  primary?: boolean;
  onClick?(direction: Direction): boolean;
}

interface InheritedProps {
  activeView?: number;
  goBack?(): void;
  moveTo?(step: number): void;
}

interface ActionState {
  disabled: boolean;
  visible: boolean;
  label: string;
}

export type WizActionButtonState = ActionState;

export type Direction = 'backward' | 'forward';

export class WizActionButton extends React.Component<Props> {
  static displayName = "WizActionButton";

  constructor(props: PropsWithChildren<Props>){
    super(props);
  }

  render() {

    function actionStateClasses(_actionState: ActionState): string {
      let classes = "";
      if (_actionState.disabled) {
        classes += " wizard-action--disabled";
      }
      if (!_actionState.visible) {
        classes += " wizard-action--hidden";
      }
      return classes;
    }

    const actionState: ActionState = this.props.getActionState
      ? this.props.getActionState(this.props.activeView)
      : {
        disabled: false,
        label: this.props.text,
        visible: true
      };

    return (
      <Button
        iconLeft={this.props.direction === "backward" ? 'arrow-right' : undefined}
        iconRight={this.props.direction === "forward" ? 'arrow-left' : undefined}
        text={actionState.label}
        size='large'
        onClick={
          actionState && actionState.disabled
            ? () => {}
            : () => this.props.onClick && this.props.onClick(this.props.direction)
        }
        style={this.props.direction === 'backward' ? 'hollow' : 'solid'}
        disabled={actionState.disabled}
        color={'primary'}
        className={`${!actionState.visible ? 'wizard-action--hidden' : ''}`}>
      </Button>
    );
  }
}

export default WizActionButton;
