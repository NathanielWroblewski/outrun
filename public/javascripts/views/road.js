import renderPolygon from './polygon.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const render = ({ context, closest, furthest, stroke = null, fill = '#793477' }) => {
  const points = [
    [closest.screen.position.x - closest.screen.width, closest.screen.position.y],
    [closest.screen.position.x + closest.screen.width, closest.screen.position.y],
    [furthest.screen.position.x + furthest.screen.width, furthest.screen.position.y],
    [furthest.screen.position.x - furthest.screen.width, furthest.screen.position.y],
  ]

  renderPolygon({ context, points, stroke, fill })
}

export default render
