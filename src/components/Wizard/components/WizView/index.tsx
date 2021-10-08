import React, { Component, PropsWithChildren } from "react";

interface Props {
  index?: number;
}

export class WizView extends Component<Props> {
  static displayName: string = 'WizView';

  constructor(props: PropsWithChildren<Props>) {
    super(props);
  }

  render() {
    const { children } = this.props;
    return <div className={`wizard-body`}>{children}</div>;
  }
}

export default WizView;
