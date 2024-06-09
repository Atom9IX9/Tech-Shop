import { useState } from "react"

export const useCount = (startValue: number) => {
  const [count, setCount] = useState(startValue)
  const increment = () => setCount(count + 1)
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  return { count, increment, decrement }
}