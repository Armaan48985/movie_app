'use client'
import React from 'react'
import {signIn} from 'next-auth/react'

const Login = () => {
  return (
    <>
        <h1>LOGIN PAGE</h1>
        <button onClick={() => signIn('google')}>Login</button>
    </>
  )
}

export default Login