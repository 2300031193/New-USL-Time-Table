"use client"

import type React from "react"

import { Youtube, Music, BookOpen, Feather } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AppIconProps {
  icon: React.ElementType
  label: string
  url: string
  borderColorClass: string // New prop for outer ring color
  bgColorClass: string // New prop for inner ring color
}

function AppIcon({ icon: Icon, label, url, borderColorClass, bgColorClass }: AppIconProps) {
  const handleClick = () => {
    window.open(url, "_blank")
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`w-12 h-12 rounded-full ${bgColorClass} border ${borderColorClass} shadow-md flex flex-col items-center justify-center text-black transition-all duration-200 group`}
      onClick={handleClick}
      aria-label={label}
    >
      <Icon className="w-6 h-6 text-black transition-colors duration-200" />{" "}
      {/* Icon color explicitly black, removed hover effect */}
      <span className="sr-only">{label}</span>
    </Button>
  )
}

export function AppIcons() {
  const apps = [
    {
      icon: BookOpen,
      label: "W3Schools",
      url: "https://www.w3schools.com/",
      borderColorClass: "border-green-500/50", // Study green border
      bgColorClass: "bg-green-100/60", // Study green background
    },
    {
      icon: Youtube,
      label: "YouTube",
      url: "https://www.youtube.com/",
      borderColorClass: "border-red-500/50", // YouTube red border
      bgColorClass: "bg-red-100/60", // YouTube red background
    },
    {
      icon: Music,
      label: "Spotify",
      url: "https://www.spotify.com/",
      borderColorClass: "border-blue-500/50", // Music blue border
      bgColorClass: "bg-blue-100/60", // Music blue background
    },
    {
      icon: Feather,
      label: "Duolingo",
      url: "https://www.duolingo.com/",
      borderColorClass: "border-yellow-500/50", // Duolingo yellow border
      bgColorClass: "bg-yellow-100/60", // Duolingo yellow background
    },
  ]

  return (
    <div className="flex items-center space-x-3">
      {apps.map((app) => (
        <AppIcon
          key={app.label}
          icon={app.icon}
          label={app.label}
          url={app.url}
          borderColorClass={app.borderColorClass}
          bgColorClass={app.bgColorClass}
        />
      ))}
    </div>
  )
}
