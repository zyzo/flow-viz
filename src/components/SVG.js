import React from 'react'
// does not work with import
const d3 = require('d3')
import FauxDom from 'react-faux-dom'

const SVG = React.createClass({
  render() {
    const fauxSVG = FauxDom.createElement('svg')
    const svg = d3.select(fauxSVG)
    svg.append('path')
      .style('fill', 'none')
      .style('stroke', 'red')
      .style('stroke-width', 1)
    return svg.node().toReact()
  }
})

export default SVG
