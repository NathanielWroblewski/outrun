import Car from './car.js'
import { SEGMENT_LENGTH } from '../constants/index.js'

const CAR_COUNT = 200

class Traffic {
  constructor ({ cars, road }) {
    this.cars = []
    this.road = road
  }

  reset () {
    for (let i = 0; i < CAR_COUNT; i++) {
      const z = Math.floor(Math.random() * (this.road.segments.length - 1)) * SEGMENT_LENGTH
      const car = Car.spawn(z)
      const segment = this.road.find(Math.floor(z / SEGMENT_LENGTH))

      segment.cars.push(car)
      this.cars.push(car)
    }
  }

  move ({ playerSegment, ferrari, dt }) {
    for (let i = 0, len = this.cars.length; i < len; i++) {
      const car = this.cars[i]
      const carSegment = this.road.find(Math.floor(car.z / SEGMENT_LENGTH))

      car.move({ carSegment, playerSegment, ferrari, dt, road: this.road })
      this.road.updateCarCache(car, carSegment)
    }
  }
}

export default Traffic
