import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import immutable from 'immutable'

import rootReducer from '../reducers'

const loggerMiddleware = createLogger({
  stateTransformer: state => state && state.toJS()
})

const defaultInitialState = immutable.fromJS(
  {
    nodes: {
      1: {
        x: 123,
        y: 456,
        id: 1
      },
      2: {
        x: 421,
        y: 212,
        id: 2
      },
      3: {
        x: 12,
        y: 700,
        id: 3
      }
    },
    edges: {
      0: {
        src: 1,
        dst: 2
      },
      1: {
        src: 2,
        dst: 3
      }
    }
  }
)

export default function configureStore(initialState = defaultInitialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      loggerMiddleware
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
