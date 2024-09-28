import { useRef } from 'react'
import Canvas2 from '../canvas/Canvas'
import Konva from 'konva'

const Canvas = () => {
  const stageRef = useRef<Konva.Stage>(null)

  return (
    <div
      style={{
        flex: '1',
        backgroundColor: '#212121',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Canvas2 stageRef={stageRef} />
    </div>
  )
}

export default Canvas
