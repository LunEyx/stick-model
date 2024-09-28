import { Box, Button, Input } from '@chakra-ui/react'
import { createRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/useRedux'
import { setColor } from '../../../features/control/controlSlice'

const ColorButton = () => {
  const dispatch = useAppDispatch()
  const color = useAppSelector((state) => state.control.color)
  const inputRef = createRef<HTMLInputElement>()

  const onClick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value
    dispatch(setColor(newColor))
  }

  return (
    <Button
      pos="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      w="50px"
      h="50px"
      p="0"
      bgColor="#121212"
      onClick={onClick}
    >
      <Box borderRadius="4px" w="44px" h="44px" bgColor={color} />
      <Input
        pos="absolute"
        top="0"
        left="0"
        ref={inputRef}
        type="color"
        borderRadius="4px"
        w="44px"
        h="44px"
        opacity="0"
        value={color}
        onChange={onChange}
      />
    </Button>
  )
}

export default ColorButton
