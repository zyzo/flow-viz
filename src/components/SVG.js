import React from 'react'
import { connect } from 'react-redux'
// does not work with import
const d3 = require('d3')
import FauxDom from 'react-faux-dom'

const dragged = d => {
  console.log('hihi')
  const circle = d3.select(this).classed('dragging', true)

  const dragged = () => {
    circle.raise().attr('cx', d.x = d3.event.x).attr('cy', d.y = d3.event.y)
  }

  const ended = () => {
    circle.classed('dragging', false)
  }

  d3.event.on('drag', dragged).on('end', ended)
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
    console.log(nodes)
    console.log(edges)
    const fauxSVG = FauxDom.createElement('svg')
    const svg = d3
      .select(fauxSVG)
      .attr('width', '100%')
      .attr('height', '100%')

    const simulation = d3.forceSimulation(nodes)
      .nodes(nodes)
      .force('link', d3.forceLink(edges).id(d => d.index))
      .force('charge', d3.forceManyBody())
      .force('center',
        d3.forceCenter(svg.attr('width') / 2, svg.attr('height') / 2))

    const link = svg
      .selectAll('line')
      .data(edges)
      .enter()
      .append('line')
      .attr('stroke', '#f38282')

    const node = svg
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('stroke', '#ec4d4d')
      .attr('stroke-width', '2')
      .attr('class', 'node')
      .attr('fill', '#ec4d4d')
      .attr('r', 2.5)

    const ticked = () => {
      console.log('ticked')
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)
      node
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
    }

    // tick
    simulation.nodes(nodes).on('tick', ticked)
    simulation.force('link').links(edges)
    ticked()

    // drag
    const dragstarted = d => {
      console.log('dragstarted')
      if (!d3.event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    const dragged = d => {
      console.log('dragged')
      d.fx = d3.event.x
      d.fy = d3.event.y
    }

    const dragended = d => {
      console.log('drag ended')
      if (!d3.event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    node.call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended))

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
