import Vector from './vector.js'
import Frame from './frame.js'
import Screen from './screen.js'
import { SEGMENT_LENGTH, HEIGHT } from '../constants/index.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const STRIPE_LENGTH = 3

class Segment {
  constructor ({ index, closest, furthest, color, clip = HEIGHT, curve, y0 = 0, y1 = 0 }) {
    this.index = index
    this.curve = curve || 0
    this.isLight = Math.floor(index / STRIPE_LENGTH) % 2
    this.fog = 1
    this.clip = clip
    this.sprites = []
    this.closest = closest || new Frame({
      position: Vector.from([0, y0, index * SEGMENT_LENGTH]),
      camera: Vector.from([0, 0, 0]),
      screen: new Screen({})
    })
    this.furthest = furthest || new Frame({
      position: Vector.from([0, y1, (index + 1) * SEGMENT_LENGTH]),
      camera: Vector.from([0, 0, 0]),
      screen: new Screen({})
    })
    // cars are added here so that we only render relevant cars
    this.cars = []
  }

  addSprite (sprite) {
    this.sprites.push(sprite)
  }

  update (attrs = {}) {
    for (let attr in attrs) {
      this[attr] = attrs[attr]
    }
  }

  updateMidPoints ({ x, y, z, dx }) {
    this.closest.project(Vector.from([x, y, z]))
    this.furthest.project(Vector.from([x - dx, y, z]))
  }

  isBackFaceCulled () {
    return this.furthest.clipHeight >= this.closest.clipHeight
  }

  get incline () {
    return this.furthest.position.y - this.closest.position.y
  }

  isHidden (hillHeight) {
    return (
      this.closest.isBehind() ||
      this.isBackFaceCulled() ||
      this.furthest.isClippedBy(hillHeight)
    )
  }
}

export default Segment
