'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { DarkMode, LightMode } from '../svg'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState<boolean>(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return (
    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8 9 3 3-3 3m5 0h3M4 19h16c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1H4a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z"/>
    </svg>
  )

  return resolvedTheme === 'dark' ? (
    <button type="button" onClick={() => setTheme('light')}><LightMode className="w-5 h-5" /></button>
  ) : (
    <button type="button" onClick={() => setTheme('dark')}><DarkMode className="w-5 h-5" /></button>
  )
}

export default ThemeSwitch
