import type { RootState } from 'store/store'
import { Notice } from './types'

export const selectNotices = ({ notices }: RootState): Notice[] => notices.notices
