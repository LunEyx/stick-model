import DragIcon from '../../../assets/tools/drag-icon.svg'
import { Mode } from '../../../features/control/controlSlice'
import ToolButton from './ToolButton'

const DragButton = () => {
  return <ToolButton icon={DragIcon} mode={Mode.DRAG} />
}

export default DragButton
