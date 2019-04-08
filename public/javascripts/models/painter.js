import renderCar from '../views/car.js'
import renderOffroadObject from '../views/offroad_object.js'
import renderFerrari from '../views/ferrari.js'
import renderSegment from '../views/segment.js'
import renderMountains from '../views/mountains.js'
import { percentRemaining, exponentialFog } from '../utilities/index.js'
import { WIDTH, HEIGHT, SEGMENT_LENGTH, DRAW_DISTANCE, FOG_DENSITY, ROAD_WIDTH } from '../constants/index.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

class Painter {
  static clear (context) {
    context.clearRect(0, 0, WIDTH, HEIGHT)
  }

  static background ({ camera, ferrari, road, bg, y, context }) {
    const playerSegment = road.find(Math.floor((camera.position + ferrari.z) / SEGMENT_LENGTH))

    bg.rotate(playerSegment.curve * ferrari.rate)

    renderMountains({ context, rotation: bg.offset, offset: bg.tilt(y) })
  }

  // updates objects and paints the road from front to back
  static forestroke ({ context, ferrari, camera, road, y, checkpoints }) {
    const baseSegment = road.find(Math.floor(camera.position / SEGMENT_LENGTH))
    const basePercent = percentRemaining(camera.position, SEGMENT_LENGTH)

    let x = 0
    let dx = -(baseSegment.curve * basePercent)
    let maxy = HEIGHT

    for (let i = 0; i < DRAW_DISTANCE; ++i) {
      const segment = road.find(baseSegment.index + i)
      const isCheckpoint = checkpoints.includes(segment.index)

      segment.update({
        looped: segment.index < baseSegment.index,
        fog: exponentialFog(i / DRAW_DISTANCE, FOG_DENSITY),
        clip: maxy
      })

      segment.updateMidPoints({
        x: ferrari.position.x * ROAD_WIDTH - x,
        y,
        z: camera.position - (segment.looped ? road.trackLength : 0),
        dx
      })

      x = x + dx
      dx = dx + segment.curve

      if (segment.isHidden(maxy)) {
        continue
      }

      maxy = segment.closest.clipHeight

      renderSegment({ context, segment, isCheckpoint })
    }
  }

  // updates objects and paints the road from back to front so object appear
  // atop the road and in front of one another
  static backstroke ({ context, camera, road, ferrari }) {
    const baseSegment = road.find(Math.floor(camera.position / SEGMENT_LENGTH))
    const playerSegment = road.find(Math.floor((camera.position + ferrari.z) / SEGMENT_LENGTH))

    for (let i = (DRAW_DISTANCE - 1); i > 0; i--) {
      const segment = road.find(baseSegment.index + i)

      for (let j = 0; j < segment.sprites.length; j++) {
        renderOffroadObject({
          context, segment,
          sprite: segment.sprites[j],
          distance: i / DRAW_DISTANCE
        })
      }

      for (let i = 0, len = segment.cars.length; i < len; i++) {
        renderCar({ context, segment, car: segment.cars[i] })
      }

      if (segment === playerSegment) {
        renderFerrari({
          context, camera, ferrari, segment, incline: playerSegment.incline
        })
      }
    }
  }
}

export default Painter
