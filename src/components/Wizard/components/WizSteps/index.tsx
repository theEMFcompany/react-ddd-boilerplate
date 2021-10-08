import React, {PropsWithChildren} from "react";
import WizStep from "../WizStep";

interface Props {
  activeView?: number;
  done?: Array<number>;
  render?(props: Omit<Props, "render">): React.ReactNode;
}

export class WizSteps extends React.Component<Props> {
  constructor(props: PropsWithChildren<Props>){
    super(props);
  }

  static displayName = "WizSteps";
  static defaultProps = {
    activeView: 0,
    done: [],
  };
  render() {
    const { children, activeView, done, render } = this.props;
    let steps;

    if(render && typeof this.props.render === "function") {
      steps = render({ activeView, done });
    } else {
      steps = React.Children.toArray(children)
        .filter((child) => {
          if(
            React.isValidElement(child) &&
            typeof child.type !== "string" &&
            typeof child.type !== null &&
            (child.type instanceof WizStep || child.type.name === 'WizStep')
          ) {
            return child;
          }
        })
        .map((child, index, childArray) => {
          if(React.isValidElement(child)) {
            return React.cloneElement(child, {
              key: "step_" + index,
              index: index,
              label: child.props.label,
              isDone: done && done[index] ? true : false,
              isActive: activeView === index,
              count: childArray.length,
            },
            child.props.children);
          }
        });
    }
    return <header className="wizard-steps">{steps}</header>;
  }
}
export default WizSteps;
