import { KonvaEventObject } from 'konva/lib/Node'
import { Stage as StageType } from 'konva/lib/Stage'
import { RefObject, useRef, useState } from 'react'
import { Layer, Line, Rect, Stage } from 'react-konva'
import { Mode, setMultiSelected, setMultiSelectRect, setSelected } from '../../features/control/controlSlice'
import { addEdge, addVertex, removeEdge, removeHead, removeVertex } from '../../features/model/modelSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux'
import { useResize } from '../../hooks/useResize'
import Head from '../shape/Head'
import Joint from '../shape/Joint'

type CanvasProps = {
  stageRef: RefObject<StageType>
}

const Canvas = (props: CanvasProps) => {
  const { stageRef } = props
  const divRef = useRef<HTMLDivElement>(null)
  const { width, height } = useResize(divRef)
  const dispatch = useAppDispatch()
  const heads = useAppSelector((state) => state.model.heads)
  const vertices = useAppSelector((state) => state.model.vertices)
  const edges = useAppSelector((state) => state.model.edges)
  const mode = useAppSelector((state) => state.control.mode)
  const selected = useAppSelector((state) => state.control.selected)
  const multiSelectRect = useAppSelector((state) => state.control.multiSelectRect)
  const multiSelected = useAppSelector((state) => state.control.multiSelected)
  const [isMultiSelecting, setIsMultiSelecting] = useState(false)

  const onMultiSelectStart = (e: KonvaEventObject<MouseEvent>) => {
    if (mode === Mode.IDLE) {
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

      const within = Object.entries(vertices).reduce((hash, [id, vertex]) => {
        if (vertex.x > topLeft.x && vertex.x < bottomRight.x) {
          if (vertex.y > topLeft.y && vertex.y < bottomRight.y) {
            hash[id] = true
          }
        }

        return hash
      }, {} as { [key: string]: boolean })

      dispatch(setMultiSelected(within))
    }
  }

  const onHeadClick = (id: number) => {
    if (mode === Mode.REMOVE_VERTEX) {
      dispatch(removeHead(id))
    }
  }

  const onBackgroundClick = (e: KonvaEventObject<MouseEvent>) => {
    if (mode === Mode.ADD_VERTEX) {
      console.log(e)
      dispatch(addVertex({ x: e.evt.layerX, y: e.evt.layerY }))
    }
  }

  const onJointClick = (id: number) => {
    dispatch(setMultiSelected({}))
    switch (mode) {
      case Mode.REMOVE_VERTEX:
        dispatch(removeVertex(id))
        break
      case Mode.ADD_EDGE:
        if (selected === null) {
          dispatch(setSelected(id))
        } else if (selected === id) {
          dispatch(setSelected(null))
        } else {
          dispatch(setSelected(null))
          dispatch(addEdge({ from: selected, to: id }))
        }
        break
      case Mode.REMOVE_EDGE:
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
    <div ref={divRef} style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
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
                points={[vertices[Number(from)].x, vertices[Number(from)].y, vertices[to].x, vertices[to].y]}
                stroke="black"
              />
            ))
          )}
          {Object.entries(heads).map(([id, vertex]) => (
            <Head onClick={() => onHeadClick(Number(id))} key={id} idd={Number(id)} x={vertex.x} y={vertex.y} />
          ))}
          {Object.entries(vertices).map(([id, vertex]) => (
            <Joint
              onClick={() => onJointClick(Number(id))}
              key={id}
              idd={Number(id)}
              x={vertex.x}
              y={vertex.y}
              fill={multiSelected[id] || selected === Number(id) ? 'red' : 'blue'}
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
