import { RefObject, useEffect, useState } from 'react'

export const useResize = (ref: RefObject<HTMLDivElement>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (ref.current) {
      setDimensions({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      })

      const onResize = () => {
        setDimensions({
          width: ref.current?.offsetWidth ?? 0,
          height: ref.current?.offsetHeight ?? 0,
        })
      }

      window.addEventListener('resize', onResize)

      return () => {
        window.removeEventListener('resize', onResize)
      }
    }
  }, [ref])

  return { width: dimensions.width, height: dimensions.height }
}
