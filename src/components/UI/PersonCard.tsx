import {useDispatch} from 'react-redux'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { MdOutlineLocationCity, MdOutlineEmail } from 'react-icons/md'

import Person from '../../types/person'

import { uiActions } from '../../store/ui'

import { getPersonFullNameWithTitle, getPersonLocation } from '../../utils/persons'

const PersonCard = (person: Person) => {
  const dispatch = useDispatch()
  
  const presonLocation = getPersonLocation(person)
  const presonFullName = getPersonFullNameWithTitle(person)

  return (
    <div className="person-card">
      <img src={person.picture.medium} alt={`${presonFullName}'s picture`} />
      <div className="details">
        <h3 className="name">{presonFullName}</h3>
        <div className="email" onClick={() => window.open(`mailto:${person.email}`, '_blank')}>
          <MdOutlineEmail />{person.email}
        </div>
        <div className="location"
          onClick={() => window.open(`https://maps.google.com/?q=${presonLocation}`, '_blank')} >
          <MdOutlineLocationCity />{presonLocation}
        </div>
      </div>
      <button className="delete-button" 
        onClick={() => dispatch(uiActions.setDeletingModalPersonId(person.login.uuid))}>
        <AiOutlineDelete />
      </button>
      <button className="edit-button" 
        onClick={() => dispatch(uiActions.setEditingModalPersonId(person.login.uuid))}>
        <AiOutlineEdit />
      </button>
    </div>
  )
}

export default PersonCard
