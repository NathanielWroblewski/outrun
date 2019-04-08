// Copyright (c) 2018 Nathaniel Wroblewski
//
// I am making my contributions/submissions to this project solely in my
// personal capacity and am not conveying any rights to any intellectual
// property of any third parties.

export const FPS = 60
export const STEP = 1/FPS
export const WIDTH = 1024
export const HEIGHT = 768
export const RESOLUTION = HEIGHT / 480
// road
export const ROAD_WIDTH = 2000
export const SEGMENT_LENGTH = 200
export const LANES = 4
export const CENTRIFUGAL = 0.3
export const MAX_SPEED = SEGMENT_LENGTH / STEP
// camera
export const DRAW_DISTANCE = 400
export const FIELD_OF_VIEW = 100
export const CAMERA_HEIGHT = 1000
export const CAMERA_DEPTH = 1 / Math.tan((FIELD_OF_VIEW / 2) * Math.PI / 180)
export const FOG_DENSITY = 5
