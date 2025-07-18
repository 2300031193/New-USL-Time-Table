"use client"

import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { PeriodCell } from "./period-cell"
import { TimeSlot } from "./time-slot"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const periods = [
  { id: 1, time: "7:10 - 8:50", label: "1-2" },
  { id: 2, time: "9:20 - 11:00", label: "3-4" },
  { id: 3, time: "11:10 - 12:50", label: "5-6" },
  { id: 4, time: "12:50 - 1:50", label: "Lunch", isBreak: true },
  { id: 5, time: "1:50 - 2:40", label: "8" },
  { id: 6, time: "2:50 - 3:40", label: "9" },
  { id: 7, time: "3:50 - 5:30", label: "10-11" },
  { id: 8, time: "5:30 - 6:15", label: "Snacks", isBreak: true },
  { id: 9, time: "6:15 - 8:15", label: "13-14" },
]

export interface CourseData {
  courseName: string
  courseType: "L" | "T" | "P" | "S" | ""
  roomNo: string
}

export function TimetableEditor() {
  const [timetableData, setTimetableData] = useState<Record<string, Record<number, CourseData>>>({})
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load saved data
    const saved = localStorage.getItem("timetable-data")
    if (saved) {
      setTimetableData(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    // Animate grid on load
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "back.out(1.7)",
        },
      )
    }
  }, [])

  const updateCellData = (day: string, periodId: number, data: CourseData) => {
    setTimetableData((prev) => {
      const updated = {
        ...prev,
        [day]: {
          ...prev[day],
          [periodId]: data,
        },
      }
      localStorage.setItem("timetable-data", JSON.stringify(updated))
      return updated
    })
  }

  const getCellData = (day: string, periodId: number): CourseData => {
    return timetableData[day]?.[periodId] || { courseName: "", courseType: "", roomNo: "" }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-green-400 mb-2">Weekly Timetable</h2>
        <p className="text-green-300/70">Click on any cell to add or edit course details</p>
      </div>

      <div className="backdrop-blur-md bg-green-900/10 border border-green-500/20 rounded-2xl p-6 shadow-2xl">
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-6">
          {/* Time slots column */}
          <div className="space-y-2">
            <div className="h-12 flex items-center justify-center">
              <span className="text-green-400 font-semibold">Time Slots</span>
            </div>
            {periods.map((period) => (
              <TimeSlot key={period.id} period={period} />
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {days.map((day) => (
              <div key={day} className="space-y-2">
                <div className="h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-semibold">{day}</span>
                </div>

                {periods.map((period) => (
                  <PeriodCell
                    key={`${day}-${period.id}`}
                    day={day}
                    period={period}
                    data={getCellData(day, period.id)}
                    onUpdate={(data) => updateCellData(day, period.id, data)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
