"use client"

import { MapPin, Edit3 } from "lucide-react"
import type { CourseData } from "./timetable-grid"

interface CourseBlockProps {
  course: CourseData
  onClick: () => void
}

export function CourseBlock({ course, onClick }: CourseBlockProps) {
  const typeColors = {
    L: "bg-gradient-to-br from-cyan-300 to-cyan-400",
    T: "bg-gradient-to-br from-mint-300 to-mint-400",
    P: "bg-gradient-to-br from-cyan-400 to-mint-400",
    S: "bg-gradient-to-br from-mint-400 to-cyan-400",
  }

  const typeLabels = {
    L: "Lecture",
    T: "Tutorial",
    P: "Practical",
    S: "Seminar",
  }

  return (
    <div
      onClick={onClick}
      className={`w-full h-full ${typeColors[course.courseType]} rounded-xl p-3 shadow-xl border border-white/60 cursor-pointer relative overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105`}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-12 h-12 bg-white/30 rounded-full -translate-y-6 translate-x-6"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 bg-white/20 rounded-full translate-y-4 -translate-x-4"></div>
      <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/10 rounded-full -translate-x-8 -translate-y-8"></div>

      <div className="relative z-10 h-full flex flex-col justify-between text-center">
        <div className="flex-1 space-y-1">
          <div className="font-bold text-black text-sm leading-tight drop-shadow-sm text-center">
            {course.courseName}
          </div>
          <div className="text-xs text-black font-semibold text-center">{typeLabels[course.courseType]}</div>

          {/* Room Number - Centered and prominent */}
          <div className="flex items-center justify-center mt-2">
            <div className="flex items-center space-x-1 bg-white/60 px-2 py-1 rounded-lg backdrop-blur-sm shadow-md border border-white/40">
              <MapPin className="w-3 h-3 text-black drop-shadow-sm" />
              <span className="text-black font-bold text-base">{course.roomNo}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/30">
          <div className="text-xs text-black font-semibold bg-white/30 px-2 py-1 rounded-md">{course.day}</div>

          <div className="flex items-center space-x-1">
            <span className="text-xs font-bold px-2 py-1 rounded-lg bg-white/60 text-black shadow-md">
              {course.courseType}
            </span>
            <Edit3 className="w-3 h-3 text-black opacity-0 group-hover:opacity-100 drop-shadow-sm transition-opacity duration-300" />
          </div>
        </div>
      </div>
    </div>
  )
}
