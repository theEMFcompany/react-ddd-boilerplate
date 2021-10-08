import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';
import { AppContainer } from "react-hot-loader";

import {Provider} from 'react-redux';
import configureStore from './config/store';

import App from './App';

const store = configureStore();

interface Props {
  req: {
    url: string;
  },
  context: Record<string, unknown>
}
export default function (props: Props) {
  return(
    <AppContainer>
      <Provider store={store}>
        <Router location={props.req.url} context={props.context}>
          <App url={props.req.url}/>
        </Router>
    </Provider>
    </AppContainer>
  )
}
