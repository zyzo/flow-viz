import React from 'react'
import { connect } from 'react-redux'
// does not work with import
const d3 = require('d3')
import FauxDom from 'react-faux-dom'

const ticked = () => {
  console.log('hahaha')
}
const SVG = React.createClass({
  render() {
    const nodes = this.props.nodes.toArray().map(item => item.toJS())
    const edges = this.props.edges.toArray().map(item => item.toJS())
    const fauxSVG = FauxDom.createElement('svg')
    const svg = d3
      .select(fauxSVG)
      .attr('width', '100%')
      .attr('height', '100%')
    d3.forceSimulation(nodes)
      .force('link', d3.forceLink(edges))
      .nodes(nodes)
      .on('tick', ticked)

    svg
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('cx', function (d) { return d.x })
      .attr('cy', function (d) { return d.y })
      .attr('r', 12)
      .style('fill', function(d) { return d.color })
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
