"use client"

import { useState, useEffect } from "react"
import { X, Save, Trash2, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { CourseData } from "./timetable-grid"

interface CourseEditModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: Omit<CourseData, "id">) => void
  onDelete: () => void
  selectedCell: { day: string; timeSlot: string } | null
  editingCourse: CourseData | null
}

export function CourseEditModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  selectedCell,
  editingCourse,
}: CourseEditModalProps) {
  const [formData, setFormData] = useState({
    courseName: "",
    courseType: "" as "L" | "T" | "P" | "S" | "",
    roomNo: "",
  })

  useEffect(() => {
    if (editingCourse) {
      setFormData({
        courseName: editingCourse.courseName,
        courseType: editingCourse.courseType,
        roomNo: editingCourse.roomNo,
      })
    } else {
      setFormData({
        courseName: "",
        courseType: "",
        roomNo: "",
      })
    }
  }, [editingCourse])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const handleSave = () => {
    if (!formData.courseName || !formData.courseType || !formData.roomNo) {
      return
    }

    const courseData = {
      courseName: formData.courseName,
      courseType: formData.courseType,
      roomNo: formData.roomNo,
      day: selectedCell?.day || editingCourse?.day || "",
      timeSlot: selectedCell?.timeSlot || editingCourse?.timeSlot || "",
    }

    onSave(courseData)
  }

  const courseTypes: Array<{ value: "L" | "T" | "P" | "S"; label: string; color: string }> = [
    { value: "L", label: "Lecture", color: "bg-gradient-to-r from-cyan-400 to-cyan-500" },
    { value: "T", label: "Tutorial", color: "bg-gradient-to-r from-mint-400 to-mint-500" },
    { value: "P", label: "Practical", color: "bg-gradient-to-r from-cyan-500 to-mint-500" },
    { value: "S", label: "Seminar", color: "bg-gradient-to-r from-mint-500 to-cyan-500" },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-gradient-to-br from-white via-cyan-50 to-mint-50 backdrop-blur-md border border-cyan-200/50 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-400 to-mint-400 p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-6 h-6" />
              <div>
                <h3 className="text-xl font-bold">{editingCourse ? "Edit Course" : "Add New Course"}</h3>
                <p className="text-white/80 text-sm">
                  {selectedCell?.day || editingCourse?.day} • {selectedCell?.timeSlot || editingCourse?.timeSlot}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-black mb-2">Course Name</label>
            <Input
              value={formData.courseName}
              onChange={(e) => setFormData((prev) => ({ ...prev, courseName: e.target.value }))}
              placeholder="e.g., Data Structures & Algorithms"
              className="bg-white/80 border-cyan-200/50 text-black placeholder:text-gray-500 focus:border-cyan-400 focus:ring-cyan-400/20"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-3">Course Type</label>
            <div className="grid grid-cols-2 gap-3">
              {courseTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setFormData((prev) => ({ ...prev, courseType: type.value }))}
                  className={`p-4 rounded-xl border-2 font-semibold ${
                    formData.courseType === type.value
                      ? `${type.color} text-black border-transparent shadow-lg`
                      : "bg-white/60 text-black border-gray-200 hover:border-cyan-300 hover:bg-white/80"
                  }`}
                >
                  <div className="text-lg font-bold">{type.value}</div>
                  <div className="text-xs">{type.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-black mb-2">Room Number</label>
            <Input
              value={formData.roomNo}
              onChange={(e) => setFormData((prev) => ({ ...prev, roomNo: e.target.value }))}
              placeholder="e.g., C-101, Lab-A, Auditorium"
              className="bg-white/80 border-cyan-200/50 text-black placeholder:text-gray-500 focus:border-cyan-400 focus:ring-cyan-400/20"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            {editingCourse && (
              <Button
                onClick={onDelete}
                variant="outline"
                className="flex-1 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 bg-white/60"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            )}
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-mint-500 hover:from-cyan-600 hover:to-mint-600 text-white shadow-lg"
            >
              <Save className="w-4 h-4 mr-2" />
              {editingCourse ? "Update" : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
