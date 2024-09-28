import { Flex } from '@chakra-ui/react'
import CircleButton from './CircleButton'
import ColorButton from './ColorButton'
import ConnectButton from './ConnectButton'
import DeleteButton from './DeleteButton'
import DisconnectButton from './DisconnectButton'
import DragButton from './DragButton'
import NodeButton from './NodeButton'
import ZoomButton from './ZoomButton'

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
