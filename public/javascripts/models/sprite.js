import Vector from './vector.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

class Sprite {
  constructor ({ position, width = 0, height = 0, scale = 0 }) {
    this.position = position || Vector.from([0, 0, 0])
    this.width = width
    this.height = height
    this.scale = scale
  }

  get x () {
    return this.position.x
  }

  get y () {
    return this.position.y
  }

  get z () {
    return this.position.z
  }
}

export default Sprite
