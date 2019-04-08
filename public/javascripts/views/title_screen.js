// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const CONTROLS = [
  { action: 'Radio', lefthand: 'W', righthand: '&#8679;' },
  { action: 'Left', lefthand: 'A', righthand: '&#8678;' },
  { action: 'Right', lefthand: 'D', righthand: '&#8680;' },
  { action: 'Brake', lefthand: 'S', righthand: '&#8681;' },
]

const CONTROLS_HTML = CONTROLS.reduce((html, control) => html += `
  <tr>
    <td>${control.action}</td>
    <td>${control.righthand}</td>
    <td>${control.lefthand}</td>
  </tr>
`, '')

const render = ({ element }) => {
  element.innerHTML = `
    <div class="title-screen">
      <p class="text">Click to Start</p>
      <table class="controls">
        ${CONTROLS_HTML}
      </table>
    </div>
  `
}

export default render
