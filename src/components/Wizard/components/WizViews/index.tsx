import React, {Component, PropsWithChildren} from 'react';
import {CSSTransition, SwitchTransition} from 'react-transition-group';
import LoadingPage from 'components/LoadingPage/';
import WizView from '../WizView';
import {Direction} from '../WizActionButton';

interface Props {
  activeView?: number;
  loading?: boolean;
  moveTo?(step: number): void;
  goBack?(): void;
  getAction?(): Direction;
  render?(props:{}): React.ReactNode;
}

export class WizViews extends Component<Props>{
    static displayName: string = 'WizViews';

    constructor(props: PropsWithChildren<Props>) {
      super(props);
      this.renderChild = this.renderChild.bind(this);
    }

    renderChild({children, activeView = 0, loading, moveTo, goBack}: PropsWithChildren<Props>) {
        let child;
        if(loading){
          return <LoadingPage/>
        }

        child = React.Children.toArray(children).filter((child, index)=>{
          if(
            React.isValidElement(child) &&
            typeof child.type !== "string" &&
            (child.type instanceof WizView || child.type.name === 'WizView')
          ) {
            return child;
          }
        })[activeView];

        if (child && React.isValidElement(child)) {
          let _childProps = {
            ...child.props,
            index: activeView,
            moveTo,
            goBack,
            loading,
          };
          return React.cloneElement(child, _childProps, child.props.children);
        }
        return <LoadingPage/>;
    }

    public render() {
        const{ children, activeView, getAction, loading, render, moveTo, goBack} = this.props;
        let views;
        if(render){
          views = render({activeView, loading});
        } else{
          views = this.renderChild({children, activeView, loading, moveTo, goBack})
        }

        return(
          <div className='wizard-viewWrapper'>
            <SwitchTransition mode='out-in'>
                <CSSTransition
                  key={`wiz-${activeView}`}
                  unmountOnExit
                  addEndListener={(node, done) => {
                    node.addEventListener("transitionend", done, false);
                  }}
                  classNames={getAction && getAction() === 'forward' ? 'fadeSlideUp' : 'fadeSlideDown'}
                  timeout={500}>
                {
                  views
                }
                </CSSTransition>
            </SwitchTransition>
          </div>
        );
    }
}

export default WizViews;
