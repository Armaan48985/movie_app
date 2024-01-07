import { getServerActionDispatcher } from 'next/dist/client/components/app-router'
import './globals.css'
import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
// import { SessionProvider } from 'next-auth/react'
import SessionProvider from './SessionProvider'
import Login from '@/components/Login'
import Home from './page'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {!session ? (
            <Login/>
          ) : (
            <Home/>
          )}
        </SessionProvider>
      </body>
    </html>
  )
}
