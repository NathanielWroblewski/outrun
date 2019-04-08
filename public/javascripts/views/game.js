// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const render = ({ element }) => {
  element.innerHTML = `
    <canvas class="canvas" height="768" width="1024"></canvas>
    <div></div>
    <div class="health"></div>
    <div class="clock"></div>
    <div class="radio-container">
      <h3 class="radio">RADIO</h3>
      <p class="now-playing">Fury Weekend - 12 To Midnight</p>
    </div>
  `
}

export default render
