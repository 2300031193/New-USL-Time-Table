"use client"

import { useState, useEffect } from "react"
import { TimetableInterface } from "@/components/timetable-interface"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-mint-50 to-cyan-50 relative overflow-hidden">
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <TimetableInterface />
      </div>
    </div>
  )
}
