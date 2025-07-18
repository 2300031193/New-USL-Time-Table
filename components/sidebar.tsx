"use client"

import { useState, useEffect } from "react"
import { Clock, ArrowRight } from "lucide-react"

export function Sidebar() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const currentDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })

  // 12-hour format
  const currentTimeString = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })

  return (
    <div className="w-80 bg-gradient-to-b from-cyan-100/50 to-mint-100/50 p-4 border-r border-cyan-200/50 flex flex-col h-full overflow-y-auto">
      <div className="space-y-3 flex-1">
        {" "}
        {/* Reduced space-y from 5 to 3 */}
        {/* Date Display */}
        <div className="text-center">
          <div className="text-black text-sm font-medium mb-1">{currentDate}</div> {/* Reduced mb from 2 to 1 */}
          <div className="text-5xl font-bold text-black tracking-tight leading-tight">{currentTimeString}</div>
        </div>
        {/* Mini Calendar */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-3 border border-cyan-200/30 shadow-lg">
          {" "}
          {/* Reduced p from 4 to 3 */}
          <MiniCalendar />
        </div>
        {/* Current Period Box */}
        <div className="bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-2xl p-3 text-white shadow-xl relative overflow-hidden">
          {" "}
          {/* Reduced p from 4 to 3 */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
          <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-white/5 rounded-full -translate-x-14 -translate-y-14"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-1">
              {" "}
              {/* Reduced mb from 2 to 1 */}
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-semibold">Current Period</span>
              </div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>

            <div className="space-y-1">
              <div className="text-lg font-bold">Free Period</div>
              <div className="text-sm opacity-90 font-medium">No class scheduled</div>
              <div className="text-xs opacity-80 bg-white/20 px-2 py-1 rounded-lg inline-block">
                11:00 AM - 12:00 PM
              </div>
            </div>
          </div>
        </div>
        {/* Next Period Box */}
        <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-2xl p-3 text-white shadow-xl relative overflow-hidden">
          {" "}
          {/* Reduced p from 4 to 3 */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 -translate-x-12"></div>
          <div className="absolute bottom-0 right-0 w-14 h-14 bg-white/10 rounded-full translate-y-7 translate-x-7"></div>
          <div className="absolute top-1/3 right-1/3 w-18 h-18 bg-white/5 rounded-full"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-1">
              {" "}
              {/* Reduced mb from 2 to 1 */}
              <div className="flex items-center space-x-2">
                <ArrowRight className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white">Next Period</span>
              </div>
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
            </div>

            <div className="space-y-1">
              <div className="text-lg font-bold text-white">No upcoming class</div>
              <div className="text-sm font-medium text-white/90">Schedule is clear</div>
              <div className="text-xs bg-white/20 px-2 py-1 rounded-lg inline-block text-white/80">
                12:00 PM onwards
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MiniCalendar() {
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()
  const currentDate = today.getDate()

  const monthNames = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ]

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  return (
    <div>
      <div className="text-center mb-2">
        {" "}
        {/* Reduced mb from 3 to 2 */}
        <div className="text-xs font-bold text-black tracking-wider">{monthNames[currentMonth]}</div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-xs">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <div key={day} className="text-center text-black font-semibold py-1">
            {" "}
            {/* Reduced py from 2 to 1 */}
            {day}
          </div>
        ))}

        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`}></div>
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1
          const isToday = day === currentDate

          return (
            <div
              key={day}
              className={`text-center py-1 rounded-lg cursor-pointer ${
                /* Reduced py from 2 to 1 */
                isToday ? "bg-cyan-400 text-white font-bold shadow-lg" : "text-black hover:bg-cyan-100"
              }`}
            >
              {day}
            </div>
          )
        })}
      </div>
    </div>
  )
}
