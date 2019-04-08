import { HEIGHT, WIDTH } from '../constants/index.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const IMG_WIDTH = 3836
const IMG_HEIGHT = 1080
const IMG = document.querySelector('.mountains')

const render = ({ context, layer = { w: IMG_WIDTH, h: IMG_HEIGHT, x: 0, y: 2 }, width = WIDTH, height = HEIGHT, rotation = 0, offset = 0 }) => {
  const imgwidth = layer.w / 4
  const imgheight = layer.h

  const srcx = layer.x + Math.floor(layer.w * rotation)
  const srcy = layer.y + 80 + offset
  const srcwidth = Math.min(imgwidth, layer.x + layer.w - srcx)
  const srcheight = imgheight

  const destx = 0
  const desty = 0
  const destwidth = Math.floor(width * srcwidth / imgwidth)
  const destheight = height

  context.drawImage(
    IMG,
    srcx, srcy, srcwidth, srcheight,
    destx, desty, destwidth, destheight
  )

  if (srcwidth < imgwidth) {
    context.drawImage(
      IMG,
      layer.x, srcy,
      imgwidth - srcwidth,
      srcheight,
      destwidth - 1,
      desty,
      width - destwidth,
      destheight
    )
  }
}

export default render
