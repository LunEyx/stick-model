import { KonvaEventObject } from 'konva/lib/Node'
import { Stage as StageType } from 'konva/lib/Stage'
import { RefObject, useRef, useState } from 'react'
import { Layer, Line, Rect, Stage } from 'react-konva'
import { Mode, setMultiSelected, setMultiSelectRect, setSelected } from '../../features/control/controlSlice'
import { addEdge, addHead, addDot, removeEdge, removeHead, removeDot } from '../../features/model/modelSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { useResize } from '../../hooks/useResize'
import Head from '../shape/Head'
import Dot from '../shape/Dot'

type CanvasProps = {
  stageRef: RefObject<StageType>
}

const Canvas = (props: CanvasProps) => {
  const { stageRef } = props
  const divRef = useRef<HTMLDivElement>(null)
  const { width, height } = useResize(divRef)
  const dispatch = useAppDispatch()
  const heads = useAppSelector((state) => state.model.heads)
  const dots = useAppSelector((state) => state.model.dots)
  const edges = useAppSelector((state) => state.model.edges)
  const mode = useAppSelector((state) => state.control.mode)
  const selected = useAppSelector((state) => state.control.selected)
  const color = useAppSelector((state) => state.control.color)
  const multiSelectRect = useAppSelector((state) => state.control.multiSelectRect)
  const [isMultiSelecting, setIsMultiSelecting] = useState(false)

  const onMultiSelectStart = (e: KonvaEventObject<MouseEvent>) => {
    if (mode === Mode.DRAG) {
      setIsMultiSelecting(true)
      dispatch(setMultiSelected({}))
      dispatch(
        setMultiSelectRect({ start: { x: e.evt.layerX, y: e.evt.layerY }, end: { x: e.evt.layerX, y: e.evt.layerY } })
      )
    }
  }

  const onMultiSelectEnd = () => {
    if (isMultiSelecting) {
      setIsMultiSelecting(false)
      dispatch(setMultiSelectRect(null))
    }
  }

  const onMultiSelect = (e: KonvaEventObject<MouseEvent>) => {
    if (isMultiSelecting) {
      dispatch(setMultiSelectRect({ end: { x: e.evt.layerX, y: e.evt.layerY } }))

      if (!multiSelectRect) return
      const topLeft = {
        x: Math.min(multiSelectRect.start.x, e.evt.layerX),
        y: Math.min(multiSelectRect.start.y, e.evt.layerY),
      }
      const bottomRight = {
        x: Math.max(multiSelectRect.start.x, e.evt.layerX),
        y: Math.max(multiSelectRect.start.y, e.evt.layerY),
      }

      const within = Object.entries(dots).reduce((hash, [id, dot]) => {
        if (dot.x > topLeft.x && dot.x < bottomRight.x) {
          if (dot.y > topLeft.y && dot.y < bottomRight.y) {
            hash[id] = true
          }
        }

        return hash
      }, {} as { [key: string]: boolean })

      const within2 = Object.entries(heads).reduce((hash, [id, head]) => {
        if (head.x > topLeft.x && head.x < bottomRight.x) {
          if (head.y > topLeft.y && head.y < bottomRight.y) {
            hash[id] = true
          }
        }

        return hash
      }, {} as { [key: string]: boolean })

      dispatch(setMultiSelected({ ...within, ...within2 }))
    }
  }

  const onHeadClick = (e: KonvaEventObject<MouseEvent>, id: number) => {
    if (mode === Mode.DELETE) {
      dispatch(removeHead(id))
    } else {
      console.log(e)
    }
  }

  const onBackgroundClick = (e: KonvaEventObject<MouseEvent>) => {
    if (mode === Mode.DOT) {
      console.log(e)
      dispatch(addDot({ x: e.evt.layerX, y: e.evt.layerY, color }))
    }
    if (mode === Mode.CIRCLE) {
      console.log(e)
      dispatch(addHead({ x: e.evt.layerX, y: e.evt.layerY, color, radius: 50, fill: color }))
    }
  }

  const onDotClick = (id: number) => {
    dispatch(setMultiSelected({}))
    switch (mode) {
      case Mode.DELETE:
        dispatch(removeDot(id))
        break
      case Mode.CONNECT:
        if (selected === null) {
          dispatch(setSelected(id))
        } else if (selected === id) {
          dispatch(setSelected(null))
        } else {
          dispatch(setSelected(null))
          dispatch(addEdge({ from: selected, to: id }))
        }
        break
      case Mode.DISCONNECT:
        if (selected === null) {
          dispatch(setSelected(id))
        } else if (selected === id) {
          dispatch(setSelected(null))
        } else {
          dispatch(setSelected(null))
          dispatch(removeEdge({ from: selected, to: id }))
        }
        break
    }
  }

  return (
    <div ref={divRef} style={{ width: '90%', height: '90%', overflow: 'hidden' }}>
      <Stage ref={stageRef} width={width} height={height}>
        <Layer>
          <Rect
            onClick={onBackgroundClick}
            onMouseDown={onMultiSelectStart}
            onMouseMove={onMultiSelect}
            onMouseUp={onMultiSelectEnd}
            width={width}
            height={height}
            fill="white"
          />
          {Object.entries(edges).map(([from, tos]: [string, number[]]) =>
            tos.map((to) => (
              <Line
                key={`${from}-${to}`}
                points={[dots[Number(from)].x, dots[Number(from)].y, dots[to].x, dots[to].y]}
                stroke="black"
              />
            ))
          )}
          {Object.entries(heads).map(([id, dot]) => (
            <Head
              onClick={(e: KonvaEventObject<MouseEvent>) => onHeadClick(e, Number(id))}
              key={id}
              idd={Number(id)}
              radius={dot.radius}
              x={dot.x}
              y={dot.y}
              stroke={dot.color}
            />
          ))}
          {Object.entries(dots).map(([id, dot]) => (
            <Dot
              onClick={() => onDotClick(Number(id))}
              key={id}
              idd={Number(id)}
              x={dot.x}
              y={dot.y}
              fill={dot.color}
            />
          ))}
          {multiSelectRect && (
            <Line
              points={[
                multiSelectRect.start.x,
                multiSelectRect.start.y,
                multiSelectRect.end.x,
                multiSelectRect.start.y,
                multiSelectRect.end.x,
                multiSelectRect.end.y,
                multiSelectRect.start.x,
                multiSelectRect.end.y,
                multiSelectRect.start.x,
                multiSelectRect.start.y,
              ]}
              stroke="black"
              strokeWidth={1}
              draggable
            />
          )}
        </Layer>
      </Stage>
    </div>
  )
}

export default Canvas
