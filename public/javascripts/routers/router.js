import Play from '../controllers/play.js'
import Title from '../controllers/title.js'
import Crash from '../controllers/crash.js'
import Timesup from '../controllers/timesup.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const CONTROLLERS = {
  title: Title,
  play: Play,
  crash: Crash,
  timesup: Timesup,
}

class Router {
  constructor ({ element, model }) {
    this.element = element
    this.model = model

    this.model.on('change', () => this.update())
    this.controller = null
  }

  update () {
    const { element, model } = this
    const game = model

    if (this.controller) {
      this.controller.removeListeners({ element, game })
    }

    this.controller = new CONTROLLERS[model.state]()
    this.controller.render({ element, game })
    this.controller.setListeners({ element, game })
    this.controller.run({ element, game })
  }
}

export default Router
