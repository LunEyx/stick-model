import { KonvaEventObject } from 'konva/lib/Node'
import { CircleConfig } from 'konva/lib/shapes/Circle'
import { Circle } from 'react-konva'
import { Mode } from '../../features/control/controlSlice'
import { moveHead } from '../../features/model/modelSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'

type JointProps = CircleConfig & {
  idd: number
}

const Joint = (props: JointProps) => {
  const dispatch = useAppDispatch()
  const mode = useAppSelector((state) => state.control.mode)
  const selected = useAppSelector((state) => state.control.selected)
  const { idd, ...circleProps } = props

  const onDrag = (e: KonvaEventObject<MouseEvent>) => {
    dispatch(moveHead({ id: idd, x: e.target.attrs.x, y: e.target.attrs.y }))
  }

  return (
    <Circle
      radius={50}
      stroke={idd === selected ? 'red' : 'blue'}
      draggable={mode === Mode.IDLE}
      onDragMove={onDrag}
      onDragEnd={onDrag}
      {...circleProps}
    />
  )
}

export default Joint
