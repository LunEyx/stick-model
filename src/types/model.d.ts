type Point = {
  x: number
  y: number
}

type Shape = Point & {
  id: number
  color: string
}

type Dot = Shape

type Circle = Shape & { radius: number; fill: string }

enum EdgeStyle {
  NONE = 'NONE',
  ARROW = 'ARROW',
}

type Edge = {
  id: number
  from: number
  to: number
  color: string
  fromStyle: EdgeStyle
  toStyle: EdgeStyle
}
