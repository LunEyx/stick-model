import { Flex } from '@chakra-ui/react'
import CircleButton from './CircleButton'
import ConnectButton from './ConnectButton'
import DeleteButton from './DeleteButton'
import DisconnectButton from './DisconnectButton'
import DragButton from './DragButton'
import NodeButton from './NodeButton'
import SelectButton from './SelectButton'
import ZoomButton from './ZoomButton'
import ColorButton from './ColorButton'

const Tools = () => {
  return (
    <Flex
      flexDir="column"
      justify="space-between"
      align="center"
      p={2}
      w="64px"
      bg="#212121"
      borderRight="3px #424242 solid"
    >
      <Flex flexDir="column" gap={2}>
        <DragButton />
        {/* <SelectButton /> */}
        <NodeButton />
        <CircleButton />
        <ConnectButton />
        <DisconnectButton />
        <ZoomButton />
        <DeleteButton />
      </Flex>
      <Flex>
        <ColorButton />
      </Flex>
    </Flex>
  )
}

export default Tools
