'use client'

import { useEffect, useState } from 'react'
import ContentLoader from 'react-content-loader'

interface SkeletonBoardProps {
  className?: string
}

const SkeletonBoard = ({ className }: SkeletonBoardProps) => {
  const [isClientSide, setIsClientSide] = useState<boolean>(false)

  useEffect(() => setIsClientSide(typeof window !==  'undefined' ? true : false), [])

  if (!isClientSide) return  <p></p>

  return (
    <ContentLoader
      id='1'
      viewBox="0 0 778 116"
      width={778}
      height={116}
      className={`${className}`}
    >
      <rect x="37" y="34" rx="0" ry="0" width="0" height="0" />
      <rect x="28" y="29" rx="0" ry="0" width="258" height="32" />
      <rect x="28" y="71" rx="0" ry="0" width="465" height="32" />
      <rect x="434" y="94" rx="0" ry="0" width="0" height="0" />
      <rect x="29" y="116" rx="0" ry="0" width="749" height="32" />
    </ContentLoader>
  )
}


SkeletonBoard.metadata = {
  name: 'Silvestri Javier',
  github: 'di4m0nds',
  description: 'SkeletonBoard',
  filename: 'SkeletonBoard',
}

export default SkeletonBoard
