import { createSlice } from '@reduxjs/toolkit'
import uuid from 'react-uuid'

import Person from '../../types/person'
import { personsState } from '../../types/redux'

import { getNameObject, getPersonStreetObject } from '../../utils/persons'

const initialState: personsState = {
  results: [],
  searchTerm: ''
}

const personsSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    setResults(state, action) {
      state.results = action.payload
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload
    },
    deletePerson(state, action) {
      state.results.splice(state.results.findIndex((p: Person) => p.login.uuid === action.payload), 1)
    },
    updateUser(state, action) {
      const { id, updatedPersonData } = action.payload
      const { name, email, country, city, street } = updatedPersonData
      const { number, name: streetName } = getPersonStreetObject(street)
      const { first, last } = getNameObject(name)

      const requiredPersonIndex = state.results.findIndex((p: Person) => p.login.uuid === id)
      const requiredPerson = state.results[requiredPersonIndex]

      requiredPerson.name.first = first
      requiredPerson.name.last = last
      requiredPerson.email = email
      requiredPerson.location.country = country
      requiredPerson.location.city = city
      requiredPerson.location.street.number = number
      requiredPerson.location.street.name = streetName

      state.results[requiredPersonIndex] = requiredPerson
    },
    createPerson(state: any, action) {
      const { title, name, picture, email, country, city, street } = action.payload
      const { number, name: streetName } = getPersonStreetObject(street)
      const { first, last } = getNameObject(name)

      const newPerson = {
        name: {
          title,
          first,
          last,
        },
        picture: {
          medium: picture,
        },
        email,
        location: {
          country,
          city,
          street: {
            number,
            name: streetName,
          },
        },
        login: {
          uuid: uuid(),
        },
      }
      state.results = [...state.results, newPerson]
    },
  },
})

export const personsActions = personsSlice.actions
export const personsReducer = personsSlice.reducer
