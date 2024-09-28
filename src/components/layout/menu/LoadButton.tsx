import { Button } from '@chakra-ui/react'
import { useSave } from '../../../hooks/useSave'

const LoadButton = () => {
  const { load } = useSave()

  const onClick = () => {
    load()
  }

  return (
    <Button p="5px 10px" bg="none" _hover={{ bg: 'none' }} onClick={onClick}>
      Load
    </Button>
  )
}

export default LoadButton
