import React from 'react'
import { ErrorIcon, InfoIcon, SuccessIcon, WarningIcon } from '../svg'
import { ToastStatus } from '@/app/types/toast'

interface ToastProps {
  varient: ToastStatus
  heading: string
  isToastVisible: boolean
}

const Toast = ({ varient, heading, isToastVisible }: ToastProps) => (
  <>
    {isToastVisible && (
      <div className="dark:bg-zinc-800 bg-white w-80 h-12 rounded-full ring-2 ring-white/30 shadow-xl fixed top-4 pill-animation z-50 hover:scale-105 duration-200">
        <div className="flex justify-between items-center h-full w-full px-2 gap-4 inner-animation">
          <h1 className="text-2xl dark:text-white text-black font-bold pl-2">K<span className="text-lime-500">b</span></h1>
          <p className="dark:text-zinc-300 text-gray-500 font-medium">{heading}</p>
          {getToastSymbolIcon(varient)}
        </div>
      </div>
    )}
  </>
)

export default Toast


function getToastSymbolIcon(varient: ToastStatus) {
  const circleStyle = 'flex justify-center items-center rounded-full h-10 w-10'
  const iconStyle = 'w-8 h-8'

  switch (varient) {
  case 'success':
    return (
      <span className={`${circleStyle} bg-green-300/20`}>
        <SuccessIcon className={`${iconStyle} text-green-300`} />
      </span>
    )
  case 'error':
    return (
      <span className={`${circleStyle} bg-red-300/20`}>
        <ErrorIcon className={`${iconStyle} text-red-300`} />
      </span>
    )
  case 'warning':
    return (
      <span className={`${circleStyle} bg-yellow-300/20`}>
        <WarningIcon className={`${iconStyle} text-yellow-300`} />
      </span>
    )
  case 'info':
    return (
      <span className={`${circleStyle} bg-blue-300/20`}>
        <InfoIcon className={`${iconStyle} text-blue-300`} />
      </span>
    )
  }
}
