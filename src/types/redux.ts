import Person from './person'

export interface ReduxState {
  persons: personsState
  ui: uiState
}

export interface personsState {
  results: Person[]
  searchTerm: string
}

export interface uiState {
  isLoading: boolean
  editingModalPersonId: null | string
  errorModalMessage: null | string
  deletingModalPersonId: null | string
  creatingModal: boolean
}
