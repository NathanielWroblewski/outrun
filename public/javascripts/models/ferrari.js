import Vector from './vector.js'
import Sprite from './sprite.js'
import { clamp, accelerate } from '../utilities/index.js'
import { CAMERA_HEIGHT, CAMERA_DEPTH, MAX_SPEED, CENTRIFUGAL } from '../constants/index.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const WIDTH = 80
const INCLINE_HEIGHT = 45
const LEVEL_HEIGHT = 41
const SCALE = 0.00375
const X = 0
const Y = 0
const Z = CAMERA_HEIGHT * CAMERA_DEPTH
const OFF_ROAD = {
  MIN_SPEED: MAX_SPEED / 4,
  PENALTY: -MAX_SPEED / 2,
}

class Ferrari extends Sprite {
  constructor ({ width = WIDTH, height = LEVEL_HEIGHT, scale = SCALE, position, velocity, acceleration }) {
    super({ position, width, height, scale })

    this.position = position || Vector.from([X, Y, Z])
    this.velocity = velocity || Vector.from([0, 0, 0])
    this.acceleration = acceleration || Vector.from([0, 0, 0])
    this.braking = false
    this.oncoming = false
    this.isPlayer = true
    // Left and right are purposefully split out instead of using a single field
    // with values like -1, 0, 1 since players often have both keys pressed at
    // once when transition from side to side
    this.left = false
    this.right = false
  }

  getType (incline) {
    let type

    if (this.left) {
      type = incline > 0 ? 'up_left' : 'left'
    } else if (this.right) {
      type = incline > 0 ? 'up_right' : 'right'
    } else {
      type = incline > 0 ? 'up' : 'straight'
    }

    return this.braking ? `${type}_brake` : type
  }

  getHeight (incline) {
    return this.getType(incline).startsWith('up') ? INCLINE_HEIGHT : LEVEL_HEIGHT
  }

  drive (dt) {
    let speed = this.braking ? -MAX_SPEED : MAX_SPEED / 5

    this.velocity.z = accelerate(this.velocity.z, speed, dt)

    if (this.isOffRoad()) {
      if (this.velocity.z > OFF_ROAD.MIN_SPEED) {
        this.velocity.z = accelerate(this.velocity.z, OFF_ROAD.PENALTY, dt)
      }
    }
  }

  crash (dt) {
    this.velocity.z = this.velocity.z / 4
  }

  boundVelocity () {
    this.velocity.z = clamp(this.velocity.z, 0, MAX_SPEED)
  }

  isOffRoad () {
    return Math.abs(this.position.x) >= 1
  }

  hardLeft (value = false) {
    this.left = value
  }

  hardRight (value = false) {
    this.right = value
  }

  brake (value = false) {
    this.braking = value
  }

  turn (segment, dx) {
    if (this.left) {
      this.position.x = this.position.x - dx
    } else if (this.right) {
      this.position.x = this.position.x + dx
    }
    this.position.x = this.position.x - (dx * this.rate * segment.curve * CENTRIFUGAL)
    this.position.x = clamp(this.position.x, -3, 3) // stay in-bounds
  }

  get rate () {
    return this.velocity.z / MAX_SPEED
  }
}

export default Ferrari
