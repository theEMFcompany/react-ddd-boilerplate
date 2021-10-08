import React, {ReactNode, PropsWithChildren} from 'react';
import WizActionButton, {Direction} from '../WizActionButton';
import {ButtonGroup} from 'components/Button';

interface Props {
  activeView?: number;
  goBack?(): void;
  goForward?(): void;
  moveTo?(step: number): void;
  render?(props: Omit<Props, 'render'>): ReactNode;
}

export class WizActions extends React.Component<Props> {
  static displayName = 'WizActions';

  constructor(props: PropsWithChildren<Props>){
    super(props);
  }

  render() {

    let computedChildren: ReactNode = [];

    if(this.props.render && typeof this.props.render === 'function') {
      computedChildren = this.props.render({
        activeView: this.props.activeView,
        moveTo: this.props.moveTo,
        goBack: this.props.goBack
      });
    } else {
      computedChildren = React.Children.map(this.props.children, (child, index) => {
        if(React.isValidElement(child)) {
          if(typeof child.type === 'string') {
            return child;
          }
          if(child.type instanceof WizActionButton || child.type.name === 'WizActionButton'){

            const childProps = {
              key: 'action' + index,
              activeView: this.props.activeView,
              text: child.props.text,
              direction: child.props.direction,
              onClick: (direction: Direction) => this._handleActionClick(direction),
              getActionState: child.props.getActionState
                ? child.props.getActionState
                : () => ({
                  disabled: false,
                  visible: child.props.direction === 'backward' && this.props.activeView === 0 && index === 0 ? false :true,
                  label: child.props.text
                })
            }

            return React.cloneElement(child, childProps, child.props.children);
          }
          return React.cloneElement(child, {key: 'action' + index}, child.props.children);
        }
      });
    }
    return (
      <footer className='wizard-actions'>
        <ButtonGroup>
        {computedChildren}
        </ButtonGroup>
      </footer>
    );
  }
  _handleActionClick(direction: string) {
    if(direction === 'forward') {
      this.props.goForward && typeof this.props.goForward === 'function' && this.props.goForward();
    }
    if(direction === 'backward'){
      this.props.goBack && typeof this.props.goBack === 'function' && this.props.goBack();
    }
  }
}

export default WizActions;
