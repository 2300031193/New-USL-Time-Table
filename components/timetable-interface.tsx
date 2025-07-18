"use client"

import { useEffect, useRef } from "react"
import { Sidebar } from "./sidebar"
import { TimetableGrid } from "./timetable-grid"
import { WeatherWidget } from "./weather-widget"
import { AppIcons } from "./app-icons" // Import the new AppIcons component
import { gsap } from "gsap" // Import GSAP

export function TimetableInterface() {
  const uslRef = useRef<HTMLSpanElement>(null) // Ref for the USL text

  useEffect(() => {
    if (uslRef.current) {
      // GSAP animation for the USL text
      gsap.to(uslRef.current, {
        scale: 1.05, // Slightly enlarge
        color: "#6EE7B7", // A slightly brighter mint green for glow effect
        duration: 1.5,
        yoyo: true, // Go back and forth
        repeat: -1, // Repeat indefinitely
        ease: "power1.inOut",
        textShadow: "0 0 8px rgba(110, 231, 183, 0.7)", // Add a subtle glow
      })
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div
        className="w-full max-w-7xl mx-auto bg-gradient-to-br from-slate-100 via-cyan-50 to-mint-50 rounded-3xl overflow-hidden shadow-2xl border border-white/20"
        style={{
          height: "800px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
        }}
      >
        {/* Apple Mac Style Header */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4 relative overflow-hidden border-b border-gray-700/50">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white rounded-full blur-2xl"></div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            {/* Left Section: USL Time Table */}
            <div>
              <h1
                className="text-3xl font-bold tracking-tight"
                style={{
                  fontFamily: '"Inter", "Helvetica Neue", "Arial", sans-serif',
                  fontWeight: "700",
                  letterSpacing: "-0.025em",
                }}
              >
                <span ref={uslRef} className="text-mint-400">
                  USL
                </span>{" "}
                <span className="text-white">Time Table</span>
              </h1>
            </div>

            {/* Middle Section: App Icons - Aligned to right with margin */}
            <div className="flex-grow flex justify-end mr-4">
              {" "}
              {/* Added mr-4 for spacing */}
              <AppIcons />
            </div>

            {/* Right Section: Weather Widget */}
            <div>
              <WeatherWidget />
            </div>
          </div>
        </div>

        <div className="flex" style={{ height: "calc(100% - 72px)" }}>
          <Sidebar />
          <TimetableGrid />
        </div>
      </div>
    </div>
  )
}
