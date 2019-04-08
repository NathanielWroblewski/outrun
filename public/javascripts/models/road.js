import Segment from './segment.js'
import Traffic from './traffic.js'
import Palm from './palm.js'
import Sign from './sign.js'
import Course from './course.js'
import { SEGMENT_LENGTH } from '../constants/index.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

class Road {
  constructor ({ segments = [] }) {
    this.segments = segments

    if (!this.segments.length) {
      this.reset()
    }

    this.trackLength = this.segments.length * SEGMENT_LENGTH
  }

  updateCarCache (car, oldSegment) {
    // Add car to new Segment for rendering
    const newSegment = this.find(Math.floor(car.z / SEGMENT_LENGTH))

    if (oldSegment != newSegment) {
      const index = oldSegment.cars.indexOf(car)

      oldSegment.cars.splice(index, 1)
      newSegment.cars.push(car)
    }
  }

  reset () {
    Course.generate(this)

    for (let index = 10; index < this.segments.length; index += 24 + Math.floor(index / 100)) {
      const segment = this.segments[index]

      segment.addSprite(new Palm({}))

      if (Math.random() < 0.08) {
        segment.addSprite(new Sign({}))
      }
    }

    this.traffic = new Traffic({ road: this })
    this.traffic.reset()
  }

  find (index) {
    return this.segments[index % this.segments.length]
  }

  addSegment ({ curve, y = 0 }) {
    const index = this.segments.length
    const segment = new Segment({ index, curve, y0: this.ylast(), y1: y })

    this.segments.push(segment)
  }

  ylast () {
    if (this.segments.length) {
      return this.segments[this.segments.length - 1].furthest.position.y
    }

    return 0
  }
}

export default Road


