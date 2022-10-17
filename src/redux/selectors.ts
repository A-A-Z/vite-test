import { RootState } from './store'

export const isActionModalOpen = ({ people }: RootState): boolean => people.activePersonId !== null

export const getActiverPerson = ({ people }: RootState): string | null => people.activePersonId

export const selectIsDeleteConfirmOpen = ({ people }: RootState) => people.deleteSelected.length > 0

export const selectDeleteSelected = ({ people }: RootState) => people.deleteSelected
