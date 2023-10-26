import './globals.css'
import type { Metadata } from 'next'
import Navbar from '../components/Navbar'

export const metadata: Metadata = {
  title: 'Animelist',
  description: 'Copy of a myanimelist',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='w-full'>
        <div className="z-50">
          <Navbar />
        </div>
        <div className="z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
