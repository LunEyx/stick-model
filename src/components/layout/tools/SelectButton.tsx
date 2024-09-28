import SelectIcon from '../../../assets/tools/select-icon.svg'
import { Mode } from '../../../features/control/controlSlice'
import ToolButton from './ToolButton'

const SelectButton = () => {
  return <ToolButton icon={SelectIcon} mode={Mode.SELECT} />
}

export default SelectButton
