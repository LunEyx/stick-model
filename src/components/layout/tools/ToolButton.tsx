import { Button } from '@chakra-ui/react'
import { Mode, setMode } from '../../../features/control/controlSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'

interface ToolButtonProps {
  icon?: string
  mode?: Mode
}

const ToolButton = (props: ToolButtonProps) => {
  const { icon, mode } = props
  const dispatch = useAppDispatch()
  const selectedMode = useAppSelector((state) => state.control.mode)
  const selected = mode === selectedMode
  const onClick = () => mode && dispatch(setMode(mode))

  return (
    <Button
      display="flex"
      justifyContent="center"
      alignItems="center"
      w="50px"
      h="50px"
      p="0"
      bgColor={selected ? '#333333' : '#121212'}
      _hover={{
        backgroundColor: '#333333',
      }}
      onClick={onClick}
    >
      {icon && <img src={icon} alt="icon" style={{ width: '30px', height: '30px' }} />}
    </Button>
  )
}

export default ToolButton
