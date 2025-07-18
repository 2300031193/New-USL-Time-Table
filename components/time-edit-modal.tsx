"use client"

import { useState, useEffect } from "react"
import { X, Save, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TimeEditModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (time: string) => void
  currentTime: string
}

export function TimeEditModal({ isOpen, onClose, onSave, currentTime }: TimeEditModalProps) {
  const [timeValue, setTimeValue] = useState(currentTime)

  useEffect(() => {
    setTimeValue(currentTime)
  }, [currentTime])

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
    if (!timeValue.trim()) {
      return
    }

    onSave(timeValue)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-gradient-to-br from-white via-cyan-50 to-mint-50 backdrop-blur-md border border-cyan-200/50 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-400 to-mint-400 p-6 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6" />
              <div>
                <h3 className="text-xl font-bold">Edit Time Slot</h3>
                <p className="text-white/80 text-sm">Modify the time for this slot</p>
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
            <label className="block text-sm font-semibold text-black mb-2">Time</label>
            <Input
              value={timeValue}
              onChange={(e) => setTimeValue(e.target.value)}
              placeholder="e.g., 09:00 AM"
              className="bg-white/80 border-cyan-200/50 text-black placeholder:text-gray-500 focus:border-cyan-400 focus:ring-cyan-400/20"
            />
            <p className="text-xs text-black mt-2">Format: HH:MM AM/PM (e.g., 09:00 AM)</p>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50 bg-white/60"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-cyan-500 to-mint-500 hover:from-cyan-600 hover:to-mint-600 text-white shadow-lg"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
