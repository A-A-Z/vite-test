import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectActiveDivisionId } from '../selectors'

/**
 * Custom React hook that invokes the given callback function when the route crumb is changed.
 * @param {function} callbackFn - The function to be invoked with the selected division id.
 * @returns {boolean} - Returns true if the current route crumb id does not match the selected id, false otherwise.
 */
export const useOnCrumbRouted = (callbackFn: (id: number) => void) => {
  const { divisionId } = useParams()
  const paramId = parseInt(divisionId ?? '0')
  const selectedId = useSelector(selectActiveDivisionId)
  const doesParamsSelectedMatch = (paramId !== 0 && paramId !== selectedId)

  useEffect(() => {
    if (doesParamsSelectedMatch) {
      callbackFn(paramId)
    }
  }, [divisionId])

  return doesParamsSelectedMatch
}
