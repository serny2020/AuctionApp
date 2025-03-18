'use client'

import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from 'react-icons/ai'
import { HiCog, HiUser } from 'react-icons/hi2'

type Props = {
  user: Partial<User>
}

export default function UserActions({ user }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
      >
        Welcome {user.name}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {/* My Auctions */}
          <Link href="/">
            <div className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
              <HiUser className="mr-2" />
              My Auctions
            </div>
          </Link>

          {/* Auctions won */}
          <Link href="/">
            <div className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
              <AiFillTrophy className="mr-2" />
              Auctions won
            </div>
          </Link>

          {/* Sell my car */}
          <Link href="/">
            <div className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
              <AiFillCar className="mr-2" />
              Sell my car
            </div>
          </Link>

          {/* Session */}
          <Link href="/session">
            <div className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
              <HiCog className="mr-2" />
              Session (dev only)
            </div>
          </Link>

          <div className="border-t border-gray-200 my-1" />

          {/* Sign out */}
          {/* This sign out doesn't affect sign in status of Identity server, and signOut function is
              a client side function. User will be redirected to homePage after signOut. */}
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
          >
            <AiOutlineLogout className="mr-2" />
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}
