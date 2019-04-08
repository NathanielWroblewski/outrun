import { WIDTH, HEIGHT } from '../constants/index.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const render = ({ context, x, y, width = WIDTH, height = HEIGHT, fog }) => {
  if (fog < 1) {
    context.globalAlpha = 1 - fog
    context.fillStyle = '#7B3679'
    context.fillRect(x, y, width, height)
    context.globalAlpha = 1
  }
}

export default render
