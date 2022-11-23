import { useSelector, useDispatch } from 'react-redux'
import { VscClose } from 'react-icons/vsc'

import { ReduxState } from '../../types/redux'
import Person from '../../types/person'

import Modal from './Modal'
import EditingForm from '../Forms/EditingForm'

import { getPersonFullNameWithTitle } from '../../utils/persons'

import { uiActions } from '../../store/ui'

const EditingModal = () => {
  const { ui, persons } = useSelector((state: ReduxState) => state)
  const dispatch = useDispatch()

  const person = persons.results.find((person: Person) => person.login.uuid === ui.editingModalPersonId)

  const closeHandler = () => {
    dispatch(uiActions.setEditingModalPersonId(null))
  }

  if (!person) return <></>

  const personFullName = getPersonFullNameWithTitle(person)

  return (
    <Modal isOpen closeHandler={closeHandler}>
      <div className="header">
        <img src={person.picture.medium} alt={`${personFullName}'s picture`} />
        {personFullName}
        <VscClose onClick={closeHandler} />
      </div>
      <EditingForm {...person} />
    </Modal>
  )
}

export default EditingModal
