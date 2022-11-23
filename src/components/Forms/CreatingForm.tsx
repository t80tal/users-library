import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { personsActions } from '../../store/persons'
import { uiActions } from '../../store/ui'

import { ReduxState } from '../../types/redux'
import Person from '../../types/person'

import {
  titleValidator,
  pictureValidator,
  cityValidator,
  countryValidator,
  emailValidator,
  fullnameValidator,
  streetValidator,
} from '../../utils/validators'

import IndicatorInput from '../UI/IndicatorInput'

const CreatingForm = () => {
  const dispatch = useDispatch()
  const [formFields, setFormFields] = useState({
    title: { isValid: false, value: '' },
    name: { isValid: false, value: '' },
    picture: { isValid: false, value: '' },
    email: { isValid: false, value: '' },
    country: { isValid: false, value: '' },
    city: { isValid: false, value: '' },
    street: { isValid: false, value: '' },
  })
  
  const changeHandler = (key: string, value: string, isValid: boolean) => {
    setFormFields((prev) => ({...prev,[key]: {value, isValid: isValid}}))
  }
  
  const isFormValid =
  formFields.title.isValid &&
  formFields.name.isValid &&
  formFields.picture.isValid &&
  formFields.email.isValid &&
  formFields.country.isValid &&
  formFields.city.isValid &&
  formFields.street.isValid
  
  const closeHandler = () => dispatch(uiActions.setCreatingModal(false))
  
  const updateHandler = () => {
    const newPersonData = {
      title: formFields.title.value,
      name: formFields.name.value,
      picture: formFields.picture.value,
      email: formFields.email.value,
      country: formFields.country.value,
      city: formFields.city.value,
      street: formFields.street.value,
    }
    dispatch(personsActions.createPerson(newPersonData))
    closeHandler()
  }
  
  const personsEmails = useSelector((state: ReduxState) => state.persons.results).map((p: Person) => p.email)
  
  return (
    <>
      <div className="fields">
        <IndicatorInput
          label="Title"
          placeholder="Example: Mrs"
          validation={[{validator: titleValidator, message: 'Please provide a name title.'}]}
          changeHandler={changeHandler}
        />
        <IndicatorInput
          label="Name"
          placeholder="Example: John Doe"
          validation={[{validator: fullnameValidator, message: 'Please provide your valid full name.'}]}
          changeHandler={changeHandler}
        />
        <IndicatorInput
          label="Picture"
          placeholder="Example: https://www.example.com/square.jpg"
          validation={[{validator: pictureValidator, message: 'Please provide a valid image link.'}]}
          changeHandler={changeHandler}
        />
        <IndicatorInput
          label="Email"
          placeholder="example@gmail.com"
          validation={[
            {validator: emailValidator, message: 'Please provide a valid email address.'},
            {validator: (e: string) => !personsEmails.includes(e), message: 'Email address is taken.'}
          ]}
          changeHandler={changeHandler}
        />
        <IndicatorInput
          label="Country"
          placeholder="Example: Israel"
          validation={[{validator: countryValidator, message: 'Please provide a valid country.'}]}
          changeHandler={changeHandler}
        />
        <IndicatorInput
          label="City"
          placeholder="Example: Tel Aviv"
          validation={[{validator: cityValidator, message: 'Please provide a valid city'}]}
          changeHandler={changeHandler}
        />
        <IndicatorInput
          label="Street"
          placeholder="Example: Hertzel 14"
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

export default CreatingForm
