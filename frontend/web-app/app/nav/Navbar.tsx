import React from 'react'
import Logo from './Logo';
import Search from './Search';
import LoginButton from './LogInButton';

export default function Navbar() {
  return (
    <header className='sticky top-0 z-50 flex justify-between bg-white shadow-md py-5 px-5 items-center text-gray-800'>
      <Logo/>
      <Search/>
      <LoginButton/>
    </header>
  )
}
