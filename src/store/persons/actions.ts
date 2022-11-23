import { Dispatch } from 'redux'
import axios from 'axios'

import { uiActions } from '../ui'
import { personsActions } from '.'

export const getInitalData = () => {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.get('https://randomuser.me/api/?results=10')
      dispatch(personsActions.setResults(data?.results || []))
    } catch (err: any) {
      dispatch(uiActions.setErrorModalMessage(err?.message || 'Network error occured.'))
    } finally {
      setTimeout(() => dispatch(uiActions.setIsLoading(false)), 1200)
      
    }
  }
}
