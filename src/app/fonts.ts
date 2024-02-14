import { Inter, Quicksand, Roboto } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quicksand',
})

export const roboto = Roboto({
  weight: ['100' , '300' , '400' , '500' , '700' , '900'],
  style: 'normal',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
})
