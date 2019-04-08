import { increase } from '../utilities/index.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

class Camera {
  constructor ({ position = 0 }) {
    this.position = position
  }

  advance ({ amount, max }) {
    this.position = increase(this.position, amount, max)
  }
}

export default Camera
