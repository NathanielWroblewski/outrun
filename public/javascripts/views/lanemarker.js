import renderPolygon from './polygon.js'
import { LANES } from '../constants/index.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const LANE_WIDTH = Math.max(32, 8 * LANES)
const MIDDLE_LANE = 2

const laneMarkerWidth = projectedRoadWidth => projectedRoadWidth / LANE_WIDTH

const render = ({ context, closest, furthest, stroke, fill = '#793477', isLight }) => {
  let l1 = laneMarkerWidth(closest.screen.width)
  let l2 = laneMarkerWidth(furthest.screen.width)
  let lanewidth1 = closest.screen.width * 2 / LANES
  let lanewidth2 = furthest.screen.width * 2 / LANES
  let lanex1 = closest.screen.position.x - closest.screen.width + lanewidth1
  let lanex2 = furthest.screen.position.x - furthest.screen.width + lanewidth2

  for (let lane = 1; lane < LANES; lanex1 += lanewidth1, lanex2 += lanewidth2, lane++) {
    const pts = [
      [lanex1 - l1, closest.screen.position.y],
      [lanex1 + l1, closest.screen.position.y],
      [lanex2 + l2, furthest.screen.position.y],
      [lanex2 - l2, furthest.screen.position.y],
    ]

    if (lane === MIDDLE_LANE) {
      renderPolygon({ context, points: pts, stroke, fill: '#F5A6A1' })
      renderPolygon({
        context,
        points: [
          [lanex1 - (l1 / 3), closest.screen.position.y],
          [lanex1 + (l1 / 3), closest.screen.position.y],
          [lanex2 + (l2 / 3), furthest.screen.position.y],
          [lanex2 - (l2 / 3), furthest.screen.position.y],
        ],
        stroke,
        fill
      })
    } else {
      renderPolygon({ context, points: pts, stroke, fill: isLight ? fill : '#F1639E' })
    }
  }
}

export default render
