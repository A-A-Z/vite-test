import { useEffect, MutableRefObject } from 'react'

export enum ActionKeyCode {
  RIGHT = 'ArrowRight',
  LEFT = 'ArrowLeft',
  UP = 'ArrowUp',
  DOWN = 'ArrowDown',
  ENTER = 'Enter',
  SPACE = 'Space'
}

export type keyAction = {
  [key in ActionKeyCode]?: () => void
}

/**
 * Registers an event listener to handle navigation key events for a given component.
 *
 * @template T - The type of element to which the event listener should be attached.
 * @param {MutableRefObject<T | null>} ref - A mutable ref object pointing to the component element.
 * @param {keyAction} callbacks - An object containing a function to be called for each supported navigation key.
 */
export const useNavKey = <T extends Node>(ref: MutableRefObject<T | null>, callbacks: keyAction) => {
  const onKey = (event: Event) => {
    const { code } = event as KeyboardEvent
    const keyCallback = callbacks[code as ActionKeyCode]

    if (keyCallback !== undefined) {
      event.preventDefault()
      keyCallback()
    }
  }

  useEffect(() => {
    if (ref?.current) {
      ref.current.addEventListener('keydown', onKey)

      return () => {
        ref.current?.removeEventListener('keydown', onKey)
      }
    }
  }, [ref, callbacks])
}
