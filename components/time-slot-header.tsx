"use client"

import { Edit3 } from "lucide-react"

interface TimeSlotHeaderProps {
  time: string
  onEdit: () => void
}

export function TimeSlotHeader({ time, onEdit }: TimeSlotHeaderProps) {
  return (
    <div
      onClick={onEdit}
      className="w-24 h-16 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-gray-700 font-semibold shadow-lg cursor-pointer border border-cyan-200/50 group relative overflow-hidden hover:bg-cyan-50/60 transition-all duration-300"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-100/40 to-mint-100/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute top-0 right-0 w-8 h-8 bg-cyan-200/30 rounded-full -translate-y-4 translate-x-4"></div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <span className="font-bold text-sm text-black leading-tight">{time}</span>
        <Edit3 className="w-3 h-3 text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1" />
      </div>
    </div>
  )
}
