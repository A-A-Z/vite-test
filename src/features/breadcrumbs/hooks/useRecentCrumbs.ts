import { useLocalStorage } from 'hooks/useLocalStorage'
import { DivisionLevels } from 'features/divisions'

const MAX_RECENT_COUNT = 5

interface LocalStoreCrumb {
  id: number
  name: string
  breadcrumb: string
  level: DivisionLevels
  added: number
}

type LocalStoreBreadcrumbs = {
  [key in DivisionLevels]?: LocalStoreCrumb[]
}

const formatRecentCrumbs = (crumbs: LocalStoreCrumb[]) => {
  if (crumbs.length === 0) {
    return []
  }

  return crumbs.sort((a, b) => b.added - a.added).slice(0, MAX_RECENT_COUNT)
}

export const useRecentCrumbs = (level: DivisionLevels) => {
  const [localBreadcrumbs, setLocalBreadcrumbs] = useLocalStorage<LocalStoreBreadcrumbs>('breadcrumbs', {})

  const recentCrumbs: LocalStoreCrumb[] = formatRecentCrumbs(localBreadcrumbs[level] ?? [])

  const addCrumb = () => null

  return { recentCrumbs, addCrumb }
}
