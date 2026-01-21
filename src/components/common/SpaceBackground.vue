<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const isMobile = ref(false)
const MOBILE_BREAKPOINT = 768

let animationId: number
let nodes: Node[] = []
const nodeCount = 80
const connectionDistance = 150
const nodeSpeed = 0.3

function checkMobile() {
  isMobile.value = window.innerWidth < MOBILE_BREAKPOINT
}

function initNodes(width: number, height: number) {
  nodes = []
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * nodeSpeed,
      vy: (Math.random() - 0.5) * nodeSpeed
    })
  }
}

function animate() {
  const canvas = canvasRef.value
  if (!canvas || isMobile.value) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const width = canvas.width
  const height = canvas.height

  // Clear canvas
  ctx.clearRect(0, 0, width, height)

  // Update and draw nodes
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light'

  // Update positions
  for (const node of nodes) {
    node.x += node.vx
    node.y += node.vy

    // Bounce off edges
    if (node.x < 0 || node.x > width) node.vx *= -1
    if (node.y < 0 || node.y > height) node.vy *= -1

    // Keep in bounds
    node.x = Math.max(0, Math.min(width, node.x))
    node.y = Math.max(0, Math.min(height, node.y))
  }

  // Draw connections with glow
  ctx.lineWidth = 1
  ctx.shadowBlur = isDark ? 8 : 5
  ctx.shadowColor = isDark ? 'rgba(59, 130, 246, 0.5)' : 'rgba(37, 99, 235, 0.3)'

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const nodeA = nodes[i]
      const nodeB = nodes[j]
      if (!nodeA || !nodeB) continue

      const dx = nodeA.x - nodeB.x
      const dy = nodeA.y - nodeB.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < connectionDistance) {
        const opacity = 1 - distance / connectionDistance
        ctx.strokeStyle = isDark
          ? `rgba(100, 180, 255, ${opacity * 0.3})`
          : `rgba(37, 99, 235, ${opacity * 0.2})`
        ctx.beginPath()
        ctx.moveTo(nodeA.x, nodeA.y)
        ctx.lineTo(nodeB.x, nodeB.y)
        ctx.stroke()
      }
    }
  }

  // Draw nodes with glow
  ctx.shadowBlur = isDark ? 15 : 10
  ctx.shadowColor = isDark ? 'rgba(100, 180, 255, 0.8)' : 'rgba(37, 99, 235, 0.6)'
  ctx.fillStyle = isDark ? 'rgba(150, 200, 255, 1)' : 'rgba(37, 99, 235, 0.9)'

  for (const node of nodes) {
    ctx.beginPath()
    ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2)
    ctx.fill()
  }

  // Reset shadow for next frame
  ctx.shadowBlur = 0

  animationId = requestAnimationFrame(animate)
}

function handleResize() {
  checkMobile()

  const canvas = canvasRef.value
  if (!canvas) return

  if (isMobile.value) {
    // Clear canvas on mobile
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
    if (animationId) {
      cancelAnimationFrame(animationId)
    }
    return
  }

  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()

  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr

  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.scale(dpr, dpr)
  }

  initNodes(rect.width, rect.height)
  animate()
}

onMounted(() => {
  checkMobile()
  handleResize()
  window.addEventListener('resize', handleResize)
  if (!isMobile.value) {
    animate()
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<template>
  <div class="background">
    <canvas ref="canvasRef" class="network-canvas"></canvas>

    <!-- Gradient overlay for depth -->
    <div class="gradient-overlay"></div>
  </div>
</template>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
  pointer-events: none;
  transition: background 0.6s ease;
}

/* Dark mode background */
:root[data-theme="dark"] .background {
  background: linear-gradient(
    160deg,
    #0a1628 0%,
    #0f1f38 50%,
    #152a4a 100%
  );
}

/* Light mode background */
:root[data-theme="light"] .background {
  background: linear-gradient(
    160deg,
    #f0f7ff 0%,
    #dbeafe 50%,
    #e0efff 100%
  );
}

.network-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(ellipse at 20% 20%, rgba(37, 99, 235, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%);
  pointer-events: none;
}

:root[data-theme="light"] .gradient-overlay {
  background:
    radial-gradient(ellipse at 20% 20%, rgba(37, 99, 235, 0.05) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(59, 130, 246, 0.04) 0%, transparent 50%);
}
</style>
