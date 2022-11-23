import { useDispatch } from 'react-redux'

import Footer from './components/Sections/Footer'
import Header from './components/Sections/Header'
import Modals from './components/UI/Modals'
import Users from './components/Sections/Users'

import { getInitalData } from './store/persons/actions'

const App = () => {
  const dispatch = useDispatch<any>()

  dispatch(getInitalData())

  return (
    <>
      <Header />
      <Users />
      <Modals />
      <Footer />
    </>
  )
}

export default App
