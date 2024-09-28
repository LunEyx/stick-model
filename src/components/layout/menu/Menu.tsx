import LoadButton from './LoadButton'
import SaveButton from './SaveButton'

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
      <SaveButton />
      <LoadButton />
    </div>
  )
}

export default Menu
