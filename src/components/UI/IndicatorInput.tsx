import { useEffect, useState, ChangeEvent } from 'react'
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai'

import SmallLoading from './SmallLoading'

type Props = {
  label: string
  placeholder: string
  value?: string
  validation?: { validator: (value: string) => boolean; message: string }[]
  changeHandler?: (key: string, value: string, isValid: boolean) => void
}

const IndicatorInput = ({ label, placeholder, value: initalValue, changeHandler, validation}: Props) => {
  const [value, setValue] = useState(initalValue || '')
  const [indicatorValidity, setIndicatorValidity] = useState<any>({isValid: true, message: ''})
  const [isTyping, setIsTyping] = useState(false)
  const keyName = (label.charAt(0).toLowerCase() + label.slice(1)).replace(/\s/g, '')

  useEffect(() => {
    const validationTimer = setTimeout(() => {
      setIsTyping(false)
      if (value && validation && validation.length > 0) {
        const validity = {isValid: true, message: ''}
        for(let i=0; i < validation.length; i++) {
          if(!validation[i].validator(value)) {
            validity.isValid = false
            validity.message = validation[i].message
          }
        }

        setIndicatorValidity(validity)
        if (changeHandler) changeHandler(keyName, value, validity.isValid)
      }
    }, 1000)

    return () => {
      if (changeHandler) changeHandler(keyName, value, false)
      setIsTyping(true)
      clearTimeout(validationTimer)
    }
  }, [value])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)

  const didChangeValue = value !== initalValue
  const isInvalid = value && !indicatorValidity.isValid && didChangeValue && !isTyping

  return (
    <div className="indicator-input">
      <label>{label}</label>
      <div className="input">
        <input
          className={isInvalid ? 'invalid' : ''}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
        />
        {value && isTyping && didChangeValue && <SmallLoading />}
        {value && indicatorValidity.isValid && didChangeValue && !isTyping && (<AiOutlineCheck className="success" />)}
        {isInvalid && (
          <>
            <AiOutlineClose className="danger" />
            <div className="validation-message">
              {indicatorValidity.message || 'Please provide a valid value.'}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default IndicatorInput
