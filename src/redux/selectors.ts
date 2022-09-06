import { RootState } from './store'

export const isActionModalOpen = ({ people }: RootState): boolean => people.activePersonId !== null

export const getActiverPerson = ({ people }: RootState): string | null => people.activePersonId
