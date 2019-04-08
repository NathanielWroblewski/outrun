import renderSprite from './sprite.js'
import { interpolate } from '../utilities/index.js'
import { ROAD_WIDTH, WIDTH } from '../constants/index.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const render = ({ context, car, segment }) => {
  const { type, width, height, percent } = car
  const scale = interpolate(
    segment.closest.screen.scale,
    segment.furthest.screen.scale,
    percent
  )
  const x = interpolate(
    segment.closest.screen.position.x,
    segment.furthest.screen.position.x,
    percent
  ) + (scale * car.x * ROAD_WIDTH * WIDTH / 2)
  const y = interpolate(
    segment.closest.screen.position.y,
    segment.furthest.screen.position.y,
    percent
  )

  renderSprite({
    context, type, width, height, scale: scale * car.scale, x, y,
    xoffset: -0.5, yoffset: car.y, clipy: segment.clip
  })
}

export default render
