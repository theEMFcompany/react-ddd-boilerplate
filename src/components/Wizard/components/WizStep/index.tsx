import React, {PropsWithChildren} from "react";

interface Props {
  label?: string;
  index?: number;
  last?: boolean;
  first?: boolean;
  count?: number;
  isActive?: boolean;
  isDone?: boolean;
}

export class WizStep extends React.Component<Props> {
  static displayName = 'WizStep';
  static defaultProps = {
    label: 'Step'
  };

  constructor(props: PropsWithChildren<Props>){
    super(props);
  }

  render(){
    const index = this.props.index || 0;
    const isLastStep = this.props.last ? this.props.last : this.props.count === index + 1;
    const isFirstStep = this.props.first ? this.props.first : this.props.index === 0;

    return (
      <span
        className={`wizard-step ${isLastStep ? "wizard-step--last" : ""} ${
          isFirstStep ? "wizard-step--first" : ""
        } ${this.props.isDone ? "wizard-step--done" : ""} ${
          this.props.isActive ? "wizard-step--active" : ""
        }`}
      >
        {isFirstStep || <span className="wizard-step-divider" />}

        <span className={`wizard-step-countWrapper`}>
          {<span className="wizard-step-count">{index + 1 || 1}</span>}
        </span>
        {this.props.label && <span className="wizard-step-label">{this.props.label}</span>}
      </span>
    );
  }
}

export default WizStep;
