import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { MuiThemeProvider } from 'material-ui'
import { getMuiTheme, darkBaseTheme } from 'material-ui/styles'

import configureStore from './store/configureStore'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

import App from './components'

const store = configureStore()
render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
