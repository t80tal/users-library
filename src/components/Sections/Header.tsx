import { useRef, RefObject, ChangeEventHandler } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { personsActions } from '../../store/persons'

import { uiActions } from '../../store/ui'

const Header = () => {
  const searchRef = useRef() as RefObject<HTMLInputElement>
  const dispatch = useDispatch()

  const searchHandler: ChangeEventHandler<HTMLInputElement> = (e) => 
    dispatch(personsActions.setSearchTerm(e.target.value.toLocaleLowerCase()))

  return (
    <header>
      <div className="logo" onClick={() => window.location.reload()}>Users Library</div>
      <div className="right">
        <div className="search" onClick={() => searchRef.current?.focus()}>
          <RiSearch2Line />
          <input onChange={searchHandler} ref={searchRef} type="text" placeholder="Search users..." />
        </div>
        <button onClick={() => dispatch(uiActions.setCreatingModal(true))}>Add user</button>
      </div>
    </header>
  )
}

export default Header
