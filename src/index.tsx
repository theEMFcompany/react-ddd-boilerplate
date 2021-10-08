import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from "react-hot-loader";
import {Provider} from 'lib/Connect';
import configureStore from './config/store';
import actions from './config/actions';
import 'assets/styles/main.scss';
import {Scroll} from 'components/Scroll';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

/**
 * Initialize FontAwesome Library; combine icon subsets into the FA library so we can display them
 ***************************************************************************/

// library.add(fas, far, fab);

const store = configureStore([]);

export function getAppWrapper(app: React.ReactElement) {
  return (
    <AppContainer>
      <Auth0Provider
        domain="dev-emf.eu.auth0.com"
        clientId="qvodhKaSoCov2zLcBPR8Qmsus6xdf0RG"
        redirectUri={window.location.origin}>
          <Provider store={store} actions={actions}>
            <Router>
              <Scroll/>
              {app}
            </Router>
          </Provider>
      </Auth0Provider>
    </AppContainer>)
}

const appNode = document.getElementById('app');
ReactDOM.hydrate(getAppWrapper(<App/>), appNode);

if(module.hot && appNode) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.hydrate(getAppWrapper(<NextApp/>), appNode);
  });
}
