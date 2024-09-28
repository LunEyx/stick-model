import DisconnectIcon from '../../../assets/tools/disconnect-icon.svg'
import { Mode } from '../../../features/control/controlSlice'
import ToolButton from './ToolButton'

const DisconnectButton = () => {
  return <ToolButton icon={DisconnectIcon} mode={Mode.DISCONNECT} />
}

export default DisconnectButton
