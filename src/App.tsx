import { Stage } from 'konva/lib/Stage'
import { useRef } from 'react'
import './App.css'
import Canvas from './components/canvas/Canvas'
import { Mode, setMode } from './features/control/controlSlice'
import { addHead } from './features/model/modelSlice'
import { useAppDispatch, useAppSelector } from './hooks/useRedux'
import { useSave } from './hooks/useSave'

const App = () => {
  const dispatch = useAppDispatch()
  const mode = useAppSelector((state) => state.control.mode)
  const stageRef = useRef<Stage>(null)
  const [save, load] = useSave()

  const addHeadObj = () => {
    dispatch(setMode(Mode.IDLE))
    dispatch(addHead({ x: 50, y: 50 }))
  }

  const addJoint = () => {
    if (mode === Mode.ADD_VERTEX) {
      dispatch(setMode(Mode.IDLE))
      return
    }

    dispatch(setMode(Mode.ADD_VERTEX))
  }

  const removeJoint = () => {
    if (mode === Mode.REMOVE_VERTEX) {
      dispatch(setMode(Mode.IDLE))
      return
    }

    dispatch(setMode(Mode.REMOVE_VERTEX))
  }

  const addEdge = () => {
    if (mode === Mode.ADD_EDGE) {
      dispatch(setMode(Mode.IDLE))
      return
    }

    dispatch(setMode(Mode.ADD_EDGE))
  }

  const removeEdge = () => {
    if (mode === Mode.REMOVE_EDGE) {
      dispatch(setMode(Mode.IDLE))
      return
    }

    dispatch(setMode(Mode.REMOVE_EDGE))
  }

  const onCapture = () => {
    const dataURL = stageRef.current?.toDataURL()
    if (dataURL) {
      const a = document.createElement('a')
      a.href = dataURL
      a.download = 'canvas.png'
      a.click()
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          padding: '20px',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center', gap: '20px' }}>
          <button onClick={addHeadObj}>Add Head</button>
          <button style={{ background: mode === Mode.ADD_VERTEX ? 'orange' : undefined }} onClick={addJoint}>
            Add Joint
          </button>
          <button style={{ background: mode === Mode.REMOVE_VERTEX ? 'orange' : undefined }} onClick={removeJoint}>
            Remove Joint
          </button>
          <button style={{ background: mode === Mode.ADD_EDGE ? 'orange' : undefined }} onClick={addEdge}>
            Add Edge
          </button>
          <button style={{ background: mode === Mode.REMOVE_EDGE ? 'orange' : undefined }} onClick={removeEdge}>
            Remove Edge
          </button>
          <button onClick={onCapture}>Capture</button>
          <button onClick={save}>Save</button>
          <button onClick={load}>Load</button>
        </div>
        <Canvas stageRef={stageRef} />
      </div>
    </div>
  )
}

export default App
