import { useSelector, useDispatch } from 'react-redux'
import { VscClose } from 'react-icons/vsc'

import { ReduxState } from '../../types/redux'

import Modal from './Modal'
import CreatingForm from '../Forms/CreatingForm'

import { uiActions } from '../../store/ui'

const CreatingModal = () => {
  const { ui } = useSelector((state: ReduxState) => state)
  const dispatch = useDispatch()

  const isCreating = ui.creatingModal

  const closeHandler = () => dispatch(uiActions.setCreatingModal(false))

  if (!isCreating) return <></>

  return (
    <Modal className="long-modal" isOpen closeHandler={closeHandler}>
      <div className="header">
        Creating a new user
        <VscClose onClick={closeHandler} />
      </div>
      <CreatingForm />
    </Modal>
  )
}

export default CreatingModal
