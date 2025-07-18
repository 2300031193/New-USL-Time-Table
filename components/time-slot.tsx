"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Clock } from "lucide-react"

interface TimeSlotProps {
  period: {
    id: number
    time: string
    label: string
    isBreak?: boolean
  }
}

export function TimeSlot({ period }: TimeSlotProps) {
  const slotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const slot = slotRef.current
    if (!slot) return

    const handleMouseEnter = () => {
      gsap.to(slot, {
        x: 5,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(slot, {
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    slot.addEventListener("mouseenter", handleMouseEnter)
    slot.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      slot.removeEventListener("mouseenter", handleMouseEnter)
      slot.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={slotRef}
      className={`h-16 rounded-lg border flex items-center px-3 transition-all duration-300 ${
        period.isBreak
          ? "bg-amber-500/10 border-amber-500/30"
          : "bg-green-900/20 border-green-500/30 hover:border-green-400/50"
      }`}
    >
      <div className="flex items-center space-x-3">
        <Clock className={`w-4 h-4 ${period.isBreak ? "text-amber-400" : "text-green-400"}`} />
        <div>
          <div className={`font-semibold text-sm ${period.isBreak ? "text-amber-400" : "text-green-400"}`}>
            {period.label}
          </div>
          <div className={`text-xs ${period.isBreak ? "text-amber-300/70" : "text-green-300/70"}`}>{period.time}</div>
        </div>
      </div>
    </div>
  )
}
