import DeletingModal from './DeletingModal'
import EditingModal from './EditingModal'
import ErrorModal from './ErrorModal'
import CreatingModal from './CreatingModal'

const Modals = () => {
  return (
    <>
      <EditingModal />
      <ErrorModal />
      <DeletingModal />
      <CreatingModal />
    </>
  )
}

export default Modals
