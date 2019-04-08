// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const render = ({ context, points = [], stroke, fill }) => {
  const [head, ...tail] = points

  if (stroke) {
    context.lineWidth = 0.5
    context.strokeStyle = stroke
  }

  if (fill) {
    context.fillStyle = fill
  }

  context.beginPath()
  context.moveTo(head[0], head[1])
  tail.forEach(([x, y]) => context.lineTo(x, y))

  context.closePath()

  if (fill) {
    context.fill()
  }
  if (stroke) {
    context.stroke()
  }
}

export default render
