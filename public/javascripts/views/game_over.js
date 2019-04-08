// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const render = ({ element, message = '' }) => {
  element.innerHTML = `
    <div class="title-screen">
      <p class="text">Game Over</p>
      <p class="message">${message}</p>
    </div>
  `
}

export default render
