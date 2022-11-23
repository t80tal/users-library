import { RiCloseFill } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'

import { uiActions } from '../../store/ui'

import { ReduxState } from '../../types/redux'

const ErrorModal = () => {
  const errorModalMessage = useSelector((state: ReduxState) => state.ui.errorModalMessage)
  const dispatch = useDispatch()

  const closeHandler = () => dispatch(uiActions.setErrorModalMessage(null))

  return (
    <div className={`error-modal ${errorModalMessage ? 'active' : ''}`}>
      {errorModalMessage}
      <RiCloseFill onClick={closeHandler} />
    </div>
  )
}

export default ErrorModal
