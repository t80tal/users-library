import { createSlice } from '@reduxjs/toolkit'

import { uiState } from '../../types/redux'

const initialState: uiState = {
  isLoading: true,
  editingModalPersonId: null,
  deletingModalPersonId: null,
  errorModalMessage: null,
  creatingModal: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload
    },
    setEditingModalPersonId(state, action) {
      state.editingModalPersonId = action.payload
    },
    setErrorModalMessage(state, action) {
      state.errorModalMessage = action.payload
    },
    setDeletingModalPersonId(state, action) {
      state.deletingModalPersonId = action.payload
    },
    setCreatingModal(state, action) {
      state.creatingModal = action.payload
    },
  },
})

export const uiActions = uiSlice.actions
export const uiReducer = uiSlice.reducer
