import { overlap } from '../utilities/index.js'
import { MAX_SPEED } from '../constants/index.js'
// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const MODIFIERS = {
  cpu_to_cpu: 0.6,
  player: 1.1,
  headon: 1
}

class Collision {
  static involvesPlayer (car, vehicle) {
    return car.isPlayer || vehicle.isPlayer
  }

  static any ({ cars, ferrari, oncomingOnly = false }) {
    for (let i = 0, len = cars.length; i < len; i++) {
      const car = cars[i]

      if (Collision.isBetween(ferrari, car) && (oncomingOnly ? car.oncoming : true)) {
        return true
      }
    }

    return false
  }

  static isBetween (car, vehicle, scale) {
    return overlap(
      car.x, car.width * car.scale,
      vehicle.x, vehicle.width * vehicle.scale,
      this.range(car, vehicle)
    )
  }

  static range (car, vehicle) {
    const ferrariInvolved = this.involvesPlayer(car, vehicle)

    if (this.involvesPlayer(car, vehicle)) {
      return this.isHeadOn(car, vehicle) ? MODIFIERS.headon : MODIFIERS.player
    }

    return MODIFIERS.cpu_to_cpu
  }

  static direction (car, vehicle) {
    if (car.x > 0.5) {
      return -1
    } else if (car.x < -0.5) {
      return 1
    } else {
      return car.x > vehicle.x ? 1 : -1
    }
  }

  static isHeadOn (car, vehicle) {
    return car.oncoming ? !vehicle.oncoming : vehicle.oncoming
  }

  // the closer the cars (smaller closeness) and greater the speed ratio, the
  // larger the offset
  static reflect (car, vehicle, closeness) {
    if (this.isHeadOn(car, vehicle)) {
      return -1 * this.direction(car, vehicle) / closeness * (car.velocity.z + vehicle.velocity.z) / MAX_SPEED
    } else {
      return this.direction(car, vehicle) / closeness * (car.velocity.z - vehicle.velocity.z) / MAX_SPEED
    }
  }
}

export default Collision
