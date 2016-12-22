import React from 'react'
import { AppBar, Drawer, MenuItem } from 'material-ui'
import NavigateBefore from 'material-ui/svg-icons/image/navigate-before'
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
      <div style={{ width: '100%', height: '100%' }}>
        {/* <Drawer open={this.state.drawerOpen} containerClassName="drawer">
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
          <MenuItem
            style={{textAlign: 'center'}}
            onClick={() => this.setState({drawerOpen: false})}>
            <NavigateBefore/>
          </MenuItem>
        </Drawer> */}
        <SVG />
      </div>
    )
  }
})

export default App
