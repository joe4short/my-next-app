import React from 'react'
import Link from 'next/link'
const navigationPage = () => {
  return (
    <div className='flex items-start justify-start space-x-5'>
      <nav><Link className='text-xl text-blue-800' href='/login' >Login</Link></nav>
      <nav><Link className='text-xl text-blue-800' href='/registration'>Registration</Link></nav>
      <nav><Link className='text-xl text-blue-800' href='/homepage'>Home</Link></nav>
      <nav><Link className='text-xl text-blue-800' href='/Contact'>Contact</Link></nav>
      <nav><Link className='text-xl text-blue-800' href='/profile'>Profile</Link></nav>
    </div>
  )
}

export default navigationPage
