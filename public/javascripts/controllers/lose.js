import Base from './base.js'
import renderGameOver from '../views/game_over.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

class Lose extends Base {
  render ({ element }) {
    renderGameOver({ element, message: '' })
  }

  setListeners ({ element, game }) {
    const title = element.querySelector('.title-screen')

    this.handler = () => game.play()

    title.addEventListener('click', this.handler)
  }

  removeListeners ({ element }) {
    const title = element.querySelector('.title-screen')

    title.removeEventListener('click', this.handler)
  }
}

export default Lose
