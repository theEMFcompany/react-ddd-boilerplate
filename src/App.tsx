import React from "react";
import { Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {Home} from 'pages/Home';
import {Auth} from 'pages/Auth';
import {URLS} from 'resources/urls';

interface Props {
  url?: string;
}

export const App: React.FC<Props> = (props) => {
  return (
    <Route>
      <TransitionGroup className="routeWrapper">
        <CSSTransition key={props.url} classNames="fade" timeout={500}>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path={URLS.AUTH} component={Auth}/>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </Route>
  );
};

export default App;
