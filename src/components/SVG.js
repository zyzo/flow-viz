import React from 'react'
import { connect } from 'react-redux'
// does not work with import
const d3 = require('d3')
import FauxDom from 'react-faux-dom'

const SVG = React.createClass({
  render() {
    const {
      nodes, edges
    } = this.props
    const fauxSVG = FauxDom.createElement('svg')
    const svg = d3.select(fauxSVG)
    d3.forceSimulation()
      .nodes(nodes.toJS())
      .link(edges.toJS())
      .size(600, 600)
    svg.append('path')
      .style('fill', 'none')
      .style('stroke', 'red')
      .style('stroke-width', 1)
    return svg.node().toReact()
  }
})

const mapStateToProps = state => (
  {
    nodes: state.get('nodes'),
    edges: state.get('edges')
  }
)
export default connect(
  mapStateToProps
)(SVG)
