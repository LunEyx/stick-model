import ConnectIcon from '../../../assets/tools/connect-icon.svg'
import { Mode } from '../../../features/control/controlSlice'
import ToolButton from './ToolButton'

const ConnectButton = () => {
  return <ToolButton icon={ConnectIcon} mode={Mode.CONNECT} />
}

export default ConnectButton
