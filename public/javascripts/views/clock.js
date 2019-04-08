// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const render = ({ element, remaining }) => {
  const clock = element.querySelector('.clock')

  if (clock) {
    clock.innerHTML = `00:${String(remaining).padStart(2, '0')}`
  }
}

export default render
