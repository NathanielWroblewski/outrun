// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const MAX_HEARTS = 3
const MAX_IMMUNITY = 30

class Health {
  constructor ({ hearts = MAX_HEARTS, immunity = MAX_IMMUNITY }) {
    this.hearts = hearts
    this.immunity = immunity
    this.max = MAX_HEARTS
  }

  isRecovering () {
    return this.immunity > 0
  }

  recover () {
    if (this.immunity) {
      this.immunity--
    }
  }

  isAlive () {
    return this.hearts > 0
  }

  decrement () {
    if (!this.immunity && this.hearts) {
      this.immunity = MAX_IMMUNITY
      this.hearts--
    }
  }
}

export default Health
