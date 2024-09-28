import CircleIcon from '../../../assets/tools/circle-icon.svg'
import { Mode } from '../../../features/control/controlSlice'
import ToolButton from './ToolButton'

const CircleButton = () => {
  return <ToolButton icon={CircleIcon} mode={Mode.CIRCLE} />
}

export default CircleButton
