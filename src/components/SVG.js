import React from 'react'
import { connect } from 'react-redux'
// does not work with import
const d3 = require('d3')
import FauxDom from 'react-faux-dom'

const ticked = () => {
  console.log('hahaha')
}

const nodeToD3Node = (node, nodeId) => ({
  index: nodeId,
  x: node.get('x'),
  y: node.get('y')
})
const edgeToD3Link = (edge, edgeId) => ({
  index: edgeId,
  source: edge.get('src'),
  target: edge.get('dst')
})

const SVG = React.createClass({
  render() {
    const nodes = this.props.nodes.toArray().map(nodeToD3Node)
    const edges = this.props.edges.toArray().map(edgeToD3Link)
    const fauxSVG = FauxDom.createElement('svg')
    const svg = d3
      .select(fauxSVG)
      .attr('width', '100%')
      .attr('height', '100%')
    d3.forceSimulation(nodes)
      .nodes(nodes)
      .force('link', d3.forceLink(edges))
      .on('tick', ticked)

    svg.selectAll('path')
      .data(edges)
      .enter()
      .append('path')
      .attr('d', d => {
        const source = nodes[d.source.index]
        const target = nodes[d.target.index]
        return `M ${source.x} ${source.y} L ${target.x} ${target.y}`
      })
      .attr('stroke', '#f38282')

    svg
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('stroke', '#ec4d4d')
      .attr('stroke-width', '2')
      .attr('fill', '#ec4d4d')
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
