import { useSelector } from 'react-redux'

import BigLoading from '../UI/BigLoading'
import PersonCard from '../UI/PersonCard'

import { ReduxState } from '../../types/redux'
import Person from '../../types/person'
import { filteredPersons } from '../../utils/persons'

const Users = () => {
  const { persons, ui } = useSelector((state: ReduxState) => state)

  return (
    <main>
      {ui.isLoading ? 
        <BigLoading /> : 
        filteredPersons(persons.searchTerm, persons.results).map(
          (person: Person) => <PersonCard key={person.login.uuid} {...person} />
        )}
    </main>
  )
}

export default Users
