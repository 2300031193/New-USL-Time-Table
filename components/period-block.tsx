"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Clock, MapPin, Coffee, Utensils } from "lucide-react"

interface Period {
  start: string
  end: string
  numbers: number[]
  time: string
  type?: string
  name?: string
}

interface Subject {
  period: number
  subject: string
  room: string
}

interface PeriodBlockProps {
  period: Period
  subjects: Subject[]
}

export function PeriodBlock({ period, subjects }: PeriodBlockProps) {
  const blockRef = useRef<HTMLDivElement>(null)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const block = blockRef.current
    if (!block) return

    const handleMouseEnter = () => {
      gsap.to(block, {
        scale: 1.02,
        boxShadow: "0 0 30px rgba(34, 197, 94, 0.3)",
        duration: 0.3,
        ease: "power2.out",
      })
      setShowTooltip(true)
    }

    const handleMouseLeave = () => {
      gsap.to(block, {
        scale: 1,
        boxShadow: "0 0 0px rgba(34, 197, 94, 0)",
        duration: 0.3,
        ease: "power2.out",
      })
      setShowTooltip(false)
    }

    block.addEventListener("mouseenter", handleMouseEnter)
    block.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      block.removeEventListener("mouseenter", handleMouseEnter)
      block.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  if (period.type === "break") {
    return (
      <div
        ref={blockRef}
        className="relative backdrop-blur-md bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 transition-all duration-300"
      >
        <div className="flex items-center space-x-3">
          {period.name?.includes("Lunch") ? (
            <Utensils className="w-6 h-6 text-amber-400" />
          ) : (
            <Coffee className="w-6 h-6 text-amber-400" />
          )}
          <div>
            <h4 className="text-lg font-semibold text-amber-400">{period.name}</h4>
            <p className="text-amber-300/80 text-sm">{period.time}</p>
          </div>
        </div>
      </div>
    )
  }

  if (subjects.length === 0) {
    return (
      <div
        ref={blockRef}
        className="relative backdrop-blur-md bg-slate-800/20 border border-slate-600/30 rounded-xl p-4 transition-all duration-300"
      >
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-slate-400">Free Period</h4>
            <p className="text-slate-500 text-sm">{period.time}</p>
          </div>
          <Clock className="w-5 h-5 text-slate-500" />
        </div>
      </div>
    )
  }

  // Check if we should merge periods (same subject across multiple periods)
  const uniqueSubjects = [...new Set(subjects.map((s) => s.subject))]
  const mergedSubject = uniqueSubjects.length === 1 ? subjects[0] : subjects[0]

  return (
    <div
      ref={blockRef}
      className="relative backdrop-blur-md bg-green-500/10 border border-green-500/30 rounded-xl p-4 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-green-400 mb-1">{mergedSubject.subject}</h4>
          <div className="flex items-center space-x-4 text-sm text-green-300/80">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{period.time}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{mergedSubject.room}</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-green-400/60 mb-1">
            Period{period.numbers.length > 1 ? "s" : ""} {period.numbers.join(", ")}
          </div>
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute top-full left-0 mt-2 p-3 backdrop-blur-md bg-green-900/90 border border-green-500/50 rounded-lg shadow-xl z-50 min-w-64">
          <div className="space-y-2">
            <div>
              <span className="text-green-400 font-semibold">Subject:</span>
              <span className="text-green-200 ml-2">{mergedSubject.subject}</span>
            </div>
            <div>
              <span className="text-green-400 font-semibold">Room:</span>
              <span className="text-green-200 ml-2">{mergedSubject.room}</span>
            </div>
            <div>
              <span className="text-green-400 font-semibold">Time:</span>
              <span className="text-green-200 ml-2">{period.time}</span>
            </div>
            <div>
              <span className="text-green-400 font-semibold">Duration:</span>
              <span className="text-green-200 ml-2">
                {period.numbers.length > 1 ? "Double Period" : "Single Period"}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
