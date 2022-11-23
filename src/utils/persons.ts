import Person from '../types/person'

export const getPersonFullName = ({name}: Person) => `${name.first} ${name.last}`

export const getPersonFullNameWithTitle = ({name}: Person) => `${name.title} ${name.first} ${name.last}`

export const getPersonLocation = (person: Person) => `${person.location.country}, ${person.location.city}, ${getPersonStreet(person)}`

export const getPersonStreet = ({location}: Person) => `${location.street.name} ${location.street.number}`

export const getPersonStreetObject = (street: any) => {
    const streetNumber = street.match(/\d+$/)[0]
    return {
        number: streetNumber,
        name: street.replace(streetNumber, '')
    }
}

export const getNameObject = (name: any) => {
    const names = name.split(' ')
    return {
        first: names.slice(0, -1).join(' '),
        last: names[names.length - 1]
    }
}

export const filteredPersons = (searchTerm: string, persons: Person[]) => {
    return persons.filter((person: Person) =>
      getPersonFullNameWithTitle(person).toLocaleLowerCase().includes(searchTerm) ||
      person.email.toLocaleLowerCase().includes(searchTerm) ||
      getPersonLocation(person).toLocaleLowerCase().includes(searchTerm)
    )
}
  