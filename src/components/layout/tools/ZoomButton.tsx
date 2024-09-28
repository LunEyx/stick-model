import ZoomIcon from '../../../assets/tools/zoom-icon.svg'
import { Mode } from '../../../features/control/controlSlice'
import ToolButton from './ToolButton'

const ZoomButton = () => {
  return <ToolButton icon={ZoomIcon} mode={Mode.ZOOM} />
}

export default ZoomButton
