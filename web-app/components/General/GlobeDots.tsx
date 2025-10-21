'use client'

import React, { useRef, useEffect, useCallback, useMemo } from 'react'
import * as d3 from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryObject } from 'topojson-specification'
import worldDataJson from '../../public/110m.json'

const worldData = worldDataJson as unknown as Topology
const land = feature(worldData, worldData.objects.land as GeometryObject)

function generatePoints(pointCount: number) {
    const pts: { x: number; y: number; z: number; isLand: boolean }[] = []
    const N = pointCount
    const phi = Math.PI * (3 - Math.sqrt(5))
    let attempts = 0
    while (pts.length < N && attempts < N * 5) {
        attempts++
        const i = pts.length
        const y = 1 - (i / (N - 1)) * 2
        const radius = Math.sqrt(1 - y * y)
        const theta = phi * i
        const x = Math.cos(theta) * radius
        const z = Math.sin(theta) * radius
        const lat = -Math.asin(y) * (180 / Math.PI)
        const lon = Math.atan2(z, x) * (180 / Math.PI)
        const isLand = d3.geoContains(land, [lon, lat])
        if (isLand || Math.random() < 0.8) {
            pts.push({ x, y, z, isLand })
        }
    }
    return pts
}

/**
 * GlobeDots - spinning world globe with dots
 */

interface GlobeDotsProps {
    size?: number; // size in px
    pointCount?: number; // number of points to generate
    speed?: number; // rotation speed
    title?: string; // title for accessibility
    subtitle?: string; // subtitle for accessibility
}

export default function GlobeDots({ size = 700, pointCount = 5000, speed = 0.2, title, subtitle }: GlobeDotsProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const rafRef = useRef<number | null>(null)
    const stateRef = useRef({
        rotationX: 0,
        rotationY: 0,
        lastTime: 0,
        dragging: false,
        dragStart: { x: 0, y: 0 },
        rotStart: { x: 0, y: 0 },
        paused: false,
    })

    // Memoize points so they're only generated when pointCount changes
    const points = useMemo(() => generatePoints(pointCount), [pointCount])

    const drawFrame = useCallback((time: number) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        const dpr = Math.max(1, window.devicePixelRatio || 1)
        const w = canvas.clientWidth
        const h = canvas.clientHeight
        canvas.width = Math.round(w * dpr)
        canvas.height = Math.round(h * dpr)
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

        const cx = w / 2
        const cy = h / 2
        const radius = Math.min(w, h) * 0.36

        // animation delta
        const s = stateRef.current
        if (!s.lastTime) s.lastTime = time
        const dt = (time - s.lastTime) / 1000
        s.lastTime = time
        if (!s.dragging && !s.paused) {
            s.rotationY += speed * dt * 0.7
            s.rotationX += speed * dt * 0.1
        }

        const cosY = Math.cos(s.rotationY)
        const sinY = Math.sin(s.rotationY)
        const cosX = Math.cos(s.rotationX)
        const sinX = Math.sin(s.rotationX)

        const landColor = getComputedStyle(document.documentElement)
            .getPropertyValue('--color-muted')
            .trim()

        // Only project and draw land points
        for (let i = 0; i < points.length; i++) {
            const p = points[i]
            if (!p.isLand) continue
            const x1 = p.x * cosY - p.z * sinY
            const z1 = p.x * sinY + p.z * cosY
            const y1 = p.y * cosX - z1 * sinX
            const z2 = p.y * sinX + z1 * cosX

            const fov = 1.6
            const perspective = fov / (fov + z2)
            const sx = cx + x1 * radius * perspective
            const sy = cy + y1 * radius * perspective

            // size still uses perspective
            const sizeDot = Math.max(0.2, perspective)
            // brightness = closer → brighter
            const brightness = Math.min(1, perspective * 0.2)
            ctx.beginPath()
            ctx.globalCompositeOperation = 'source-over'
            ctx.fillStyle = landColor.replace(')', `, ${brightness})`).replace('rgb', 'rgba')
            ctx.arc(sx, sy, sizeDot, 0, Math.PI * 2)
            ctx.fill()
        }

        rafRef.current = requestAnimationFrame(drawFrame)
    }, [points, speed])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const s = stateRef.current

        // pointer interaction
        const onPointerDown = (e: PointerEvent) => {
            s.dragging = true
            s.dragStart = { x: e.clientX, y: e.clientY }
            s.rotStart = { x: s.rotationX, y: s.rotationY }
            canvas.setPointerCapture?.(e.pointerId)
        }

        const onPointerMove = (e: PointerEvent) => {
            if (!s.dragging) return
            const dx = (e.clientX - s.dragStart.x) / 300 // sensitivity
            const dy = (e.clientY - s.dragStart.y) / 300
            s.rotationY = s.rotStart.y + dx
            s.rotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, s.rotStart.x + dy))
        }

        const onPointerUp = (e: PointerEvent) => {
            s.dragging = false
            canvas.releasePointerCapture?.(e.pointerId)
        }

        canvas.addEventListener('pointerdown', onPointerDown)
        window.addEventListener('pointermove', onPointerMove)
        window.addEventListener('pointerup', onPointerUp)

        // intersection observer to pause when offscreen
        const obs = new IntersectionObserver((entries) => {
            entries.forEach((ent) => {
                stateRef.current.paused = !ent.isIntersecting
            })
        }, { threshold: 0.1 })
        obs.observe(canvas)

        // start animation
        rafRef.current = requestAnimationFrame(drawFrame)

        // cleanup
        return () => {
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current)
            }
            canvas.removeEventListener('pointerdown', onPointerDown)
            window.removeEventListener('pointermove', onPointerMove)
            window.removeEventListener('pointerup', onPointerUp)
            obs.disconnect()
        }
    }, [drawFrame])

    return (
        <div
            className="w-full mx-auto relative"
            style={{ maxWidth: size, aspectRatio: '1 / 1' }}
        >
            {/* {(title || subtitle) && (
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full pointer-events-none"
                >
                    {title && (
                        <h2>
                            {title}
                        </h2>
                    )}
                    {subtitle && (
                        <span>
                            {subtitle}
                        </span>
                    )}
                </div>
            )} */}
            <canvas
                ref={canvasRef}
                className="w-full h-full block"
            />
        </div>
    )
}
