import { WIDTH, ROAD_WIDTH } from '../constants/index.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const IMG = {
  palm:           document.querySelector('.palm'),
  sign:           document.querySelector('.sign'),
  oncoming1:      document.querySelector('.oncoming1'),
  oncoming2:      document.querySelector('.oncoming2'),
  oncoming3:      document.querySelector('.oncoming3'),
  oncoming4:      document.querySelector('.oncoming4'),
  oncoming5:      document.querySelector('.oncoming5'),
  oncoming6:      document.querySelector('.oncoming6'),
  oncoming7:      document.querySelector('.oncoming7'),
  outgoing1:      document.querySelector('.outgoing1'),
  outgoing2:      document.querySelector('.outgoing2'),
  outgoing3:      document.querySelector('.outgoing3'),
  outgoing4:      document.querySelector('.outgoing4'),
  outgoing5:      document.querySelector('.outgoing5'),
  outgoing6:      document.querySelector('.outgoing6'),
  outgoing7:      document.querySelector('.outgoing7'),
  left:           document.querySelector('.left'),
  right:          document.querySelector('.right'),
  straight:       document.querySelector('.straight'),
  up:             document.querySelector('.up'),
  up_left:        document.querySelector('.upleft'),
  up_right:       document.querySelector('.upright'),
  left_brake:     document.querySelector('.left-brake'),
  right_brake:    document.querySelector('.right-brake'),
  straight_brake: document.querySelector('.straight-brake'),
  up_brake:       document.querySelector('.up-brake'),
  up_left_brake:  document.querySelector('.upleft-brake'),
  up_right_brake: document.querySelector('.upright-brake'),
}

const render = ({
  context, type, width, height, scale, x, y, xoffset = 0, yoffset = 0, clipy = 0, alpha = 1
}) => {
  const destwidth = width * scale * WIDTH / 2 * ROAD_WIDTH
  const destheight = height * scale * WIDTH / 2 * ROAD_WIDTH

  let destx = x + (destwidth * xoffset)
  let desty = y + (destheight * yoffset)

  const clipheight = clipy ? Math.max(0, desty + destheight - clipy) : 0

  if (clipheight < destheight) {
    context.globalAlpha = alpha
    context.drawImage(
      IMG[type], 0, 0, width, height - (height * clipheight / destheight),
      destx, desty, destwidth, destheight - clipheight
    )
    context.globalAlpha = 1
  }
}

export default render
