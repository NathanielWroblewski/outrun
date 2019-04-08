// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

class FiniteStateMachine {
  constructor ({ transitions, state }) {
    this.transitions = transitions || []
    this.state = state
    this._on = {}
  }

  canTransitionTo (newState) {
    return !!this.transitions.find(transition => (
      transition.from === this.state && transition.to === newState
    ))
  }

  transition (newState) {
    if (this.canTransitionTo(newState)) {
      this.state = newState
    }

    this.trigger('change')
  }

  on (event, callback) {
    if (!this._on[event]) {
      this._on[event] = []
    }

    this._on[event].push(callback)
  }

  trigger (event) {
    for (let i = 0, len = this._on[event].length; i < len; i++) {
      this._on[event][i](this)
    }
  }
}

export default FiniteStateMachine
