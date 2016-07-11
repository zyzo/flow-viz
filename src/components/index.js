import React from 'react'
import { AppBar } from 'material-ui'

import SVG from './SVG.js'

import '../static/global.scss'

const App = React.createClass({
  render() {
    return (
      <div>
        <AppBar
          title="Flow Visualization"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <SVG />
      </div>
    )
  }
})

export default App
