import MenuButton from './MenuButton'

const Menu = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '45px',
        gap: '5px',
        backgroundColor: '#212121',
        borderBottom: '1px #424242 solid',
      }}
    >
      <MenuButton />
      <MenuButton />
      <MenuButton />
      <MenuButton />
    </div>
  )
}

export default Menu
