// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)
export const percentRemaining = (value, total) => (value % total) / total
export const exponentialFog = (distance, density) => (
  1 / Math.pow(Math.E, (distance * distance * density))
)
export const interpolate = (a, b, percent) => a + (b - a) * percent
export const accelerate = (speed, accel, dt) => speed + (accel * dt)
export const increase = (start, increment, max) => {
  let result = start + increment;
  while (result >= max) result -= max
  while (result < 0) result += max
  return result
}

export const overlap = (x1, w1, x2, w2, percent = 1) => {
  const half = percent / 2
  const halfw1 = (w1 * half)
  const halfw2 = (w2 * half)
  const min1 = x1 - halfw1
  const max1 = x1 + halfw1
  const min2 = x2 - halfw2
  const max2 = x2 + halfw2

  return !(max1 < min2 || min1 > max2)
}

export const reanimate = (element, classname) => {
  element.classList.remove(classname)
  void element.offsetWidth // trigger re-paint
  element.classList.add(classname)
}

export const EASE = {
  in: (a, b, percent) => a + (b - a) * Math.pow(percent, 2),
  out: (a, b, percent) => a + (b - a) * (1 - Math.pow(1 - percent, 2)),
  inout: (a, b, percent) => a + (b - a) * ((-Math.cos(percent * Math.PI) / 2) + 0.5)
}
