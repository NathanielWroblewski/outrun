import Lose from './lose.js'
import renderGameOver from '../views/game_over.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

class Timesup extends Lose {
  render ({ element }) {
    renderGameOver({ element, message: 'Timed Out' })
  }
}

export default Timesup
