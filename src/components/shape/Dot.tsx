import { CircleConfig } from 'konva/lib/shapes/Circle'
import { Circle } from 'react-konva'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { Mode, setMultiSelected } from '../../features/control/controlSlice'
import { moveDot, moveHead } from '../../features/model/modelSlice'
import { KonvaEventObject } from 'konva/lib/Node'
import { useState } from 'react'

type JointProps = CircleConfig & {
  idd: number
}

const Dot = (props: JointProps) => {
  const dispatch = useAppDispatch()
  const mode = useAppSelector((state) => state.control.mode)
  const selected = useAppSelector((state) => state.control.selected)
  const multiSelected = useAppSelector((state) => state.control.multiSelected)
  const dots = useAppSelector((state) => state.model.dots)
  const heads = useAppSelector((state) => state.model.heads)
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number } | null>(null)
  const { idd, ...circleProps } = props

  const onDragStart = (e: KonvaEventObject<MouseEvent>) => {
    setDragStartPos({ x: e.target.attrs.x, y: e.target.attrs.y })
  }

  const onDrag = (e: KonvaEventObject<MouseEvent>) => {
    if (!multiSelected[idd]) {
      dispatch(setMultiSelected({}))
      dispatch(moveDot({ id: idd, x: e.target.attrs.x, y: e.target.attrs.y }))
      return
    }
    dispatch(moveDot({ id: idd, x: e.target.attrs.x, y: e.target.attrs.y }))
    const offsetX = e.target.attrs.x - dragStartPos!.x
    const offsetY = e.target.attrs.y - dragStartPos!.y
    Object.entries(dots)
      .filter(([id]) => multiSelected[id])
      .forEach(([id, dot]) => {
        dispatch(moveDot({ id: Number(id), x: dot.x + offsetX, y: dot.y + offsetY }))
      })
    Object.entries(heads)
      .filter(([id]) => multiSelected[id])
      .forEach(([id, head]) => {
        dispatch(moveHead({ id: Number(id), x: head.x + offsetX, y: head.y + offsetY }))
      })

    setDragStartPos({ x: e.target.attrs.x, y: e.target.attrs.y })
  }

  return (
    <>
      {(multiSelected[idd] || selected === idd) && <Circle radius={18} {...circleProps} opacity={0.4} />}
      <Circle
        radius={10}
        draggable={mode === Mode.DRAG}
        onDragStart={onDragStart}
        onDragMove={onDrag}
        onDragEnd={onDrag}
        {...circleProps}
      />
    </>
  )
}

export default Dot
