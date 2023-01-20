import { useEffect, MutableRefObject } from 'react'

/**
 * Custom Hook that sets up an event listener to detect clicks outside of a given element.
 * @param ref - A reference to the element that you want to detect clicks outside of.
 * @param callback - A callback function that will be invoked when a click outside of the element is detected.
 */
export const useClickOutside = (ref: MutableRefObject<HTMLInputElement | null>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}
