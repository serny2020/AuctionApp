import Link from "next/link"
import React from "react"

export default function UserActions() {
  return (
    <Link href="/session">
      <button className="px-4 py-2 border rounded-md text-blue-600 border-blue-600 hover:bg-blue-100">
        Session
      </button>
    </Link>
  )
}
