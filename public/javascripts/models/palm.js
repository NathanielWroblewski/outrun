import Vector from './vector.js'
import Sprite from './sprite.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const WIDTH = 581
const HEIGHT = 1024
const SCALE = 0.005
const TYPE = 'palm'
const Y = -1
const Z = 0

const generatePosition = () => {
  const direction = Math.random() < 0.5 ? -1 : 1
  const x = direction * (Math.random() * 3000) + direction

  return Vector.from([x, Y, Z])
}

class Palm extends Sprite {
  constructor ({ position, width = WIDTH, height = HEIGHT, scale = SCALE }) {
    super({ position, width, height, scale })

    this.type = TYPE
    this.position = position || generatePosition()
  }
}

export default Palm
