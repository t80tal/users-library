import { configureStore } from '@reduxjs/toolkit'

import { personsReducer } from './persons'
import { uiReducer } from './ui'

const store = configureStore({
  reducer: {
    ui: uiReducer,
    persons: personsReducer,
  },
})

export default store
