import React from 'react'
import Link from 'next/link'
const navigationPage = () => {
  return (
    <div className='flex items-start justify-start space-x-5'>
      <nav><Link className='text-blue-800' href='/login'>Login</Link></nav>
      <nav><Link className='text-blue-800' href='/registration'>Registration</Link></nav>
      <nav><Link className='text-blue-800' href='/'>Home</Link></nav>
      <nav><Link className='text-blue-800' href='/contact'>Contact</Link></nav>
      <nav><Link className='text-blue-800' href='/login'>Profile</Link></nav>
    </div>
  )
}

export default navigationPage
