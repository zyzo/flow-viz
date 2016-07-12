import React from 'react'
import { AppBar, Drawer, MenuItem } from 'material-ui'

import SVG from './SVG.js'

import '../static/global.scss'

const App = React.createClass({
  getInitialState() {
    return {
      drawerOpen: true
    }
  },
  render() {
    return (
      <div>
        <Drawer open={this.state.drawerOpen} containerClassName="drawer">
          <AppBar
            className="app-bar"
            title="Flow Viz"
            iconStyleLeft={{display: 'none'}}
            style={{
              paddingLeft: '12px'
            }}
            onLeftIconButtonTouchTap={() => this.setState({drawerOpen: true})}
          />
          <MenuItem>Graph</MenuItem>
          <MenuItem>Code</MenuItem>
        </Drawer>

        <SVG />
      </div>
    )
  }
})

export default App
