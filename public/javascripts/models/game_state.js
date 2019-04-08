import FiniteStateMachine from './finite_state_machine.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const TRANSITIONS = [
  { from: 'title', to: 'play' },
  { from: 'play', to: 'crash' },
  { from: 'play', to: 'timesup' },
  { from: 'crash', to: 'play' },
  { from: 'timesup', to: 'play' },
]

class GameState extends FiniteStateMachine {
  constructor ({ transitions = TRANSITIONS, state = 'title' }) {
    super({ transitions, state })
  }

  play () {
    this.transition('play')
  }

  crash () {
    this.transition('crash')
  }

  timesup () {
    this.transition('timesup')
  }
}

export default GameState
