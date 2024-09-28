import { Flex, Input, Text } from '@chakra-ui/react'

const Properties = () => {
  return (
    <Flex flexDir="column" gap={4} width="200px" padding="5px" backgroundColor="#212121" borderLeft="3px #424242 solid">
      <Text fontSize="xl">Properties</Text>
      {/* <Flex gap={4}>
        <Text>Color</Text>
        <Input type="color" h="unset" border="none" />
      </Flex> */}
    </Flex>
  )
}

export default Properties
