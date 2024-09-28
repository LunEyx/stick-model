import Menu from './components/layout/menu/Menu'
import Status from './components/layout/Status'
import Tools from './components/layout/tools/Tools'
import Properties from './components/layout/Properties'
import Canvas from './components/layout/Canvas'

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Menu />
      <div style={{ display: 'flex', width: '100%', flex: '1' }}>
        <Tools />
        <Canvas />
        <Properties />
      </div>
      <Status />
    </div>
  )
}

export default App
