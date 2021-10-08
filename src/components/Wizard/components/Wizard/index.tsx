import React, { Component, PropsWithChildren } from "react";
import {Direction} from '../WizActionButton';
import {WizActions} from "../WizActions";
import {WizSteps} from '../WizSteps';
import {WizViews} from '../WizViews';

type Props = {
  active: number;
  as: "div" | "form";
  render?(props: {}): React.ReactNode;
  onNext?(val: number): void;
  onPrev?(val: number): void;
  loading?: boolean;
};

type State = {
  activeView: number;
  done: boolean[];
  action: Direction;
};

export class Wizard extends Component<Props, State> {
  private _viewCount: number;
  static displayName: string = 'Wizard';
  static defaultProps = {
    active: 0,
    as: "div",
    displayName: "Wizard",
  };
  state: State = {
    activeView: 0,
    done: [],
    action: 'forward'
  }
  constructor(props: PropsWithChildren<Props>) {
    super(props);
    this._viewCount = 0;
  }
  public render() {
    const { as, render, loading } = this.props;
    const { activeView, done } = this.state;

    const moveTo = (viewIndex: number) => this._handleMoveTo(viewIndex);
    const goBack = () => this._handleBackClick();
    const goForward = () => this._handleForwardClick();
    const markAsDone = (viewIndex: number) => this._handleDone(viewIndex);

    let children;
    if (render) {
      children = render({
        activeView,
        moveTo,
        goForward,
        goBack,
        loading,
        done,
        markAsDone,
      });
    } else {
      children = React.Children.toArray(this.props.children)
        .filter((child) => {
          if (
            React.isValidElement(child) &&
            typeof child.type !== "string" &&
            (
              (child.type instanceof WizSteps || child.type.name === 'WizSteps') ||
              (child.type instanceof WizViews || child.type.name === 'WizViews') ||
              (child.type instanceof WizActions || child.type.name === 'WizActions')
            )) {
              return child;
          }
        })
        .map((child, index, all) => {
          if (React.isValidElement(child) && typeof child.type !== "string") {
            if (child.type instanceof  WizSteps || child.type.name === 'WizSteps') {
              return React.cloneElement(child, {
                key: "wiz-steps" + index,
                activeView,
                loading,
                done,
              },
              child.props.children);
            }
            if(child.type instanceof WizViews || child.type.name === 'WizViews') {
              this._viewCount = React.Children.count(child.props.children);
              return React.cloneElement(child, {
                key: "wiz-views" + index,
                getAction: () => this.state.action,
                activeView,
                moveTo,
                goBack,
                loading,
              },
              child.props.children);
            }
            if(child.type instanceof WizActions || child.type.name === 'WizActions') {
              return React.cloneElement(
                child,
                {
                  key: "wiz-actions" + index,
                  activeView,
                  moveTo,
                  goBack,
                  goForward,
                  loading,
                },
                child.props.children
              );
            }
          }
        });
    }

    return as === "form" ? (
      <form className="wizard-wrapper" onSubmit={(e) => {
          e.preventDefault();
          this._handleForwardClick();
        }}>
        {children}
        <input type="submit" className="submitTrigger" />
      </form>
    ) : (
      <div className="wizard-wrapper">{children}</div>
    );
  }
  _handleBackClick() {
    this.setState(() => ({action: 'backward'}));
    setTimeout(() => {
      this.setState((curState) => {
        let activeView = curState.activeView;
        if(curState.activeView !== 0) {
          activeView = curState.activeView - 1
        }
        this.props.onPrev && this.props.onPrev(activeView);
        return {
          activeView,
        }
      });

    }, 100);
  }

  _handleForwardClick() {
    this.setState(() => ({action: 'forward'}));
    setTimeout(() => {
      this.setState((cur) => {
        let activeView = cur.activeView + 1;
        if(activeView >= this._viewCount) {
          activeView = this._viewCount - 1;
        }
        this.props.onNext && this.props.onNext(activeView);
        return {
          activeView
        };
      });
    }, 100);
  }

  _handleMoveTo(activeView: number) {
    this.setState((cur) => {
      const nowActive = !this.props.render
        ? activeView <= this._viewCount
          ? activeView
          : this._viewCount
        : activeView;
      if (cur.activeView < nowActive) {
        this.props.onNext && this.props.onNext(nowActive);
      } else {
        this.props.onPrev && this.props.onPrev(nowActive);
      }
      return {
        activeView: nowActive,
        action: cur.activeView < nowActive ? "forward" : "backward",
      };
    });
  }

  _handleDone(index: number) {
    const done: boolean[] = [];
    this.setState((cur) => {
      done
        .fill(false, 0, index) //can only be filled with the array type value
        .map((d, i) => (i === index ? true : cur.done[i]));
      return { done };
    });
  }
}

export default Wizard;
