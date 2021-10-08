import React, {ReactElement} from 'react';
import {Store, ActionCreator} from 'redux';
import * as T from 'types';


export type ActionsDispatch = Record<string, Record<string, (...args: any[]) => void>>;

const Context = React.createContext<[T.ActionsDispatchers, T.StoreState] | null>(null);

export function Connect<A extends Record<any, any>, E extends keyof A=null>(
  getPropsFunction: ([actions, stores]: [T.ActionsDispatchers, T.StoreState]) =>  null extends E ? A : Omit<A, E>
): (Target: React.ComponentClass<A> | React.FC<A>) => React.FC<(E extends keyof A ? Pick<A, E> : Partial<A>)> {
  const Consumer = Context.Consumer;

  return (Target) => {
    return (props) => {
      return <Consumer>
          {
            (value): ReactElement<any> => {
              let _storeProps;
              if(value === null) {
                _storeProps = {};
              } else {
                _storeProps = getPropsFunction([value[0], value[1]]);
              }
              const storeProps = _storeProps !== null ? _storeProps : {};
              const AllProps: A = {...props, ...storeProps} as A;
              return React.createElement<A>(Target, AllProps);
            }
          }
        </Consumer>
    }
  }
}

type ActionProp = Record<string, ActionCreator<any>>
interface Props {
  actions: Record<T.ModuleActions, ActionProp>
  store: any;
}

interface State {
  store: any
}

export class Provider extends React.Component<Props, State> {

  public state = {
    store: {}
  }

  private mounted = false;
  private unsubscribeFromStore: () => void = () => {};
  private actions: ActionsDispatch | null = null;

  constructor(props: Props){
    super(props);
    this.mapActionsToDispatch = this.mapActionsToDispatch.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  public componentDidMount(): void {
    this.mounted = true;
    Object.entries(this.props.actions).forEach(([key, entry]) => {
      if(this.actions === null) {
        this.actions = {}
      }
      this.actions[key] = this.mapActionsToDispatch(entry, this.props.store);
    });
    this.onChange();
    this.unsubscribeFromStore = this.props.store.subscribe(this.onChange);
  }

  public componentWillUnmount(): void {
    this.mounted = false;
    this.unsubscribeFromStore();
  }

  private mapActionsToDispatch(actionMap: ActionProp, store: Store) {
    const actionDispatchers: Record<string, (...payload: any[]) => void> = {};
    Object.entries(actionMap).forEach(([key, actionCreator]) => {
      actionDispatchers[key] = (...args: any) => store.dispatch(actionCreator(...args))
    });
    return actionDispatchers;
  }

  private onChange(): void {
    this.mounted && this.setState((prevState: State): State => ({
      store: this.props.store.getState()
    }));
  }

  public render(): any {
    return (
      this.actions !== null
        ?<Context.Provider value={[this.actions as unknown as T.ActionsDispatchers, this.state.store as T.StoreState]}>
          {
            this.props.children
              ? <>
                {
                  React.Children.map(this.props.children, ((c: any): any => React.cloneElement(c)))
                }
              </>
              : null
          }
        </Context.Provider>
        : null
    );
  }
}
