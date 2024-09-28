import { KonvaEventObject } from 'konva/lib/Node'
import { CircleConfig } from 'konva/lib/shapes/Circle'
import { Circle } from 'react-konva'
import { Mode } from '../../features/control/controlSlice'
import { moveHead } from '../../features/model/modelSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'

type HeadProps = CircleConfig & {
  idd: number
}

const Head = (props: HeadProps) => {
  const dispatch = useAppDispatch()
  const mode = useAppSelector((state) => state.control.mode)
  const { idd, ...circleProps } = props

  const onDrag = (e: KonvaEventObject<MouseEvent>) => {
    dispatch(moveHead({ id: idd, x: e.target.attrs.x, y: e.target.attrs.y }))
  }

  return <Circle draggable={mode === Mode.DRAG} onDragMove={onDrag} onDragEnd={onDrag} {...circleProps} />
}

export default Head
