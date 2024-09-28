import NodeIcon from '../../../assets/tools/node-icon.svg'
import { Mode } from '../../../features/control/controlSlice'
import ToolButton from './ToolButton'

const NodeButton = () => {
  return <ToolButton icon={NodeIcon} mode={Mode.DOT} />
}

export default NodeButton
