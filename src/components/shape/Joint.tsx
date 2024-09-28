import { CircleConfig } from 'konva/lib/shapes/Circle'
import { Circle } from 'react-konva'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { Mode, setMultiSelected } from '../../features/control/controlSlice'
import { moveVertex } from '../../features/model/modelSlice'
import { KonvaEventObject } from 'konva/lib/Node'
import { useState } from 'react'

type JointProps = CircleConfig & {
  idd: number
}

const Joint = (props: JointProps) => {
  const dispatch = useAppDispatch()
  const mode = useAppSelector((state) => state.control.mode)
  const selected = useAppSelector((state) => state.control.selected)
  const multiSelected = useAppSelector((state) => state.control.multiSelected)
  const vertices = useAppSelector((state) => state.model.vertices)
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number } | null>(null)
  const { idd, ...circleProps } = props

  const onDragStart = (e: KonvaEventObject<MouseEvent>) => {
    setDragStartPos({ x: e.target.attrs.x, y: e.target.attrs.y })
  }

  const onDrag = (e: KonvaEventObject<MouseEvent>) => {
    if (!multiSelected[idd]) {
      dispatch(setMultiSelected({}))
      dispatch(moveVertex({ id: idd, x: e.target.attrs.x, y: e.target.attrs.y }))
      return
    }
    dispatch(moveVertex({ id: idd, x: e.target.attrs.x, y: e.target.attrs.y }))
    const offsetX = e.target.attrs.x - dragStartPos!.x
    const offsetY = e.target.attrs.y - dragStartPos!.y
    Object.entries(vertices)
      .filter(([id]) => multiSelected[id])
      .forEach(([id, vertex]) => {
        dispatch(moveVertex({ id: Number(id), x: vertex.x + offsetX, y: vertex.y + offsetY }))
      })

    setDragStartPos({ x: e.target.attrs.x, y: e.target.attrs.y })
  }

  return (
    <Circle
      radius={10}
      fill={idd === selected ? 'red' : 'blue'}
      draggable={mode === Mode.IDLE}
      onDragStart={onDragStart}
      onDragMove={onDrag}
      onDragEnd={onDrag}
      {...circleProps}
    />
  )
}

export default Joint
