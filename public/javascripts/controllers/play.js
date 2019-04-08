import Base from './base.js'
import Ferrari from '../models/ferrari.js'
import Road from '../models/road.js'
import Camera from '../models/camera.js'
import Background from '../models/background.js'
import Radio from '../models/radio.js'
import Collision from '../models/collision.js'
import Health from '../models/health.js'
import Painter from '../models/painter.js'
import Stopwatch from '../models/stopwatch.js'
import renderGame from '../views/game.js'
import renderRadio from '../views/radio.js'
import renderCrash from '../views/crash.js'
import renderHealth from '../views/health.js'
import renderClock from '../views/clock.js'
import { percentRemaining, interpolate } from '../utilities/index.js'
import { SEGMENT_LENGTH, CAMERA_HEIGHT, STEP } from '../constants/index.js'
import KEYS from '../constants/keys.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

class Play extends Base {
  constructor () {
    super()

    this.ferrari = new Ferrari({})
    this.road = new Road({})
    this.camera = new Camera({})
    this.bg = new Background({})
    this.radio = new Radio({})
    this.health = new Health({})
    this.stopwatch = new Stopwatch({ road: this.road })
  }

  render ({ element }) {
    renderGame({ element })
  }

  setListeners ({ element, game }) {
    const audio = document.querySelector('audio')

    this.nextTrack = this.getNextTrackHandler()

    audio.addEventListener('ended', this.nextTrack)

    this.handleKeydown = this.getKeyHandler(true)
    this.handleKeyup = this.getKeyHandler(false)
    this.handleTouchMove = this.getTouchHandler()

    document.addEventListener('keydown', this.handleKeydown)
    document.addEventListener('keyup', this.handleKeyup)

    if ('ontouchstart' in window) {
      document.addEventListener('touchmove', this.handleTouchMove)
    }
  }

  removeListeners () {
    const audio = document.querySelector('audio')

    audio.removeEventListener('ended', this.nextTrack)
    audio.pause()

    document.removeEventListener('keydown', this.handleKeydown)
    document.removeEventListener('keyup', this.handleKeyup)
    document.removeEventListener('touchmove', this.handleTouchMove)

    setTimeout(() => window.cancelAnimationFrame(this.id), 0)
  }

  run ({ element, game }) {
    const audio = document.querySelector('audio')
    const canvas = document.querySelector('.canvas')

    this.element = element
    this.game = game
    this.crashpanel = element.querySelector('div:first-of-type')
    this.context = canvas.getContext('2d')

    audio.volume = 0.1
    audio.currentTime = 0
    audio.play()

    this.id = window.requestAnimationFrame(() => this.step())
  }

  step () {
    const { road, camera, ferrari, bg, audio, canvas, context } = this
    const playerSegment = road.find(Math.floor((camera.position + ferrari.position.z) / SEGMENT_LENGTH))
    const playerPercent = percentRemaining(camera.position + ferrari.position.z, SEGMENT_LENGTH)
    const playery = interpolate(
      playerSegment.closest.position.y,
      playerSegment.furthest.position.y,
      playerPercent
    )

    this.update({ camera, ferrari, road })

    Painter.background({ camera, ferrari, road, bg, y: playery, context })
    Painter.forestroke({ ferrari, road, camera, y: playery + CAMERA_HEIGHT, context, checkpoints: this.stopwatch.checkpoints })
    Painter.backstroke({ road, camera, ferrari, context })

    renderClock({ element: this.element, remaining: this.stopwatch.remaining })
    renderHealth({
      element: this.element,
      hearts: this.health.hearts,
      max: this.health.max
    })

    this.id = window.requestAnimationFrame(() => this.step())
  }

  update ({ camera, ferrari, road, context }) {
    const playerSegment = road.find(Math.floor((camera.position + ferrari.z) / SEGMENT_LENGTH))
    const dt = STEP
    let dx = 2 * dt * ferrari.rate

    road.traffic.move({ playerSegment, ferrari, dt })

    ferrari.turn(playerSegment, dx)
    ferrari.drive(dt)

    this.crashAssessment({ playerSegment, ferrari, road, dt })

    ferrari.boundVelocity()

    if (this.stopwatch.atCheckpoint(playerSegment) && this.stopwatch.onTime()) {
      this.stopwatch.reset()
    }

    if (this.stopwatch.outOfTime()) {
      this.game.timesup()
    }

    camera.advance({ amount: ferrari.velocity.z * dt, max: road.trackLength })
  }

  isCrashing ({ playerSegment, ferrari, road }) {
    return (
      Collision.any({ cars: playerSegment.cars, ferrari }) ||
      Collision.any({
        ferrari, cars: road.find(playerSegment.index + 1).cars, oncomingOnly: true
      })
    )
  }

  crashAssessment ({ playerSegment, ferrari, road, dt }) {
    if (this.health.isRecovering()) {
      return this.health.recover()
    }

    if (this.isCrashing({ playerSegment, ferrari, road })) {
      ferrari.crash(dt)
      this.health.decrement()

      if (!this.health.isAlive()) {
        return this.game.crash()
      }

      renderCrash(this.crashpanel)
    }
  }

  getNextTrackHandler () {
    return () => {
      const container = document.querySelector('.radio-container')
      const audio = document.querySelector('audio')

      this.radio.next()
      audio.src = this.radio.track.src
      audio.load()
      audio.play()

      renderRadio({ element: container, model: this.radio })
    }
  }

  getTouchHandler () {
    return event => {
      const { touches } = event
      const { offsetLeft, clientWidth } = document.querySelector('.canvas')
      const middle = clientWidth / 2
      const middlelane = 100

      if (touches && touches[0].pageX - offsetLeft > middle - middlelane && touches[0].pageX - offsetLeft < middle + middlelane) {
        this.ferrari.hardRight(false)
        return this.ferrari.hardLeft(false)
      }

      if (touches && touches[0].pageX - offsetLeft < middle - middlelane) {
        this.ferrari.hardRight(false)
        return this.ferrari.hardLeft(true)
      }

      if (touches && touches[0].pageX - offsetLeft > middle + middlelane) {
        this.ferrari.hardLeft(false)
        return this.ferrari.hardRight(true)
      }
    }
  }

  getKeyHandler (isKeydown) {
    return event => {
      switch (event.keyCode) {
        case KEYS.LEFT:
        case KEYS.A:
          event.preventDefault()
          return this.ferrari.hardLeft(isKeydown)
        case KEYS.RIGHT:
        case KEYS.D:
          event.preventDefault()
          return this.ferrari.hardRight(isKeydown)
        case KEYS.DOWN:
        case KEYS.S:
          event.preventDefault()
          return this.ferrari.brake(isKeydown)
        case KEYS.UP:
        case KEYS.W:
          event.preventDefault()
          return isKeydown && this.nextTrack()
      }
    }
  }
}

export default Play
