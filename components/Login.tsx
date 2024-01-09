'use client'
import React from 'react';
import { signIn } from 'next-auth/react';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-transparent flex flex-col items-center p-16 rounded-xl  border-2 border-slate-700">
        <h1 className="text-6xl font-semibold mb-16">Welcome to our Movies App ! </h1>
        <button
          onClick={() => signIn('google')}
          className="bg-blue-500 hover:bg-blue-600 text-white uppercase font-bold py-3 px-8 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;