import Vector from './vector.js'
import Sprite from './sprite.js'
import Collision from './collision.js'
import { percentRemaining, increase } from '../utilities/index.js'
import { MAX_SPEED, DRAW_DISTANCE, SEGMENT_LENGTH } from '../constants/index.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const LOOKAHEAD = 20
const COURSE_CORRECTION = 0.05
const Y = -1

const CARS = {
  oncoming: [
    { type: 'oncoming1', width: 38, height: 33, scale: 0.00675 },
    { type: 'oncoming2', width: 34, height: 34, scale: 0.00675 },
    { type: 'oncoming3', width: 34, height: 27, scale: 0.00675 },
    { type: 'oncoming4', width: 34, height: 29, scale: 0.00675 },
    { type: 'oncoming5', width: 34, height: 30, scale: 0.00675 },
    { type: 'oncoming6', width: 36, height: 37, scale: 0.00675 },
    { type: 'oncoming7', width: 36, height: 33, scale: 0.00675 },
  ],
  outgoing: [
    { type: 'outgoing1', width: 34, height: 29, scale: 0.00675 },
    { type: 'outgoing2', width: 36, height: 32, scale: 0.00675 },
    { type: 'outgoing3', width: 36, height: 31, scale: 0.00675 },
    { type: 'outgoing4', width: 34, height: 33, scale: 0.00675 },
    { type: 'outgoing5', width: 63, height: 34, scale: 0.0045 },
    { type: 'outgoing6', width: 52, height: 46, scale: 0.0045 },
    { type: 'outgoing7', width: 40, height: 48, scale: 0.01125 },
  ],
}

const sample = (array) => array[Math.floor(Math.random() * array.length)]

class Car extends Sprite {
  constructor ({ oncoming, position, velocity }) {
    const { type, width, height, scale } = oncoming ?
      sample(CARS.oncoming) :
      sample(CARS.outgoing)

    super({ position, width, height, scale })

    this.type = type
    this.oncoming = !!oncoming
    this.velocity = velocity
    this.percent = 0
    this.isPlayer = false
  }

  steer ({ carSegment, playerSegment, road, ferrari }) {
    if (this.oncoming) {
      return this.stayInOncomingLane()
    }

    if (carSegment.index - playerSegment.index > DRAW_DISTANCE) {
      return
    }

    for (let i = 1; i < LOOKAHEAD; i++) {
      const segment = road.find(carSegment.index + i)

      if (segment === playerSegment && Collision.isBetween(this, ferrari)) {
        return this.position.x = this.x + Collision.reflect(this, ferrari, i)
      }

      for (let j = 0, len = segment.cars.length; j < len; j++) {
        const otherCar = segment.cars[j]

        if (Collision.isBetween(this, otherCar)) {
          return this.position.x = this.x + Collision.reflect(this, ferrari, i)
        }
      }
    }

    this.stayInOutgoingLane()
  }

  move ({ carSegment, playerSegment, road, ferrari, dt }) {
    this.steer({ carSegment, playerSegment, road, ferrari })
    this.accelerate({ dt, road })
    this.percent = percentRemaining(this.z, SEGMENT_LENGTH)
  }

  accelerate ({ dt, road }) {
    const direction = this.oncoming ? -1 : 1

    this.position.z = increase(this.z, direction * dt * this.velocity.z, road.trackLength)
  }

  stayInOncomingLane () {
    if (this.x > -0.1) {
      this.position.x = this.x - COURSE_CORRECTION
    } else if (this.x < -0.9) {
      this.position.x = this.x + COURSE_CORRECTION
    }
  }

  stayInOutgoingLane () {
    if (this.x < 0.1) {
      this.position.x = this.x + COURSE_CORRECTION
    } else if (this.x > 0.9) {
      this.position.x = this.x - COURSE_CORRECTION
    }
  }

  isPlayer () {
    return false
  }

  static spawn (z) {
    const oncoming = Math.random() < 0.5
    const direction = oncoming ? -1 : 1
    const x = (direction * Math.random() * 0.6) + (direction * 0.2)
    const position = Vector.from([x, Y, z])
    const velocity = Vector.from([
      0, 0, Math.max(MAX_SPEED / 4 + Math.random() * MAX_SPEED / 2, 5000) / (oncoming ? 1.5 : 1)
    ])

    return new Car({ oncoming, position, velocity })
  }
}

export default Car
