import { createStore, compose, applyMiddleware, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import sagas from './sagas';

export default function configureStore(enhancers?: Function[]){
  let store: Store;

  const sagaMiddleware = createSagaMiddleware();
  if (enhancers){
    store = createStore(rootReducer, undefined, compose(applyMiddleware(sagaMiddleware), ...enhancers));
  } else {
    store = createStore(rootReducer, undefined, applyMiddleware(sagaMiddleware));
  }
  sagaMiddleware.run(sagas);

  if(module.hot){
    module.hot.accept(()=>{
      const nextRootReducer = require('./reducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
