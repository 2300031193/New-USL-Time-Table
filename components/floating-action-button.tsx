"use client"

import { useState } from "react"
import { Grid3X3, Calendar, Download, Share, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FloatingActionButtonProps {
  viewMode: "grid" | "day"
  onViewModeChange: (mode: "grid" | "day") => void
}

export function FloatingActionButton({ viewMode, onViewModeChange }: FloatingActionButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const actions = [
    {
      icon: viewMode === "grid" ? Calendar : Grid3X3,
      label: viewMode === "grid" ? "Day View" : "Grid View",
      onClick: () => onViewModeChange(viewMode === "grid" ? "day" : "grid"),
    },
    {
      icon: Download,
      label: "Download PDF",
      onClick: () => console.log("Download PDF"),
    },
    {
      icon: Share,
      label: "Share",
      onClick: () => console.log("Share"),
    },
  ]

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <div className="flex flex-col-reverse space-y-reverse space-y-3">
        {/* Action Buttons */}
        {isExpanded &&
          actions.map((action, index) => (
            <Button
              key={index}
              size="icon"
              className="w-12 h-12 rounded-full bg-green-500/20 backdrop-blur-md border border-green-500/50 hover:bg-green-500/30 text-green-400 hover:text-green-300 transition-all duration-300 shadow-lg"
              onClick={action.onClick}
            >
              <action.icon className="w-5 h-5" />
            </Button>
          ))}

        {/* Main FAB */}
        <Button
          size="icon"
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-2xl transition-all duration-300 hover:scale-110"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <MoreVertical className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`} />
        </Button>
      </div>
    </div>
  )
}
