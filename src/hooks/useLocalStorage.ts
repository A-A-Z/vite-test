import { useState, useEffect } from 'react'

/**
 * A hook that reads and writes to LocalStorage.
 *
 * @template T The type of the value being stored in LocalStorage.
 * @param {string} key The key to use for the LocalStorage item.
 * @param {T} initialValue The default value to use if there is no existing value in LocalStorage.
 * @returns {[T, (value: T) => void]} A tuple containing the current value and a function to update the value.
 */
export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue !== null ? JSON.parse(storedValue) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
