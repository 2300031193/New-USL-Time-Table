"use client"

import { Save, Download, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="backdrop-blur-md bg-green-900/20 border-b border-green-500/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-400">Timetable Editor</h1>
              <p className="text-green-300/60 text-sm">Create & manage your schedule</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-green-300 hover:text-green-400 hover:bg-green-500/10">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button variant="ghost" size="sm" className="text-green-300 hover:text-green-400 hover:bg-green-500/10">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              Save All
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
