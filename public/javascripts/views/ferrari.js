import renderSprite from './sprite.js'
import { interpolate, percentRemaining } from '../utilities/index.js'
import { HEIGHT, WIDTH, RESOLUTION, MAX_SPEED, SEGMENT_LENGTH, CAMERA_DEPTH } from '../constants/index.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const bounce = ferrari => {
  const percentOfMax = ferrari.velocity.z / MAX_SPEED
  const direction = [-1, 1][Math.round(Math.random())]

  return 1.5 * Math.random() * percentOfMax * RESOLUTION * direction
}

const render = ({ context, camera, ferrari, segment, incline }) => {
  const bump = bounce(ferrari)
  const type = ferrari.getType(incline)
  const height = ferrari.getHeight(incline)
  const scale = CAMERA_DEPTH / (ferrari.z || 1)
  const x = WIDTH / 2
  const y = Math.max((HEIGHT / 2) - (scale * (HEIGHT / 2) * interpolate(
    segment.closest.camera.y,
    segment.furthest.camera.y,
    percentRemaining(camera.position + ferrari.z, SEGMENT_LENGTH)
  )) + bump, 765)

  renderSprite({
    context, type, height, x, y,
    scale: scale * ferrari.scale,
    width: ferrari.width,
    xoffset: -0.5,
    yoffset: -1,
    alpha: 1
  })
}

export default render
