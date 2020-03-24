// useEffect: persistent state
// http://localhost:3000/isolated/final/03.js

import React from 'react'

function Counter({step = 1, initialCount = 0}) {
  const [count, setCount] = React.useState(
    Number(window.localStorage.getItem('count') || initialCount),
  )

  React.useEffect(() => {
    window.localStorage.setItem('count', count)
  })

  const increment = () => setCount(c => c + step)

  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
