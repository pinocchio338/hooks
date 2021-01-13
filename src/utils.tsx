import * as React from 'react'

/**
 *
 * @param {String} key The key to set in localStorage for this value
 * @param {Object} defaultValue The value to use if it is not already in localStorage
 * @param {{serialize: Function, deserialize: Function}} options The serialize and deserialize functions to use (defaults to JSON.stringify and JSON.parse respectively)
 */

type UseLocalStorageOptions<TState = unknown> = {
  serialize?: (data: TState) => string
  deserialize?: (str: string) => TState
}
function useLocalStorageState<TState>(
  key: string,
  defaultValue: TState | (() => TState),
  {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  }: UseLocalStorageOptions<TState> = {},
) {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage)
    }
    // can't do typeof because:
    // https://github.com/microsoft/TypeScript/issues/37663#issuecomment-759728342
    return defaultValue instanceof Function ? defaultValue() : defaultValue
  })

  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState] as const
}

export {useLocalStorageState}
