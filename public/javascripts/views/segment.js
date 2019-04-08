import renderPolygon from './polygon.js'
import renderFog from './fog.js'
import renderGround from './ground.js'
import renderRoad from './road.js'
import renderShoulders from './shoulders.js'
import renderLaneMarkers from './lanemarker.js'
import { WIDTH } from '../constants/index.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const render = ({ context, segment, isCheckpoint }) => {
  const { closest, furthest, fog, isLight } = segment

  renderGround({ context, closest, furthest })
  renderRoad({ context, closest, furthest, fill: isCheckpoint ? '#F1639E' : '#793477' })
  renderShoulders({ context, closest, furthest })

  if (!isCheckpoint) {
    renderLaneMarkers({ context, closest, furthest, isLight })
  }

  renderFog({
    context,
    fog,
    x: 0,
    y: closest.screen.position.y,
    width: WIDTH || closest.screen.width,
    height: furthest.screen.position.y - closest.screen.position.y,
  })
}

export default render
