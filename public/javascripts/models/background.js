import { increase } from '../utilities/index.js'
import { RESOLUTION } from '../constants/index.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

class Background {
  constructor ({ offset = 0, rate = 0.0005 }) {
    this.offset = offset
    this.rate = rate
  }

  rotate (amount) {
    this.offset = increase(this.offset, this.rate * amount, 1)
  }

  tilt (y) {
    return RESOLUTION * this.rate * y
  }
}

export default Background
