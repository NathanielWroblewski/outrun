// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const EMPTY_HEART = '&#9825;'
const FULL_HEART = '&#9829;'

const render = ({ element, hearts, max }) => {
  const health = element.querySelector('.health')
  const html = new Array(max).fill(0).reduce((memo, _, index) => (
    memo + `
      <span class="heart">
        ${hearts + index >= max ? FULL_HEART : EMPTY_HEART}
      </span>
    `
  ), '')

  if (health) {
    health.innerHTML = html
  }
}

export default render
