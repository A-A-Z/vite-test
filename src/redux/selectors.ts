import { RootState } from './store'
import { Person } from '../global/types'

export const isActionModalOpen = ({ people }: RootState): boolean => people.activePerson !== null

export const getActiverPerson = ({ people }: RootState): Person | null => people.activePerson
