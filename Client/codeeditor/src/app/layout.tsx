import axios from 'axios'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastBar, Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  

  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className=''>
      <body className={inter.className}>
      <div className="overlay"></div>
      <Toaster position="top-left"  />
         {children}</body>
    </html>
  )
}

