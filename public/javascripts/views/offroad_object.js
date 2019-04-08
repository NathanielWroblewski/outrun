import renderSprite from './sprite.js'
import { clamp } from '../utilities/index.js'
import { ROAD_WIDTH, WIDTH } from '../constants/index.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const render = ({ context, sprite, segment, distance }) => {
  const { type, width, height } = sprite
  const scale = segment.closest.screen.scale * sprite.scale
  const x = segment.closest.screen.position.x + (
    scale * sprite.x * ROAD_WIDTH * WIDTH / 2
  )
  const y = segment.closest.screen.position.y

  renderSprite({
    context, type, width, height, scale, x, y,
    xoffset: clamp(sprite.x, -1, 0), yoffset: sprite.y, clipy: segment.clip,
    alpha: 1 - Math.pow(distance, 3)
  })
}

export default render
