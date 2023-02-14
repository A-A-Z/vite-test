import React, { createContext, useState, useMemo, useContext, useCallback, KeyboardEvent } from 'react'

type ActionKeyCode = 'ArrowRight' | 'ArrowLeft' | 'ArrowUp' | 'ArrowDown' | 'Enter' | 'Space'

interface KeyEvent {
  key: ActionKeyCode | null
}

interface KeyNavContextValue {
  // key: KeyEvent,
  onKeyNavEvent: (event: KeyboardEvent<HTMLDivElement>) => void
}

export const KeyNavContext = createContext<KeyNavContextValue>({
  // key: { key: null },
  onKeyNavEvent: () => null
})

interface KeyNavProviderProps {
  children: React.ReactNode
  subscribedActions: ActionKeyCode[]
}

export const KeyNavProvider = ({ children, subscribedActions }: KeyNavProviderProps) => {
  const [key, setKey] = useState<KeyEvent>({ key: null })

  const onKeyNavEvent = useCallback((event: KeyboardEvent<HTMLDivElement>) => { // TODO generic
    const { code } = event
    if (subscribedActions.indexOf(code as ActionKeyCode) === -1) {
      return
    }
    event.preventDefault()
    console.log('key', code)
    setKey({ key: code as ActionKeyCode })
  }, [])

  // const subscribe = () => {

  // }

  // const value = useMemo(() => ({
  //   key,
  //   onKeyNavEvent
  // }), [])
  // const value = {
  //   key,
  //   onKeyNavEvent
  // }
  const value = {
    onKeyNavEvent
  }

  return (
    <KeyNavContext.Provider value={value}>
      {children}
    </KeyNavContext.Provider>
  )
}

export const useKeyEvent = () => useContext(KeyNavContext)
