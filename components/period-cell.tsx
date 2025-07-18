"use client"

import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { Edit3, Coffee, Utensils } from "lucide-react"
import type { CourseData } from "./timetable-editor"
import { CourseEditModal } from "./course-edit-modal"

interface PeriodCellProps {
  day: string
  period: { id: number; time: string; label: string; isBreak?: boolean }
  data: CourseData
  onUpdate: (data: CourseData) => void
}

export function PeriodCell({ day, period, data, onUpdate }: PeriodCellProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const cellRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cell = cellRef.current
    if (!cell) return

    const handleMouseEnter = () => {
      gsap.to(cell, {
        scale: 1.05,
        boxShadow: "0 10px 30px rgba(34, 197, 94, 0.3)",
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseLeave = () => {
      gsap.to(cell, {
        scale: 1,
        boxShadow: "0 0 0px rgba(34, 197, 94, 0)",
        duration: 0.3,
        ease: "power2.out",
      })
    }

    cell.addEventListener("mouseenter", handleMouseEnter)
    cell.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cell.removeEventListener("mouseenter", handleMouseEnter)
      cell.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const handleClick = () => {
    if (!period.isBreak) {
      setIsModalOpen(true)
      gsap.to(cellRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
      })
    }
  }

  if (period.isBreak) {
    return (
      <div
        ref={cellRef}
        className="h-16 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-lg flex items-center justify-center cursor-default"
      >
        <div className="flex items-center space-x-2">
          {period.label === "Lunch" ? (
            <Utensils className="w-4 h-4 text-amber-400" />
          ) : (
            <Coffee className="w-4 h-4 text-amber-400" />
          )}
          <span className="text-amber-400 font-medium text-sm">{period.label}</span>
        </div>
      </div>
    )
  }

  const isEmpty = !data.courseName && !data.courseType && !data.roomNo
  const typeColors = {
    L: "bg-blue-500/20 border-blue-500/40 text-blue-400",
    T: "bg-purple-500/20 border-purple-500/40 text-purple-400",
    P: "bg-green-500/20 border-green-500/40 text-green-400",
    S: "bg-orange-500/20 border-orange-500/40 text-orange-400",
    "": "bg-slate-500/20 border-slate-500/40 text-slate-400",
  }

  return (
    <>
      <div
        ref={cellRef}
        onClick={handleClick}
        className={`h-16 border rounded-lg cursor-pointer transition-all duration-300 relative group ${
          isEmpty
            ? "bg-slate-800/30 border-slate-600/30 hover:border-green-500/50"
            : `${typeColors[data.courseType]} hover:brightness-110`
        }`}
      >
        {isEmpty ? (
          <div className="h-full flex items-center justify-center">
            <div className="flex items-center space-x-2 opacity-60 group-hover:opacity-100 transition-opacity">
              <Edit3 className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-sm">Add Course</span>
            </div>
          </div>
        ) : (
          <div className="p-2 h-full flex flex-col justify-between">
            <div>
              <div className="font-semibold text-sm truncate mb-1">{data.courseName}</div>
              <div className="text-xs opacity-80">Room: {data.roomNo}</div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold px-2 py-1 rounded bg-black/20">{data.courseType}</span>
              <Edit3 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        )}
      </div>

      <CourseEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={data}
        onSave={onUpdate}
        day={day}
        period={period}
      />
    </>
  )
}
