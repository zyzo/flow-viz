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
      0: {
        x: 123,
        y: 456
      },
      1: {
        x: 421,
        y: 212
      },
      2: {
        x: 30,
        y: 50
      }
    },
    edges: {
      0: {
        src: 1,
        dst: 2
      },
      1: {
        src: 2,
        dst: 0
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
