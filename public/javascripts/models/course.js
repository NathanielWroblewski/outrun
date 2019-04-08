import { SEGMENT_LENGTH } from '../constants/index.js'
import { EASE } from '../utilities/index.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const ROAD = {
  LENGTH: { NONE: 0, SHORT:  25, MEDIUM:   50, LONG:  100 },
  HILL:   { NONE: 0, LOW:    20, MEDIUM:   40, HIGH:   60 },
  CURVE:  { NONE: 0, EASY:    2, MEDIUM:    4, HARD:    6 }
}

class Course {
  static generate (road) {
    this.addStraight(road, ROAD.LENGTH.SHORT)
    this.addLowRollingHills(road, {})
    this.addSCurves(road)
    this.addCurve(road, { num: ROAD.LENGTH.MEDIUM, curve: ROAD.CURVE.MEDIUM, height: ROAD.HILL.LOW })
    this.addBumps(road)
    this.addLowRollingHills(road, {})
    this.addCurve(road, { num: ROAD.LENGTH.LONG*2, curve: ROAD.CURVE.MEDIUM, height: ROAD.HILL.MEDIUM })
    this.addStraight(road)
    this.addHill(road, { num: ROAD.LENGTH.MEDIUM, height: ROAD.HILL.HIGH })
    this.addSCurves(road)
    this.addCurve(road, { num: ROAD.LENGTH.LONG, curve: -ROAD.CURVE.MEDIUM, height: ROAD.HILL.NONE })
    this.addHill(road, { num: ROAD.LENGTH.LONG, height: ROAD.HILL.HIGH })
    this.addCurve(road, { num: ROAD.LENGTH.LONG, curve: ROAD.CURVE.MEDIUM, height: -ROAD.HILL.LOW })
    this.addBumps(road)
    this.addHill(road, { num: ROAD.LENGTH.LONG, height: -ROAD.HILL.MEDIUM })
    this.addStraight(road)
    this.addSCurves(road)
    this.addEnd(road)
  }

  static addStretch (road, { enter, hold, leave, curve = 0, y = 0 }) {
    const ystart = road.ylast()
    const yend = ystart + ((parseInt(y, 10) || 0) * SEGMENT_LENGTH)
    const total = enter + hold + leave

    for (let n = 0; n < enter; n++) {
      road.addSegment({
        curve: EASE.in(0, curve, n / enter),
        y: EASE.inout(ystart, yend, n / total)
      })
    }

    for (let n = 0; n < hold; n++) {
      road.addSegment({ curve, y: EASE.inout(ystart, yend, (enter + n) / total) })
    }

    for (let n = 0; n < leave; n++) {
      road.addSegment({
        curve: EASE.inout(curve, 0, n / leave),
        y: EASE.inout(ystart, yend, (enter + hold + n) / total)
      })
    }
  }

  static addStraight (road, num = ROAD.LENGTH.MEDIUM) {
    this.addStretch(road, { enter: num, hold: num, leave: num, curve: 0, y: 0 })
  }

  static addCurve (road, { num = ROAD.LENGTH.MEDIUM, curve = ROAD.CURVE.MEDIUM, height = ROAD.HILL.NONE }) {
    this.addStretch(road, { enter: num, hold: num, leave: num, curve, y: height })
  }

  static addHill(road, { num = ROAD.LENGTH.MEDIUM, height = ROAD.HILL.MEDIUM }) {
    this.addStretch(road, { enter: num, hold: num, leave: num, curve: 0, y: height })
  }

  static addLowRollingHills (road, { num = ROAD.LENGTH.SHORT, height = ROAD.HILL.LOW }) {
    this.addStretch(road, { enter: num, hold: num, leave: num, curve: 0, y: height / 2 })
    this.addStretch(road, { enter: num, hold: num, leave: num, curve: 0, y: -height })
    this.addStretch(road, { enter: num, hold: num, leave: num, curve: 0, y: height })
    this.addStretch(road, { enter: num, hold: num, leave: num, curve: 0, y: 0 })
    this.addStretch(road, { enter: num, hold: num, leave: num, curve: 0, y: -height / 2 })
    this.addStretch(road, { enter: num, hold: num, leave: num, curve: 0, y: 0 })
  }

  static addSCurves(road) {
    this.addStretch(road, {
      enter:  ROAD.LENGTH.MEDIUM,
      hold:   ROAD.LENGTH.MEDIUM,
      leave:  ROAD.LENGTH.MEDIUM,
      curve: -ROAD.CURVE.EASY,
      y:      ROAD.HILL.NONE
    })
    this.addStretch(road, {
      enter:  ROAD.LENGTH.MEDIUM,
      hold:   ROAD.LENGTH.MEDIUM,
      leave:  ROAD.LENGTH.MEDIUM,
      curve:  ROAD.CURVE.MEDIUM,
      y:      ROAD.HILL.MEDIUM
    })
    this.addStretch(road, {
      enter:  ROAD.LENGTH.MEDIUM,
      hold:   ROAD.LENGTH.MEDIUM,
      leave:  ROAD.LENGTH.MEDIUM,
      curve:  ROAD.CURVE.EASY,
      y:     -ROAD.HILL.LOW
    })
    this.addStretch(road, {
      enter:  ROAD.LENGTH.MEDIUM,
      hold:   ROAD.LENGTH.MEDIUM,
      leave:  ROAD.LENGTH.MEDIUM,
      curve: -ROAD.CURVE.EASY,
      y:      ROAD.HILL.MEDIUM
    })
    this.addStretch(road, {
      enter:  ROAD.LENGTH.MEDIUM,
      hold:   ROAD.LENGTH.MEDIUM,
      leave:  ROAD.LENGTH.MEDIUM,
      curve: -ROAD.CURVE.MEDIUM,
      y:     -ROAD.HILL.MEDIUM - ROAD.HILL.LOW
    })
  }

  static addBumps(road) {
    this.addStretch(road, { enter: 10, hold: 10, leave: 10, curve: 0, y:  5 })
    this.addStretch(road, { enter: 10, hold: 10, leave: 10, curve: 0, y: -2 })
    this.addStretch(road, { enter: 10, hold: 10, leave: 10, curve: 0, y: -5 })
    this.addStretch(road, { enter: 10, hold: 10, leave: 10, curve: 0, y:  8 })
    this.addStretch(road, { enter: 10, hold: 10, leave: 10, curve: 0, y:  5 })
    this.addStretch(road, { enter: 10, hold: 10, leave: 10, curve: 0, y: -7 })
    this.addStretch(road, { enter: 10, hold: 10, leave: 10, curve: 0, y:  5 })
    this.addStretch(road, { enter: 10, hold: 10, leave: 10, curve: 0, y: -7 })
  }

  static addEnd (road, num = 200) {
    this.addStretch(road, {
      enter: num,
      hold: num,
      leave: num,
      curve: -ROAD.CURVE.EASY,
      y: -road.ylast() / SEGMENT_LENGTH - 1
    })
  }
}

export default Course
