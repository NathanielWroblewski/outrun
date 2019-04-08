import GameState from './models/game_state.js'
import Router from './routers/router.js'

// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const element = document.querySelector('.game')
const model = new GameState({})
const router = new Router({ element, model })

router.update()
