// import { useEffect } from 'react'
import { useState } from 'react'

// const onEnter = (foo: React.MouseEvent<HTMLSpanElement>) => {
//   console.log(foo)
// }
// <span onMouseEnter={onEnter}>Test</span>

interface MousePopupProps {
  pos: number[]
  // isOpen: boolean
  // closeFn: () => void
  // confirmFn: () => void
  // confirmLabel?: string
  // cancelLabel?: string
  // titleTxt?: string
  // description?: React.ReactNode | string
  // isLoading?: boolean
  // loadingTxt?: string
}
export const MousePopup = ({ pos }: MousePopupProps) => {
  return <div style={{ position: 'absolute', width: '10px', height: '10px', backgroundColor: '#f00', left: pos[0], top: pos[1] }}></div>
}

export const MouseElement = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [pos, setPos] = useState([0, 0])
  const onEnter = (event: React.MouseEvent<HTMLSpanElement>) => {
    console.log(event)
    setPos([event.pageX, event.pageY])
    setIsOpen(true)
  }
  const onExit = () => {
    setIsOpen(false)
    setPos([0, 0])
  }
  return <button onMouseEnter={onEnter} onMouseOut={onExit}>Mouse over<br />{isOpen ? 'OPEN' : 'CLOSE'}<MousePopup pos={pos} /></button>
}

// addEventListener('mouseover', (event) => { console.log(event) })
