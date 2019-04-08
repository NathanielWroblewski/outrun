// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

class Vector extends Array {
  get x () {
    return this[0]
  }

  get y () {
    return this[1]
  }

  get z () {
    return this[2]
  }

  set x (value) {
    this[0] = value
  }

  set y (value) {
    this[1] = value
  }

  set z (value) {
    this[2] = value
  }

  subtract (arg) {
    switch (typeof arg) {
      case 'number': return this.map(element => element - arg)
      case 'object': return this.map((element, index) => element - arg[index])
    }
  }
}

export default Vector
