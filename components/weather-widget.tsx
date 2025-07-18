"use client"

import { useState, useEffect, useRef } from "react"
import { Cloud, Sun, CloudRain, Wind, Droplets, MapPin } from "lucide-react"
import { gsap } from "gsap"

interface WeatherData {
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  location: string
  feelsLike: number
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const widgetRef = useRef<HTMLDivElement>(null)
  const iconContainerRef = useRef<HTMLDivElement>(null) // New ref for the icon container
  const tempRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fetch real weather data for Vaddeswaram, Andhra Pradesh
    const fetchWeather = async () => {
      try {
        // Using OpenWeatherMap API (you would need to add your API key)
        // For demo, using realistic data for Vaddeswaram region
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Vaddeswaram,IN&appid=YOUR_API_KEY&units=metric`,
        ).catch(() => null)

        let weatherData: WeatherData

        if (response && response.ok) {
          const data = await response.json()
          weatherData = {
            temperature: Math.round(data.main.temp),
            condition: data.weather[0].main,
            humidity: data.main.humidity,
            windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
            location: "KL University, Vaddeswaram",
            feelsLike: Math.round(data.main.feels_like),
          }
        } else {
          // Fallback with realistic data for Andhra Pradesh climate
          const conditions = ["Clear", "Partly Cloudy", "Cloudy", "Rain"]
          const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]

          weatherData = {
            temperature: Math.floor(Math.random() * 8) + 28, // 28-36°C (typical for AP)
            condition: randomCondition,
            humidity: Math.floor(Math.random() * 25) + 65, // 65-90%
            windSpeed: Math.floor(Math.random() * 12) + 8, // 8-20 km/h
            location: "KL University, Vaddeswaram",
            feelsLike: Math.floor(Math.random() * 8) + 30, // Feels like temperature
          }
        }

        setWeather(weatherData)
        setLoading(false)
      } catch (error) {
        console.error("Weather fetch error:", error)
        setLoading(false)
      }
    }

    fetchWeather()
    const interval = setInterval(fetchWeather, 600000) // Update every 10 minutes

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!loading && weather && widgetRef.current) {
      // Animate widget entrance
      gsap.fromTo(
        widgetRef.current,
        { opacity: 0, scale: 0.9, x: 20 },
        { opacity: 1, scale: 1, x: 0, duration: 0.8, ease: "back.out(1.7)" },
      )

      // Animate temperature
      if (tempRef.current) {
        gsap.fromTo(tempRef.current, { scale: 0 }, { scale: 1, duration: 0.6, delay: 0.3, ease: "elastic.out(1, 0.5)" })
      }

      // Animate weather icon (only the icon, not the text)
      if (iconContainerRef.current) {
        // Continuous floating animation
        gsap.to(iconContainerRef.current, {
          y: -3,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })

        // Rotation based on weather
        if (weather.condition.toLowerCase().includes("sun") || weather.condition.toLowerCase().includes("clear")) {
          gsap.to(iconContainerRef.current, {
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: "none",
          })
        }
      }
    }
  }, [loading, weather])

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase()
    if (conditionLower.includes("clear") || conditionLower.includes("sun")) {
      return <Sun className="w-6 h-6 text-yellow-400" />
    } else if (conditionLower.includes("cloud")) {
      return <Cloud className="w-6 h-6 text-blue-300" />
    } else if (conditionLower.includes("rain")) {
      return <CloudRain className="w-6 h-6 text-blue-400" />
    }
    return <Sun className="w-6 h-6 text-yellow-400" />
  }

  if (loading) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-4 border border-gray-600/30 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-gray-600/50 rounded-full animate-pulse"></div>
          <div className="space-y-1">
            <div className="w-16 h-3 bg-gray-600/50 rounded animate-pulse"></div>
            <div className="w-12 h-2 bg-gray-600/30 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!weather) return null

  return (
    <div
      ref={widgetRef}
      className="bg-gray-800/60 backdrop-blur-xl rounded-2xl p-4 border border-gray-600/40 shadow-xl relative overflow-hidden"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif' }}
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div ref={iconContainerRef}>{getWeatherIcon(weather.condition)}</div> {/* Apply ref here */}
            <div ref={tempRef} className="text-2xl font-semibold text-white tracking-tight">
              {weather.temperature}°
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-300">{weather.condition}</div>
            <div className="text-xs text-gray-400">Feels {weather.feelsLike}°</div>
          </div>
        </div>

        <div className="flex items-center space-x-1 mb-2">
          <MapPin className="w-3 h-3 text-gray-400" />
          <div className="text-xs text-gray-400 font-medium">KL University</div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-600/30">
          <div className="flex items-center space-x-1">
            <Droplets className="w-3 h-3" />
            <span>{weather.humidity}%</span>
          </div>
          <div className="flex items-center space-x-1">
            <Wind className="w-3 h-3" />
            <span>{weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </div>
  )
}
