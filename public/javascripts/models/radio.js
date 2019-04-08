// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

const PLAYLIST = [
  {
    title: '12 to Midnight',
    artist: 'Fury Weekend',
    src: '//d9n2q0aon7p4b.cloudfront.net/audio/Fury_Weekend_12_To_Midnight.mp3'
  },
  {
    title: 'Abyss',
    artist: 'Doomroar',
    src: '//d9n2q0aon7p4b.cloudfront.net/audio/DOOMROAR_Abyss.mp3'
  },
  {
    title: 'Dragon Heart',
    artist: 'Earthshifter',
    src: '//d9n2q0aon7p4b.cloudfront.net/audio/Earthshifter_Dragon_Heart.mp3'
  },
  {
    title: "Summer Rush '87",
    artist: 'Johnny Ola',
    src: '//d9n2q0aon7p4b.cloudfront.net/audio/Johnny_Ola_Summer_Rush_87.mp3'
  },
  {
    title: 'Absolute Black',
    artist: 'Nitelight',
    src: '//d9n2q0aon7p4b.cloudfront.net/audio/Nitelight_Absolute_black.mp3'
  },
  {
    title: 'I am the Danger',
    artist: 'Powernerd',
    src: '//d9n2q0aon7p4b.cloudfront.net/audio/POWERNERD_I_Am_The_Danger.mp3'
  },
]

class Radio {
  constructor () {
    this.index = 0
  }

  next () {
    this.index = (this.index + 1) % PLAYLIST.length
  }

  get track () {
    return PLAYLIST[this.index]
  }
}

export default Radio
