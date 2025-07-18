"use client"

import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import { CourseEditModal } from "./course-edit-modal"
import { CourseBlock } from "./course-block"
import { TimeSlotHeader } from "./time-slot-header"
import { TimeEditModal } from "./time-edit-modal"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const defaultTimeSlots = [
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
]

export interface CourseData {
  id: string
  courseName: string
  courseType: "L" | "T" | "P" | "S"
  roomNo: string
  day: string
  timeSlot: string
}

export function TimetableGrid() {
  const [courses, setCourses] = useState<CourseData[]>([])
  const [timeSlots, setTimeSlots] = useState<string[]>(defaultTimeSlots)
  const [selectedCell, setSelectedCell] = useState<{ day: string; timeSlot: string } | null>(null)
  const [editingCourse, setEditingCourse] = useState<CourseData | null>(null)
  const [editingTimeIndex, setEditingTimeIndex] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false)

  useEffect(() => {
    // Load saved data
    const savedCourses = localStorage.getItem("timetable-courses")
    const savedTimeSlots = localStorage.getItem("timetable-timeslots")

    if (savedCourses) {
      setCourses(JSON.parse(savedCourses))
    }
    if (savedTimeSlots) {
      setTimeSlots(JSON.parse(savedTimeSlots))
    }
  }, [])

  const saveCourses = (updatedCourses: CourseData[]) => {
    setCourses(updatedCourses)
    localStorage.setItem("timetable-courses", JSON.stringify(updatedCourses))
  }

  const saveTimeSlots = (updatedTimeSlots: string[]) => {
    setTimeSlots(updatedTimeSlots)
    localStorage.setItem("timetable-timeslots", JSON.stringify(updatedTimeSlots))
  }

  const handleCellClick = (day: string, timeSlot: string) => {
    const existingCourse = courses.find((course) => course.day === day && course.timeSlot === timeSlot)

    if (existingCourse) {
      setEditingCourse(existingCourse)
    } else {
      setSelectedCell({ day, timeSlot })
      setEditingCourse(null)
    }
    setIsModalOpen(true)
  }

  const handleTimeSlotEdit = (index: number) => {
    setEditingTimeIndex(index)
    setIsTimeModalOpen(true)
  }

  const handleSaveCourse = (courseData: Omit<CourseData, "id">) => {
    if (editingCourse) {
      const updatedCourses = courses.map((course) =>
        course.id === editingCourse.id ? { ...courseData, id: editingCourse.id } : course,
      )
      saveCourses(updatedCourses)
    } else {
      const newCourse: CourseData = {
        ...courseData,
        id: Date.now().toString(),
      }
      saveCourses([...courses, newCourse])
    }

    setIsModalOpen(false)
    setSelectedCell(null)
    setEditingCourse(null)
  }

  const handleSaveTimeSlot = (newTime: string) => {
    if (editingTimeIndex !== null) {
      const updatedTimeSlots = [...timeSlots]
      updatedTimeSlots[editingTimeIndex] = newTime
      saveTimeSlots(updatedTimeSlots)
      setIsTimeModalOpen(false)
      setEditingTimeIndex(null)
    }
  }

  const handleDeleteCourse = () => {
    if (editingCourse) {
      const updatedCourses = courses.filter((course) => course.id !== editingCourse.id)
      saveCourses(updatedCourses)
      setIsModalOpen(false)
      setEditingCourse(null)
    }
  }

  const getCourseForCell = (day: string, timeSlot: string) => {
    return courses.find((course) => course.day === day && course.timeSlot === timeSlot)
  }

  return (
    <div className="flex-1 relative">
      {/* Fixed Header - Completely Opaque Background */}
      <div className="absolute top-0 left-0 right-0 bg-white border-b border-cyan-200/50 p-4 z-30 shadow-md">
        <div className="grid grid-cols-7 gap-3">
          <div className="w-24"></div>
          {days.map((day) => (
            <div
              key={day}
              className="h-14 bg-gradient-to-r from-mint-400 to-mint-500 rounded-xl flex items-center justify-center text-black font-bold text-lg shadow-lg relative overflow-hidden border border-mint-600/20"
            >
              <div className="absolute top-0 right-0 w-6 h-6 bg-white/20 rounded-full -translate-y-3 translate-x-3"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 bg-white/15 rounded-full translate-y-2 -translate-x-2"></div>
              <div className="relative z-10">{day}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="pt-32 pb-20 px-4 h-full overflow-y-auto">
        {" "}
        {/* Increased pb from 4 to 20 */}
        <div className="space-y-3">
          {timeSlots.map((timeSlot, timeIndex) => (
            <div key={timeSlot} className="grid grid-cols-7 gap-3 items-center">
              <div className="w-24">
                <TimeSlotHeader time={timeSlot} onEdit={() => handleTimeSlotEdit(timeIndex)} />
              </div>
              {days.map((day) => {
                const course = getCourseForCell(day, timeSlot)

                return (
                  <div key={`${day}-${timeSlot}`} className="aspect-square">
                    {course ? (
                      <CourseBlock course={course} onClick={() => handleCellClick(day, timeSlot)} />
                    ) : (
                      <EmptyCell day={day} timeSlot={timeSlot} onClick={() => handleCellClick(day, timeSlot)} />
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <CourseEditModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedCell(null)
          setEditingCourse(null)
        }}
        onSave={handleSaveCourse}
        onDelete={handleDeleteCourse}
        selectedCell={selectedCell}
        editingCourse={editingCourse}
      />

      <TimeEditModal
        isOpen={isTimeModalOpen}
        onClose={() => {
          setIsTimeModalOpen(false)
          setEditingTimeIndex(null)
        }}
        onSave={handleSaveTimeSlot}
        currentTime={editingTimeIndex !== null ? timeSlots[editingTimeIndex] : ""}
      />
    </div>
  )
}

function EmptyCell({ day, timeSlot, onClick }: { day: string; timeSlot: string; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="w-full h-full bg-white/70 border-2 border-cyan-300/40 rounded-xl cursor-pointer flex items-center justify-center group relative overflow-hidden shadow-lg hover:bg-cyan-100/60 hover:border-cyan-400/60 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/50 to-mint-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <Plus className="w-8 h-8 text-cyan-500/80 group-hover:text-cyan-600 relative z-10 transition-colors duration-300" />
    </div>
  )
}
