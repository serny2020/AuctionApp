import React from 'react'
import { IoCarSport } from "react-icons/io5";
import Logo from './Logo';
import Search from './Search';

export default function Navbar() {
  return (
    <header className='sticky top-0 z-50 flex justify-between bg-white shadow-md py-5 px-5 items-center text-gray-800'>
      <Logo/>
      <Search/>
      <div>Login</div>
    </header>
  )
}
