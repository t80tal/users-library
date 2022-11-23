import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { personsActions } from '../../store/persons'
import { uiActions } from '../../store/ui'

import Person from '../../types/person'
import { ReduxState } from '../../types/redux'

import { getPersonFullName, getPersonStreet } from '../../utils/persons'
import {
  cityValidator,
  countryValidator,
  emailValidator,
  fullnameValidator,
  streetValidator,
} from '../../utils/validators'

import IndicatorInput from '../UI/IndicatorInput'

const EditingForm = (person: Person) => {
  const dispatch = useDispatch()
  const [formFields, setFormFields] = useState({
    name: { isValid: true, value: null },
    email: { isValid: true, value: null },
    country: { isValid: true, value: null },
    city: { isValid: true, value: null },
    street: { isValid: true, value: null },
  })

  const changeHandler = (key: string, value: string, isValid: boolean) => {
    setFormFields((prev) => ({...prev,[key]: {value, isValid: isValid}}))
  }

  const isFormValid =
    formFields.name.isValid &&
    formFields.email.isValid &&
    formFields.country.isValid &&
    formFields.city.isValid &&
    formFields.street.isValid

  const closeHandler = () => dispatch(uiActions.setEditingModalPersonId(null))

  const updateHandler = () => {
    const updatedPersonData = {
      name: formFields.name.value,
      email: formFields.email.value,
      country: formFields.country.value,
      city: formFields.city.value,
      street: formFields.street.value,
    }
    dispatch(personsActions.updateUser({ id: person.login.uuid, updatedPersonData }))
    closeHandler()
  }

  const personsEmails = useSelector((state: ReduxState) => state.persons.results).map((p: Person) => p.email)

  return (
    <>
      <div className="fields">
        <IndicatorInput
          label="Name"
          placeholder="Example: John Doe"
          value={getPersonFullName(person)}
          validation={[{validator: fullnameValidator, message: 'Please provide your valid full name.'}]}
          changeHandler={changeHandler}
        />
        <IndicatorInput
          label="Email"
          placeholder="example@gmail.com"
          value={person.email}
          validation={[
            {validator: emailValidator, message: 'Please provide a valid email address.'},
            {validator: (e: string) => !personsEmails.includes(e) || e === person.email, message: 'Email address is taken.'}
          ]}
          changeHandler={changeHandler}
        />
        <IndicatorInput
          label="Country"
          placeholder="Example: Israel"
          value={person.location.country}
          validation={[{validator: countryValidator, message: 'Please provide a valid country.'}]}
          changeHandler={changeHandler}
        />
        <IndicatorInput
          label="City"
          placeholder="Example: Tel Aviv"
          value={person.location.city}
          validation={[{validator: cityValidator, message: 'Please provide a valid city'}]}
          changeHandler={changeHandler}
        />
        <IndicatorInput
          label="Street"
          placeholder="Example: Hertzel 14"
          value={getPersonStreet(person)}
          validation={[{validator: streetValidator, message: 'Valid street address must ends with number.'}]}
          changeHandler={changeHandler}
        />
      </div>
      <div className="buttons">
        <button onClick={closeHandler}>Cancel</button>
        <button onClick={updateHandler} disabled={!isFormValid}>
          Save
        </button>
      </div>
    </>
  )
}

export default EditingForm
