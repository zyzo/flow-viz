import React from 'react'

import '../static/global.scss'

const App = React.createClass({
  render() {
    return (
      <canvas onClick={() => console.log('haha')}>

      </canvas>
    )
  }
})

export default App
