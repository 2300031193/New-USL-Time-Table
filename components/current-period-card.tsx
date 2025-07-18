"use client"

import { useState, useEffect } from "react"
import { Clock, MapPin } from "lucide-react"
import { periods, timetableData } from "@/lib/timetable-data"

export function CurrentPeriodCard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentPeriod, setCurrentPeriod] = useState<any>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const now = currentTime
    const currentTimeString = now.toTimeString().slice(0, 5)
    const currentDay = now.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()

    // Find current period
    const activePeriod = periods.find((period) => {
      const startTime = period.start
      const endTime = period.end
      return currentTimeString >= startTime && currentTimeString <= endTime
    })

    if (activePeriod && timetableData[currentDay as keyof typeof timetableData]) {
      const daySchedule = timetableData[currentDay as keyof typeof timetableData]
      const currentSubjects = daySchedule.filter((s) => activePeriod.numbers.includes(s.period))

      if (currentSubjects.length > 0) {
        setCurrentPeriod({
          period: activePeriod,
          subject: currentSubjects[0],
        })
      } else if (activePeriod.type === "break") {
        setCurrentPeriod({
          period: activePeriod,
          subject: null,
        })
      } else {
        setCurrentPeriod(null)
      }
    } else {
      setCurrentPeriod(null)
    }
  }, [currentTime])

  if (!currentPeriod) {
    return (
      <div className="fixed bottom-6 right-6 backdrop-blur-md bg-slate-800/80 border border-slate-600/50 rounded-2xl p-4 shadow-2xl z-40">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
          <div>
            <p className="text-slate-400 font-semibold">No Active Class</p>
            <p className="text-slate-500 text-sm">
              {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (currentPeriod.period.type === "break") {
    return (
      <div className="fixed bottom-6 right-6 backdrop-blur-md bg-amber-500/20 border border-amber-500/50 rounded-2xl p-4 shadow-2xl z-40">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
          <div>
            <p className="text-amber-400 font-semibold">{currentPeriod.period.name}</p>
            <p className="text-amber-300/80 text-sm">
              {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 backdrop-blur-md bg-green-500/20 border border-green-500/50 rounded-2xl p-4 shadow-2xl z-40 min-w-72">
      <div className="flex items-start space-x-3">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mt-1"></div>
        <div className="flex-1">
          <p className="text-green-400 font-semibold mb-1">Current Class</p>
          <p className="text-green-200 font-medium">{currentPeriod.subject.subject}</p>

          <div className="flex items-center space-x-4 mt-2 text-sm text-green-300/80">
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>{currentPeriod.subject.room}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
            </div>
          </div>

          <div className="mt-2 text-xs text-green-400/60">{currentPeriod.period.time}</div>
        </div>
      </div>
    </div>
  )
}
