import Base from './base.js'
import renderTitleScreen from '../views/title_screen.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

class Title extends Base {
  render ({ element }) {
    renderTitleScreen({ element })
  }

  setListeners ({ game }) {
    this.handler = () => game.play()

    document.addEventListener('click', this.handler)
  }

  removeListeners () {
    document.removeEventListener('click', this.handler)
  }
}

export default Title
