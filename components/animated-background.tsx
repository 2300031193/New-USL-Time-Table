"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle systems
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
      type: "particle" | "bubble" | "star"
    }> = []

    // Floating geometric shapes
    const shapes: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      rotation: number
      rotationSpeed: number
      opacity: number
      type: "triangle" | "square" | "hexagon"
    }> = []

    // Wave system
    const waves: Array<{
      y: number
      amplitude: number
      frequency: number
      phase: number
      speed: number
      color: string
    }> = []

    // Morphing blobs
    const blobs: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      morphSpeed: number
      morphPhase: number
      color: string
    }> = []

    const colors = {
      cyan: ["rgba(34, 211, 238, 0.6)", "rgba(6, 182, 212, 0.4)", "rgba(103, 232, 249, 0.5)"],
      mint: ["rgba(16, 185, 129, 0.6)", "rgba(52, 211, 153, 0.4)", "rgba(110, 231, 183, 0.5)"],
    }

    // Initialize particles
    for (let i = 0; i < 120; i++) {
      const colorArray = Math.random() > 0.5 ? colors.cyan : colors.mint
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        color: colorArray[Math.floor(Math.random() * colorArray.length)],
        type: ["particle", "bubble", "star"][Math.floor(Math.random() * 3)] as "particle" | "bubble" | "star",
      })
    }

    // Initialize shapes
    for (let i = 0; i < 15; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 40 + 20,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.3 + 0.1,
        type: ["triangle", "square", "hexagon"][Math.floor(Math.random() * 3)] as "triangle" | "square" | "hexagon",
      })
    }

    // Initialize waves
    for (let i = 0; i < 5; i++) {
      const colorArray = Math.random() > 0.5 ? colors.cyan : colors.mint
      waves.push({
        y: Math.random() * canvas.height,
        amplitude: Math.random() * 50 + 30,
        frequency: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
        color: colorArray[Math.floor(Math.random() * colorArray.length)],
      })
    }

    // Initialize blobs
    for (let i = 0; i < 8; i++) {
      const colorArray = Math.random() > 0.5 ? colors.cyan : colors.mint
      blobs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 80 + 40,
        morphSpeed: Math.random() * 0.02 + 0.01,
        morphPhase: Math.random() * Math.PI * 2,
        color: colorArray[Math.floor(Math.random() * colorArray.length)],
      })
    }

    let time = 0

    const drawParticle = (particle: (typeof particles)[0]) => {
      ctx.save()
      ctx.globalAlpha = particle.opacity

      switch (particle.type) {
        case "particle":
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.fill()
          break

        case "bubble":
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.strokeStyle = particle.color
          ctx.lineWidth = 2
          ctx.stroke()
          break

        case "star":
          ctx.translate(particle.x, particle.y)
          ctx.rotate(time * 0.01)
          ctx.beginPath()
          for (let i = 0; i < 5; i++) {
            ctx.lineTo(Math.cos((i * 2 * Math.PI) / 5) * particle.size, Math.sin((i * 2 * Math.PI) / 5) * particle.size)
            ctx.lineTo(
              Math.cos(((i + 0.5) * 2 * Math.PI) / 5) * particle.size * 0.5,
              Math.sin(((i + 0.5) * 2 * Math.PI) / 5) * particle.size * 0.5,
            )
          }
          ctx.closePath()
          ctx.fillStyle = particle.color
          ctx.fill()
          break
      }
      ctx.restore()
    }

    const drawShape = (shape: (typeof shapes)[0]) => {
      ctx.save()
      ctx.globalAlpha = shape.opacity
      ctx.translate(shape.x, shape.y)
      ctx.rotate(shape.rotation)

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, shape.size)
      gradient.addColorStop(0, "rgba(34, 211, 238, 0.3)")
      gradient.addColorStop(1, "rgba(16, 185, 129, 0.1)")

      ctx.beginPath()
      switch (shape.type) {
        case "triangle":
          ctx.moveTo(0, -shape.size)
          ctx.lineTo(-shape.size * 0.866, shape.size * 0.5)
          ctx.lineTo(shape.size * 0.866, shape.size * 0.5)
          break

        case "square":
          ctx.rect(-shape.size / 2, -shape.size / 2, shape.size, shape.size)
          break

        case "hexagon":
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3
            const x = Math.cos(angle) * shape.size
            const y = Math.sin(angle) * shape.size
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          break
      }
      ctx.closePath()
      ctx.fillStyle = gradient
      ctx.fill()
      ctx.restore()
    }

    const drawWave = (wave: (typeof waves)[0]) => {
      ctx.save()
      ctx.globalAlpha = 0.3
      ctx.beginPath()
      ctx.moveTo(0, wave.y)

      for (let x = 0; x <= canvas.width; x += 5) {
        const y = wave.y + Math.sin(x * wave.frequency + wave.phase + time * wave.speed) * wave.amplitude
        ctx.lineTo(x, y)
      }

      ctx.lineTo(canvas.width, canvas.height)
      ctx.lineTo(0, canvas.height)
      ctx.closePath()

      const gradient = ctx.createLinearGradient(0, wave.y - wave.amplitude, 0, wave.y + wave.amplitude)
      gradient.addColorStop(0, wave.color)
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

      ctx.fillStyle = gradient
      ctx.fill()
      ctx.restore()
    }

    const drawBlob = (blob: (typeof blobs)[0]) => {
      ctx.save()
      ctx.globalAlpha = 0.2
      ctx.translate(blob.x, blob.y)

      const morphFactor = Math.sin(time * blob.morphSpeed + blob.morphPhase) * 0.3 + 1

      ctx.beginPath()
      for (let i = 0; i <= 20; i++) {
        const angle = (i / 20) * Math.PI * 2
        const radius = blob.size * (1 + Math.sin(angle * 3 + time * 0.02) * 0.2) * morphFactor
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, blob.size * morphFactor)
      gradient.addColorStop(0, blob.color)
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

      ctx.fillStyle = gradient
      ctx.fill()
      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 1

      // Draw waves first (background layer)
      waves.forEach((wave) => {
        drawWave(wave)
      })

      // Draw blobs
      blobs.forEach((blob) => {
        blob.x += blob.vx
        blob.y += blob.vy

        if (blob.x < -blob.size || blob.x > canvas.width + blob.size) blob.vx *= -1
        if (blob.y < -blob.size || blob.y > canvas.height + blob.size) blob.vy *= -1

        drawBlob(blob)
      })

      // Draw shapes
      shapes.forEach((shape) => {
        shape.x += shape.vx
        shape.y += shape.vy
        shape.rotation += shape.rotationSpeed

        if (shape.x < -shape.size || shape.x > canvas.width + shape.size) shape.vx *= -1
        if (shape.y < -shape.size || shape.y > canvas.height + shape.size) shape.vy *= -1

        drawShape(shape)
      })

      // Draw particles and connections
      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        drawParticle(particle)

        // Draw connections
        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.save()
            ctx.globalAlpha = 0.2 * (1 - distance / 150)
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)

            const gradient = ctx.createLinearGradient(particle.x, particle.y, otherParticle.x, otherParticle.y)
            gradient.addColorStop(0, "rgba(34, 211, 238, 0.8)")
            gradient.addColorStop(1, "rgba(16, 185, 129, 0.8)")

            ctx.strokeStyle = gradient
            ctx.lineWidth = 2
            ctx.stroke()
            ctx.restore()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
}
