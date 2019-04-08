import { WIDTH } from '../constants/index.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

class Screen {
  constructor ({ scale = 1, position = 0, width = WIDTH }) {
    this.scale = scale
    this.position = position
    this.width = width
  }
}

export default Screen
