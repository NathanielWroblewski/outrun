import renderPolygon from './polygon.js'
import { WIDTH, LANES } from '../constants/index.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const shoulderWidth = projectedRoadWidth => projectedRoadWidth / Math.max(6, 2 * LANES)

const render = ({ context, closest, furthest, fill = '#F1639E' }) => {
  const r1 = shoulderWidth(closest.screen.width)
  const r2 = shoulderWidth(furthest.screen.width)

  // left shoulder
  renderPolygon({
    context,
    points: [
      [closest.screen.position.x - closest.screen.width - r1, closest.screen.position.y],
      [closest.screen.position.x - closest.screen.width, closest.screen.position.y],
      [furthest.screen.position.x - furthest.screen.width, furthest.screen.position.y],
      [furthest.screen.position.x - furthest.screen.width - r2, furthest.screen.position.y],
    ],
    stroke: null,
    fill
  })

  // right shoulder
  renderPolygon({
    context,
    points: [
      [closest.screen.position.x + closest.screen.width + r1, closest.screen.position.y],
      [closest.screen.position.x + closest.screen.width, closest.screen.position.y],
      [furthest.screen.position.x + furthest.screen.width, furthest.screen.position.y],
      [furthest.screen.position.x + furthest.screen.width + r2, furthest.screen.position.y],
    ],
    stroke: null,
    fill
  })
}

export default render
