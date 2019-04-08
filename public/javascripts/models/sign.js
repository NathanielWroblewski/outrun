import Vector from './vector.js'
import Sprite from './sprite.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const WIDTH = 291
const HEIGHT = 797
const SCALE = 0.00075
const X = 1500
const Y = -0.75
const Z = 0

class Sign extends Sprite {
  constructor ({ position, width = WIDTH, height = HEIGHT, scale = SCALE }) {
    super({ position, width, height, scale })

    this.type = 'sign'
    this.position = position || Vector.from([X, Y, Z])
  }
}

export default Sign
