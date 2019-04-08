const WINDOW = 45
const CHECKPOINTS = 3
const OFFSET = 3

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

class Stopwatch {
  constructor ({ road }) {
    this.time = new Date()
    this.checkpoints = new Array(CHECKPOINTS).fill(0).map((_, index) => {
      return (index * road.segments.length / CHECKPOINTS) + OFFSET
    })
  }

  atCheckpoint (segment) {
    return this.checkpoints.includes(segment.index)
  }

  onTime () {
    return (new Date() - this.time) / 1000 < WINDOW
  }

  outOfTime () {
    return this.remaining < 0
  }

  reset () {
    this.time = new Date()
  }

  get remaining () {
    return WINDOW - Math.round((new Date() - this.time) / 1000)
  }
}

export default Stopwatch
