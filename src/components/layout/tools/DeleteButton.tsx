import DeleteIcon from '../../../assets/tools/delete-icon.svg'
import { Mode } from '../../../features/control/controlSlice'
import ToolButton from './ToolButton'

const DeleteButton = () => {
  return <ToolButton icon={DeleteIcon} mode={Mode.DELETE} />
}

export default DeleteButton
