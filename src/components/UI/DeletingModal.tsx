import { useDispatch, useSelector } from 'react-redux'
import { VscClose } from 'react-icons/vsc'

import { uiActions } from '../../store/ui'
import { personsActions } from '../../store/persons'

import Modal from './Modal'

import { ReduxState } from '../../types/redux'
import Person from '../../types/person'

import { getPersonFullNameWithTitle } from '../../utils/persons'

const DeletingModal = () => {
  const { ui, persons } = useSelector((state: ReduxState) => state)
  const dispatch = useDispatch()

  const personId = ui.deletingModalPersonId
  const person = persons.results.find((person: Person) => person.login.uuid === personId)

  const closeHandler = () => dispatch(uiActions.setDeletingModalPersonId(null))

  const deletePersonHandler = () => {
    dispatch(personsActions.deletePerson(personId))
    closeHandler()
  }

  if (!person) return <></>

  return (
    <Modal isOpen closeHandler={closeHandler}>
      <div className="header">
        Are you sure?
        <VscClose onClick={closeHandler} />
      </div>
      <div className="warning">
        {`The next action is going to delete the user: ${getPersonFullNameWithTitle(person)}`}
        <div className="buttons">
          <button onClick={deletePersonHandler}>Delete</button>
          <button onClick={closeHandler}>Cancel</button>
        </div>
      </div>
    </Modal>
  )
}

export default DeletingModal
