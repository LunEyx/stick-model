import { Button } from '@chakra-ui/react'
import { useSave } from '../../../hooks/useSave'

const SaveButton = () => {
  const { save } = useSave()

  const onClick = () => {
    save()
  }

  return (
    <Button p="5px 10px" bg="none" _hover={{ bg: 'none' }} onClick={onClick}>
      Save
    </Button>
  )
}

export default SaveButton
