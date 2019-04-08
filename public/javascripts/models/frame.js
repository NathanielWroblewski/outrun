import Vector from './vector.js'
import { ROAD_WIDTH, CAMERA_DEPTH, WIDTH, HEIGHT } from '../constants/index.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

// Segment -> closest/furthest frame -> camera, position, screen
class Frame {
  constructor ({ position, camera, screen }) {
    this.position = position
    this.camera = camera
    this.screen = screen
  }

  project (camera) {
    this.camera = this.position.subtract(camera)

    this.screen.scale = CAMERA_DEPTH / this.camera.z
    this.screen.width = Math.round(this.screen.scale * ROAD_WIDTH * WIDTH / 2)
    this.screen.position = Vector.from([
      Math.round((WIDTH / 2) + (this.screen.scale * this.camera.x * WIDTH / 2)),
      Math.round((HEIGHT / 2) - (this.screen.scale * this.camera.y * HEIGHT / 2)),
      0
    ])
  }

  isBehind () {
    return this.camera.z <= CAMERA_DEPTH
  }

  isClippedBy (hillHeight) {
    return this.screen.position.y >= hillHeight
  }

  get clipHeight () {
    return this.screen.position.y
  }
}

export default Frame
