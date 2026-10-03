'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface ThinkingWallHeroProps {
  isLightMode?: boolean
  onToggleTheme?: () => void
}

// Crisp mechanical switch snap using Web Audio API
const playLampClick = (isOn: boolean) => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    if (ctx.state === 'suspended') {
      ctx.resume()
    }
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(isOn ? 1400 : 900, now)
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.035)

    gain.gain.setValueAtTime(0.12, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.05)
  } catch {}
}

export default function ThinkingWallHero({ isLightMode = false, onToggleTheme }: ThinkingWallHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hintVisible, setHintVisible] = useState(true)
  const lightModeRef = useRef(isLightMode)

  useEffect(() => {
    lightModeRef.current = isLightMode
  }, [isLightMode])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationFrameId: number | null = null
    let isRendering = true

    // Sync theme with document class mutations
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark')
      lightModeRef.current = !isDark
    }
    checkTheme()

    const themeObserver = new MutationObserver(() => {
      checkTheme()
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene()
    const sceneBgColor = new THREE.Color(0x090a09)
    scene.background = sceneBgColor
    const sceneFog = new THREE.FogExp2(0x090a09, 0.08)
    scene.fog = sceneFog

    const camera = new THREE.PerspectiveCamera(
      48,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    )

    // Over-the-shoulder view of the seated person looking at the wall
    const adjustCamera = () => {
      const isMobile = window.innerWidth < 768
      if (isMobile) {
        camera.position.set(0, 1.65, 5.3)
        camera.fov = 50
      } else {
        camera.position.set(0, 1.65, 5.0)
        camera.fov = 46
      }
      camera.updateProjectionMatrix()
      camera.lookAt(0, 1.65, 0)
    }
    adjustCamera()

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    container.appendChild(renderer.domElement)

    // --- Lighting: Quiet, cinematic, restrained ---
    // Ambient light: reveals silhouettes, paper shapes, photo edges, and outlines without making text directly readable
    const ambientLight = new THREE.AmbientLight(0x20241e, 0.6)
    scene.add(ambientLight)

    // Soft room rim light catching the character's shoulders and hair
    const rimLight = new THREE.DirectionalLight(0x40483e, 0.7)
    rimLight.position.set(-2, 4, 2)
    scene.add(rimLight)

    // Gentle floor bounce
    const floorBounce = new THREE.DirectionalLight(0x1a1c18, 0.4)
    floorBounce.position.set(0, -1, 1)
    scene.add(floorBounce)

    // --- The Interactive Flashlight / Spotlight ---
    // Smooth, warm, natural cone of light following the cursor
    const spotlightTarget = new THREE.Object3D()
    spotlightTarget.position.set(0, 1.6, 0)
    scene.add(spotlightTarget)

    const spotlight = new THREE.SpotLight(0xfdf7eb, 7.5)
    spotlight.position.set(0, 1.6, 2.2)
    spotlight.target = spotlightTarget
    spotlight.angle = Math.PI / 5.2
    spotlight.penumbra = 0.85
    spotlight.decay = 1.15
    spotlight.distance = 15.0
    spotlight.castShadow = true
    spotlight.shadow.mapSize.width = 1024
    spotlight.shadow.mapSize.height = 1024
    spotlight.shadow.camera.near = 0.5
    spotlight.shadow.camera.far = 15.0
    spotlight.shadow.bias = -0.001
    scene.add(spotlight)

    // Subtle localized fill point light following the spotlight for smooth radial falloff
    const spillLight = new THREE.PointLight(0xf7f0dd, 0.5, 3.2, 1.8)
    spillLight.position.set(0, 1.6, 0.55)
    scene.add(spillLight)

    // --- Studio Architecture (Full-Breadth Back Wall, Skirting, Ceiling & Floor) ---
    // Full-breadth expansive back studio wall (spans 60m edge-to-edge)
    const wallGeo = new THREE.PlaneGeometry(60, 16)
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x0e100e,
      roughness: 0.94,
      metalness: 0.02,
    })
    const backWall = new THREE.Mesh(wallGeo, wallMat)
    backWall.position.set(0, 8, -0.06)
    backWall.receiveShadow = true
    scene.add(backWall)

    // Architectural Skirting / Baseboard
    const skirtingMat = new THREE.MeshStandardMaterial({
      color: 0x161815,
      roughness: 0.75,
      metalness: 0.2,
    })
    const skirting = new THREE.Mesh(
      new THREE.BoxGeometry(60, 0.14, 0.05),
      skirtingMat
    )
    skirting.position.set(0, 0.07, -0.035)
    skirting.receiveShadow = true
    scene.add(skirting)

    // Studio Ceiling (spans 60m x 36m)
    const ceilingGeo = new THREE.PlaneGeometry(60, 36)
    const ceilingMat = new THREE.MeshStandardMaterial({
      color: 0x0a0c0a,
      roughness: 0.95,
      metalness: 0.02,
    })
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat)
    ceiling.rotation.x = Math.PI / 2
    ceiling.position.set(0, 5.5, 16)
    scene.add(ceiling)

    // Side Walls (Framing the room in 3D perspective)
    const sideWallGeo = new THREE.PlaneGeometry(36, 16)
    const leftWall = new THREE.Mesh(sideWallGeo, wallMat)
    leftWall.rotation.y = Math.PI / 2
    leftWall.position.set(-24, 8, 16)
    leftWall.receiveShadow = true
    scene.add(leftWall)

    const rightWall = new THREE.Mesh(sideWallGeo, wallMat)
    rightWall.rotation.y = -Math.PI / 2
    rightWall.position.set(24, 8, 16)
    rightWall.receiveShadow = true
    scene.add(rightWall)

    // Dark matte studio floor with subtle plank perspective (spans 60m x 36m)
    const floorGeo = new THREE.PlaneGeometry(60, 36)
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0c0e0c,
      roughness: 0.88,
      metalness: 0.05,
    })
    const floor = new THREE.Mesh(floorGeo, floorMat)
    floor.rotation.x = -Math.PI / 2
    floor.position.set(0, 0, 16)
    floor.receiveShadow = true
    scene.add(floor)

    // Subtle floor plank lines
    const gridHelper = new THREE.GridHelper(60, 48, 0x161815, 0x121411)
    gridHelper.position.set(0, 0.005, 16)
    scene.add(gridHelper)

    // --- The Master Thinking Board (Wide Studio Triptych spanning 13.6 meters) ---
    const boardWidth = 13.6
    const boardHeight = 3.6
    const boardGroup = new THREE.Group()
    boardGroup.position.set(0, 1.87, 0)
    scene.add(boardGroup)

    // The dark acoustic pinboard background
    const boardMat = new THREE.MeshStandardMaterial({
      color: 0x111311,
      roughness: 0.95,
      metalness: 0.02,
    })
    const boardMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(boardWidth, boardHeight),
      boardMat
    )
    boardMesh.receiveShadow = true
    boardGroup.add(boardMesh)

    // Subtle wooden frame around the board
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x1c1e1a,
      roughness: 0.8,
    })
    const topFrame = new THREE.Mesh(
      new THREE.BoxGeometry(boardWidth + 0.1, 0.06, 0.05),
      frameMat
    )
    topFrame.position.set(0, boardHeight / 2 + 0.03, 0.02)
    boardGroup.add(topFrame)

    const bottomFrame = new THREE.Mesh(
      new THREE.BoxGeometry(boardWidth + 0.1, 0.06, 0.05),
      frameMat
    )
    bottomFrame.position.set(0, -boardHeight / 2 - 0.03, 0.02)
    boardGroup.add(bottomFrame)

    const leftFrame = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, boardHeight + 0.06, 0.05),
      frameMat
    )
    leftFrame.position.set(-boardWidth / 2 - 0.02, 0, 0.02)
    boardGroup.add(leftFrame)

    const rightFrame = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, boardHeight + 0.06, 0.05),
      frameMat
    )
    rightFrame.position.set(boardWidth / 2 + 0.02, 0, 0.02)
    boardGroup.add(rightFrame)

    // --- Procedural Textures for Real Pinned Artifacts ---
    // Rendered at 3x canvas resolution with 16x anisotropy for ultra-crisp 3D legibility
    const createArtifactTexture = (
      width: number,
      height: number,
      draw: (ctx: CanvasRenderingContext2D) => void
    ) => {
      const canvas = document.createElement('canvas')
      canvas.width = width * 3
      canvas.height = height * 3
      const ctx = canvas.getContext('2d')!
      ctx.scale(3, 3)
      draw(ctx)
      const texture = new THREE.CanvasTexture(canvas)
      texture.anisotropy = 16
      return texture
    }

    // Pushpin 3D geometry
    const pinGeo = new THREE.SphereGeometry(0.022, 12, 12)
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0x8a7f6c,
      roughness: 0.4,
      metalness: 0.6,
    })

    const addPinnedArtifact = (
      x: number,
      y: number,
      w: number,
      h: number,
      rot: number,
      texture: THREE.Texture,
      hasPin: boolean = true
    ) => {
      const cardGeo = new THREE.PlaneGeometry(w, h)
      // Standard material relies primarily on the interactive spotlight for detailed reading,
      // while ambient room light preserves card silhouettes, paper forms, and visual hierarchy
      const cardMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.8,
        metalness: 0.02,
        transparent: true,
      })
      const card = new THREE.Mesh(cardGeo, cardMat)
      card.position.set(x, y, 0.015)
      card.rotation.z = rot
      card.castShadow = true
      card.receiveShadow = true
      boardGroup.add(card)

      if (hasPin) {
        const pin = new THREE.Mesh(pinGeo, pinMat)
        pin.position.set(x, y + h / 2 - 0.03, 0.035)
        boardGroup.add(pin)
      }
    }

    // 1. Thenvue Architecture: Calendar Anchoring Note (Top-Left)
    const texThenvueNote = createArtifactTexture(300, 210, (ctx) => {
      ctx.fillStyle = '#1c201a'
      ctx.fillRect(0, 0, 300, 210)
      ctx.strokeStyle = '#323a2b'
      ctx.lineWidth = 1.5
      ctx.strokeRect(0, 0, 300, 210)

      // Category / Tag
      ctx.fillStyle = '#a1b690'
      ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.fillText('THENVUE  //  01 → 0', 18, 28)

      // Main Feature Name (Prominent)
      ctx.fillStyle = '#f5f2e8'
      ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, sans-serif'
      ctx.fillText('Temporal Anchoring', 18, 56)

      // Core Product Insight
      ctx.fillStyle = '#ded9cc'
      ctx.font = 'italic 15px Georgia, serif'
      ctx.fillText('"Memories belong to local calendar days,', 18, 88)
      ctx.fillText('never to raw UTC timestamps."', 18, 110)

      // Architecture Decision Pill
      ctx.fillStyle = '#263121'
      ctx.fillRect(18, 132, 264, 30)
      ctx.fillStyle = '#c5e0a8'
      ctx.font = 'bold 12px ui-monospace, monospace'
      ctx.fillText('→ local_date: YYYY-MM-DD', 28, 151)

      ctx.fillStyle = '#9aa890'
      ctx.font = '12px -apple-system, sans-serif'
      ctx.fillText('Decoupled occurred_on from clock timezone', 18, 186)
    })
    addPinnedArtifact(-1.95, 0.75, 0.9, 0.63, -0.04, texThenvueNote)

    // 2. Thenvue Voice Note & Waveform Snippet (Mid-Left)
    const texThenvueAudio = createArtifactTexture(300, 150, (ctx) => {
      ctx.fillStyle = '#161914'
      ctx.fillRect(0, 0, 300, 150)
      ctx.strokeStyle = '#2d3526'
      ctx.lineWidth = 1.5
      ctx.strokeRect(0, 0, 300, 150)

      // Header with badge
      ctx.fillStyle = '#a1b690'
      ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.fillText('THENVUE AUDIO CAPTURE', 18, 26)

      ctx.fillStyle = '#2b3623'
      ctx.fillRect(224, 12, 58, 20)
      ctx.fillStyle = '#c6e3a2'
      ctx.font = 'bold 12px ui-monospace, monospace'
      ctx.fillText('01:24', 236, 26)

      // Key Metric Title
      ctx.fillStyle = '#f5f2e8'
      ctx.font = 'bold 17px -apple-system, BlinkMacSystemFont, sans-serif'
      ctx.fillText('42% Faster Capture Rate', 18, 56)

      // Audio waveform bars (crisp & contrasted)
      const heights = [8, 16, 26, 18, 12, 32, 24, 16, 28, 34, 28, 20, 14, 26, 32, 18, 12, 10]
      heights.forEach((h, i) => {
        ctx.fillStyle = i < 11 ? '#cbe6a8' : '#4a5740'
        ctx.fillRect(18 + i * 15, 88 - h / 2, 7, h)
      })

      // Verification label
      ctx.fillStyle = '#9da892'
      ctx.font = '12px ui-monospace, monospace'
      ctx.fillText('Gemini Flash audio extraction · verified', 18, 128)
    })
    addPinnedArtifact(-2.1, -0.05, 0.95, 0.48, 0.03, texThenvueAudio)

    // 3. Vector Search Proximity Cluster Sketch (Bottom-Left)
    const texVectorCluster = createArtifactTexture(280, 240, (ctx) => {
      ctx.fillStyle = '#151814'
      ctx.fillRect(0, 0, 280, 240)
      ctx.strokeStyle = '#2b3325'
      ctx.lineWidth = 1.5
      ctx.strokeRect(0, 0, 280, 240)

      ctx.fillStyle = '#a1b690'
      ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.fillText('PGVECTOR / 768-DIM COSINE', 18, 26)

      ctx.fillStyle = '#f5f2e8'
      ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, sans-serif'
      ctx.fillText('Memory Retrieval Graph', 18, 54)

      // Graph Nodes
      ctx.strokeStyle = '#5a6c4b'
      ctx.lineWidth = 1.5
      ctx.fillStyle = '#22291c'

      // Node 1: @Sahil
      ctx.beginPath()
      ctx.arc(68, 102, 25, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
      ctx.fillStyle = '#e8f2db'
      ctx.font = 'bold 13px -apple-system, sans-serif'
      ctx.fillText('@Sahil', 47, 106)

      // Node 2: #startups
      ctx.beginPath()
      ctx.arc(195, 92, 28, 0, Math.PI * 2)
      ctx.fillStyle = '#22291c'
      ctx.fill()
      ctx.stroke()
      ctx.fillStyle = '#e8f2db'
      ctx.font = 'bold 13px -apple-system, sans-serif'
      ctx.fillText('#startups', 165, 96)

      // Connecting line
      ctx.strokeStyle = '#71855e'
      ctx.beginPath()
      ctx.moveTo(93, 100)
      ctx.lineTo(167, 94)
      ctx.stroke()

      // Distance tag
      ctx.fillStyle = '#2d3824'
      ctx.fillRect(108, 88, 48, 18)
      ctx.fillStyle = '#c5e2a3'
      ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.fillText('≤ 0.22', 114, 101)

      // Query result block
      ctx.fillStyle = '#20261b'
      ctx.fillRect(18, 150, 244, 46)
      ctx.fillStyle = '#c8e5a5'
      ctx.font = 'bold 13px -apple-system, sans-serif'
      ctx.fillText('✓ Match: Oct 14 Pune Dinner', 28, 171)
      ctx.fillStyle = '#9da892'
      ctx.font = 'italic 12px Georgia, serif'
      ctx.fillText('"Cold breeze, hot chai & startup ideas"', 28, 188)

      ctx.fillStyle = '#7a8770'
      ctx.font = '11px ui-monospace, monospace'
      ctx.fillText('Cosine match · Grounded Memory RAG', 18, 222)
    })
    addPinnedArtifact(-1.9, -0.85, 0.88, 0.75, -0.02, texVectorCluster)

    // 4. Center Top Sticky Note: Core Product Problem
    const texStickyProblem = createArtifactTexture(240, 240, (ctx) => {
      // Classic canary sticky note (clean, warm, high contrast)
      ctx.fillStyle = '#faf3dc'
      ctx.fillRect(0, 0, 240, 240)

      ctx.fillStyle = '#665d48'
      ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.fillText('CORE PROBLEM  //  02:00 AM', 18, 28)

      // Bold readable question
      ctx.fillStyle = '#161912'
      ctx.font = 'bold 17px Georgia, serif'
      ctx.fillText('Why do users stop', 18, 58)
      ctx.fillText('journaling by Day 4?', 18, 80)

      // 3 clear failure modes
      ctx.fillStyle = '#262920'
      ctx.font = 'bold 13px -apple-system, sans-serif'
      ctx.fillText('1. High capture friction', 18, 116)
      ctx.fillText('2. Passive camera roll dies', 18, 140)
      ctx.fillText('3. Search fails on emotion', 18, 164)

      // Product conclusion pill
      ctx.fillStyle = '#e8dec0'
      ctx.fillRect(18, 186, 204, 32)
      ctx.fillStyle = '#19420b'
      ctx.font = 'bold 13px -apple-system, sans-serif'
      ctx.fillText('→ Build zero-friction capture', 26, 206)
    })
    addPinnedArtifact(-0.55, 0.9, 0.74, 0.74, 0.05, texStickyProblem)

    // 5. Polaroid Photo: Chandranahan
    const polaroidCanvas = document.createElement('canvas')
    polaroidCanvas.width = 220 * 3
    polaroidCanvas.height = 260 * 3
    const polaroidCtx = polaroidCanvas.getContext('2d')!
    polaroidCtx.scale(3, 3)

    const imgChandranahan = new Image()
    imgChandranahan.crossOrigin = 'anonymous'
    imgChandranahan.src = '/images/chandranahan.jpg'

    const drawPolaroid = () => {
      // Classic Polaroid cream paper frame
      polaroidCtx.fillStyle = '#fcfaf4'
      polaroidCtx.fillRect(0, 0, 220, 260)

      // Photo area: 188 x 182 at (16, 16)
      if (imgChandranahan.complete && imgChandranahan.naturalWidth > 0) {
        polaroidCtx.save()
        polaroidCtx.beginPath()
        polaroidCtx.rect(16, 16, 188, 182)
        polaroidCtx.clip()
        polaroidCtx.drawImage(imgChandranahan, 16, 16, 188, 182)
        polaroidCtx.strokeStyle = 'rgba(0, 0, 0, 0.12)'
        polaroidCtx.lineWidth = 1
        polaroidCtx.strokeRect(16, 16, 188, 182)
        polaroidCtx.restore()
      } else {
        // Warm sunset mountain tone fallback while image loads
        polaroidCtx.fillStyle = '#2d1f14'
        polaroidCtx.fillRect(16, 16, 188, 182)
      }

      // Polaroid handwriting (bold, high contrast, readable)
      polaroidCtx.fillStyle = '#1e211b'
      polaroidCtx.font = 'bold 15px Georgia, serif'
      polaroidCtx.fillText('Chandranahan', 20, 224)

      polaroidCtx.fillStyle = '#5c6353'
      polaroidCtx.font = '12px ui-monospace, monospace'
      polaroidCtx.fillText('Drafting Thenvue PRD v1', 20, 245)
    }

    drawPolaroid()

    const texPolaroid = new THREE.CanvasTexture(polaroidCanvas)
    texPolaroid.anisotropy = 16

    imgChandranahan.onload = () => {
      drawPolaroid()
      texPolaroid.needsUpdate = true
    }
    addPinnedArtifact(0.45, 0.8, 0.65, 0.77, -0.06, texPolaroid)

    // 6. Merchow Discovery: Napkin Math on Creator Margin (Top-Right)
    const texMerchowMath = createArtifactTexture(300, 220, (ctx) => {
      ctx.fillStyle = '#fbf8f0'
      ctx.fillRect(0, 0, 300, 220)

      // Lined napkin header
      ctx.fillStyle = '#6e695b'
      ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.fillText('MERCHOW  //  UNIT ECONOMICS', 18, 28)

      // Pricing & Cost lines
      ctx.fillStyle = '#181b14'
      ctx.font = 'bold 18px ui-monospace, monospace'
      ctx.fillText(' ₹1,199', 18, 62)
      ctx.fillStyle = '#52594a'
      ctx.font = '13px -apple-system, sans-serif'
      ctx.fillText('retail price (heavyweight tee)', 96, 62)

      ctx.fillStyle = '#181b14'
      ctx.font = 'bold 18px ui-monospace, monospace'
      ctx.fillText('- ₹630', 18, 90)
      ctx.fillStyle = '#52594a'
      ctx.font = '13px -apple-system, sans-serif'
      ctx.fillText('blank + DTG print cost', 96, 90)

      // Line separator
      ctx.strokeStyle = '#8d8878'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(18, 102)
      ctx.lineTo(240, 102)
      ctx.stroke()

      // Highlighted profit outcome
      ctx.fillStyle = '#164808'
      ctx.font = 'bold 22px ui-monospace, monospace'
      ctx.fillText('= ₹569 PROFIT / UNIT', 18, 134)

      // Key discovery quote
      ctx.fillStyle = '#20231c'
      ctx.font = 'italic 14px Georgia, serif'
      ctx.fillText('"Remove the inventory risk first."', 18, 168)
      ctx.fillStyle = '#4f5647'
      ctx.font = 'bold 12px -apple-system, sans-serif'
      ctx.fillText('Creators launch in 5 mins with 0 dead stock.', 18, 192)
    })
    addPinnedArtifact(1.85, 0.75, 0.92, 0.68, 0.04, texMerchowMath)

    // 7. Merchow Order Routing Architecture Flow (Mid-Right)
    const texMerchowFlow = createArtifactTexture(300, 170, (ctx) => {
      ctx.fillStyle = '#161914'
      ctx.fillRect(0, 0, 300, 170)
      ctx.strokeStyle = '#2d3526'
      ctx.lineWidth = 1.5
      ctx.strokeRect(0, 0, 300, 170)

      ctx.fillStyle = '#a1b690'
      ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.fillText('MERCHOW AUTOMATED PIPELINE', 18, 26)

      // Flow boxes: 1. Checkout -> 2. Webhook -> 3. Qikink
      const boxes = [
        { label: '1. Store', sub: 'Checkout', x: 18, w: 76 },
        { label: '2. Hook', sub: 'Next.js API', x: 114, w: 76 },
        { label: '3. Qikink', sub: 'Auto-DTG', x: 210, w: 72 },
      ]

      boxes.forEach((b) => {
        ctx.fillStyle = '#232c1e'
        ctx.fillRect(b.x, 42, b.w, 40)
        ctx.strokeStyle = '#4e6141'
        ctx.strokeRect(b.x, 42, b.w, 40)

        ctx.fillStyle = '#eaf3dd'
        ctx.font = 'bold 12px -apple-system, sans-serif'
        ctx.fillText(b.label, b.x + 8, 59)

        ctx.fillStyle = '#a0b18f'
        ctx.font = '10px ui-monospace, monospace'
        ctx.fillText(b.sub, b.x + 8, 73)
      })

      // Connecting arrows
      ctx.strokeStyle = '#7c9665'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(94, 62)
      ctx.lineTo(114, 62)
      ctx.moveTo(190, 62)
      ctx.lineTo(210, 62)
      ctx.stroke()

      // Outcome metric pill
      ctx.fillStyle = '#20271b'
      ctx.fillRect(18, 98, 264, 54)
      ctx.fillStyle = '#c7e5a3'
      ctx.font = 'bold 13px -apple-system, sans-serif'
      ctx.fillText('Zero inventory held · ₹0 upfront cost', 28, 120)
      ctx.fillStyle = '#9da892'
      ctx.font = '12px ui-monospace, monospace'
      ctx.fillText('Order auto-routed to vendor in 180ms', 28, 138)
    })
    addPinnedArtifact(1.95, -0.05, 0.95, 0.54, -0.03, texMerchowFlow)

    // 8. Figma Mobile Bottom-Sheet UI Wireframe (Bottom-Right)
    const texFigmaWireframe = createArtifactTexture(260, 260, (ctx) => {
      ctx.fillStyle = '#171a15'
      ctx.fillRect(0, 0, 260, 260)
      ctx.strokeStyle = '#2c3526'
      ctx.lineWidth = 1.5
      ctx.strokeRect(0, 0, 260, 260)

      ctx.fillStyle = '#a1b690'
      ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.fillText('FIGMA  //  MOBILE ERGONOMICS', 18, 26)

      // Phone outline
      ctx.strokeStyle = '#48573d'
      ctx.lineWidth = 1.5
      ctx.strokeRect(38, 42, 184, 202)

      // Bottom sheet (thumb reach zone)
      ctx.fillStyle = '#222b1d'
      ctx.fillRect(38, 132, 184, 112)
      ctx.fillStyle = '#5e734f'
      ctx.fillRect(115, 140, 30, 4)

      // Input field
      ctx.fillStyle = '#131612'
      ctx.fillRect(50, 154, 160, 32)
      ctx.strokeStyle = '#3c4a33'
      ctx.strokeRect(50, 154, 160, 32)
      ctx.fillStyle = '#b0c2a3'
      ctx.font = 'bold 11px -apple-system, sans-serif'
      ctx.fillText('Type, speak, or drop photo...', 58, 174)

      // Capture action pills
      const pills = [
        { label: 'Voice', x: 50, w: 46 },
        { label: 'Camera', x: 104, w: 50 },
        { label: 'Text', x: 162, w: 48 },
      ]
      pills.forEach((p) => {
        ctx.fillStyle = '#2f3d27'
        ctx.fillRect(p.x, 194, p.w, 22)
        ctx.fillStyle = '#e1eed4'
        ctx.font = 'bold 10px sans-serif'
        ctx.fillText(p.label, p.x + 8, 209)
      })

      // Annotation callout
      ctx.fillStyle = '#c3e39d'
      ctx.font = 'bold 12px ui-monospace, monospace'
      ctx.fillText('92% thumb-zone reachability', 46, 232)
    })
    addPinnedArtifact(1.85, -0.85, 0.86, 0.86, 0.02, texFigmaWireframe)

    // 9. Central Sticky Note: Product Hypothesis (Center)
    const texCentralNote = createArtifactTexture(260, 160, (ctx) => {
      ctx.fillStyle = '#f8f3e5'
      ctx.fillRect(0, 0, 260, 160)

      ctx.fillStyle = '#665f4e'
      ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.fillText('PRODUCT HYPOTHESIS', 18, 28)

      ctx.fillStyle = '#181a14'
      ctx.font = 'bold 17px Georgia, serif'
      ctx.fillText('"Great tools don\'t demand', 18, 62)
      ctx.fillText('new behavior patterns.', 18, 86)

      ctx.font = 'italic 16px Georgia, serif'
      ctx.fillStyle = '#343a2c'
      ctx.fillText('They attach to existing habits."', 18, 114)

      ctx.fillStyle = '#6a735e'
      ctx.font = '11px ui-monospace, monospace'
      ctx.fillText('Dhananjay · 02:00 AM Pune', 18, 144)
    })
    addPinnedArtifact(-0.15, -0.15, 0.85, 0.52, -0.02, texCentralNote)

    // --- Left Wing Artifacts: AI Architecture & Systems ---
    // 10. AI Multimodal Ingestion Pipeline
    const texAiPipeline = createArtifactTexture(340, 220, (ctx) => {
      ctx.fillStyle = '#161915'
      ctx.fillRect(0, 0, 340, 220)
      ctx.strokeStyle = '#2d3826'
      ctx.lineWidth = 1.5
      ctx.strokeRect(0, 0, 340, 220)

      ctx.fillStyle = '#a6bd92'
      ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.fillText('MULTIMODAL INGESTION // PIPELINE', 18, 26)

      ctx.fillStyle = '#f5f2e8'
      ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, sans-serif'
      ctx.fillText('Real-Time Context Synthesis', 18, 54)

      // Pipeline stages
      const stages = [
        { name: '1. Audio / Photo Ingest', desc: 'WebRTC / Base64 chunk' },
        { name: '2. Gemini 1.5 Flash Diarize', desc: 'Speech-to-text + mood extraction' },
        { name: '3. pgvector Cosine (768)', desc: 'Index similarity & semantic recall' },
      ]
      stages.forEach((s, idx) => {
        const py = 76 + idx * 36
        ctx.fillStyle = '#21291d'
        ctx.fillRect(18, py, 304, 28)
        ctx.fillStyle = '#cbe4ab'
        ctx.font = 'bold 11px ui-monospace, monospace'
        ctx.fillText(s.name, 26, py + 18)
        ctx.fillStyle = '#899480'
        ctx.font = '10px -apple-system, sans-serif'
        ctx.fillText(s.desc, 180, py + 18)
      })

      ctx.fillStyle = '#7a8770'
      ctx.font = '11px ui-monospace, monospace'
      ctx.fillText('P95 Latency: 420ms · Zero dropped packets', 18, 204)
    })
    addPinnedArtifact(-4.6, 0.72, 1.15, 0.74, -0.02, texAiPipeline)

    // 11. 0→1 PRD Truths Sticky Note
    const texPrdTruths = createArtifactTexture(240, 240, (ctx) => {
      ctx.fillStyle = '#faf3dc'
      ctx.fillRect(0, 0, 240, 240)

      ctx.fillStyle = '#665d48'
      ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.fillText('0 → 1 USER TRUTHS', 18, 28)

      ctx.fillStyle = '#161912'
      ctx.font = 'bold 16px Georgia, serif'
      ctx.fillText('"Users don\'t think in dates.', 18, 60)
      ctx.fillText('They think in seasons,', 18, 82)
      ctx.fillText('faces, and feelings."', 18, 104)

      ctx.fillStyle = '#323a2b'
      ctx.font = 'bold 12px -apple-system, sans-serif'
      ctx.fillText('Rule 1: Never ask "What happened?"', 18, 142)
      ctx.fillText('Rule 2: Capture ambient sound first', 18, 164)

      ctx.fillStyle = '#e5dcc0'
      ctx.fillRect(18, 186, 204, 32)
      ctx.fillStyle = '#1c450c'
      ctx.font = 'bold 12px -apple-system, sans-serif'
      ctx.fillText('→ Auto-mood tagging from vocal tone', 26, 206)
    })
    addPinnedArtifact(-3.4, 0.82, 0.76, 0.76, 0.03, texPrdTruths)

    // 12. Vector Schema Blueprint
    const texVectorSchema = createArtifactTexture(300, 220, (ctx) => {
      ctx.fillStyle = '#15191d'
      ctx.fillRect(0, 0, 300, 220)
      ctx.strokeStyle = '#273644'
      ctx.lineWidth = 1.5
      ctx.strokeRect(0, 0, 300, 220)

      ctx.fillStyle = '#9cbcd6'
      ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.fillText('SUPABASE / POSTGRES SCHEMA', 18, 26)

      ctx.fillStyle = '#e8f0f6'
      ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, sans-serif'
      ctx.fillText('pgvector HNSW Indexing', 18, 54)

      ctx.fillStyle = '#1d2a36'
      ctx.fillRect(18, 72, 264, 96)

      ctx.fillStyle = '#b7d7f0'
      ctx.font = '11px ui-monospace, monospace'
      ctx.fillText('CREATE INDEX memories_emb_idx ON', 26, 94)
      ctx.fillText('memories USING hnsw (embedding vector_cosine_ops)', 26, 114)
      ctx.fillText('WITH (m = 16, ef_construction = 64);', 26, 134)
      ctx.fillStyle = '#89a2b8'
      ctx.fillText('-- Verified sub-12ms queries on 1M rows', 26, 154)

      ctx.fillStyle = '#7a91a3'
      ctx.font = '11px ui-monospace, monospace'
      ctx.fillText('Grounded Citations · Zero Hallucination Guardrails', 18, 198)
    })
    addPinnedArtifact(-4.4, -0.68, 1.05, 0.77, 0.02, texVectorSchema)

    // --- Right Wing Artifacts: Creator Commerce & Product Execution ---
    // 13. Merchow Zero-Dead-Stock Fulfillment Automation
    const texMerchowPipeline = createArtifactTexture(320, 210, (ctx) => {
      ctx.fillStyle = '#1b1915'
      ctx.fillRect(0, 0, 320, 210)
      ctx.strokeStyle = '#383226'
      ctx.lineWidth = 1.5
      ctx.strokeRect(0, 0, 320, 210)

      ctx.fillStyle = '#d6b885'
      ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.fillText('MERCHOW // 0-INVENTORY DROPS', 18, 26)

      ctx.fillStyle = '#f8f4ec'
      ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, sans-serif'
      ctx.fillText('Automated Fulfillment State', 18, 54)

      const steps = [
        'Creator Drop Page',
        '→ Razorpay Capture',
        '→ Qikink API Dispatch',
        '→ Direct To Door',
      ]
      ctx.fillStyle = '#2b251c'
      ctx.fillRect(18, 74, 284, 38)
      ctx.fillStyle = '#e8d4b0'
      ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.fillText(steps.join(' '), 26, 98)

      // Margins metric block
      ctx.fillStyle = '#262016'
      ctx.fillRect(18, 126, 136, 48)
      ctx.fillStyle = '#e8be78'
      ctx.font = 'bold 20px Georgia, serif'
      ctx.fillText('₹450 / unit', 26, 154)
      ctx.fillStyle = '#9c8a70'
      ctx.font = '10px ui-monospace, monospace'
      ctx.fillText('Net Creator Margin', 26, 168)

      ctx.fillStyle = '#262016'
      ctx.fillRect(166, 126, 136, 48)
      ctx.fillStyle = '#e8be78'
      ctx.font = 'bold 20px Georgia, serif'
      ctx.fillText('99.4%', 174, 154)
      ctx.fillStyle = '#9c8a70'
      ctx.font = '10px ui-monospace, monospace'
      ctx.fillText('On-Time Delivery SLA', 174, 168)

      ctx.fillStyle = '#8f7e68'
      ctx.font = '11px ui-monospace, monospace'
      ctx.fillText('Zero capital requirement for independent creators', 18, 196)
    })
    addPinnedArtifact(3.85, 0.80, 1.08, 0.71, 0.03, texMerchowPipeline)

    // 14. UX Craft & Micro-Interactions Spec
    const texDesignCraft = createArtifactTexture(280, 240, (ctx) => {
      ctx.fillStyle = '#191722'
      ctx.fillRect(0, 0, 280, 240)
      ctx.strokeStyle = '#322d42'
      ctx.lineWidth = 1.5
      ctx.strokeRect(0, 0, 280, 240)

      ctx.fillStyle = '#b7aadc'
      ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.fillText('UX CRAFT // ERGONOMICS', 18, 26)

      ctx.fillStyle = '#f5f2fa'
      ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, sans-serif'
      ctx.fillText('Tactile Micro-Physics', 18, 54)

      // Spring physics graph
      ctx.strokeStyle = '#7c6aa8'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(18, 130)
      ctx.bezierCurveTo(70, 70, 110, 150, 160, 120)
      ctx.bezierCurveTo(200, 105, 230, 124, 260, 120)
      ctx.stroke()

      ctx.fillStyle = '#272236'
      ctx.fillRect(18, 146, 244, 46)
      ctx.fillStyle = '#d5c8f5'
      ctx.font = 'bold 12px ui-monospace, monospace'
      ctx.fillText('spring(stiffness: 38, damping: 6.6)', 26, 168)
      ctx.fillStyle = '#9c91b8'
      ctx.font = '11px -apple-system, sans-serif'
      ctx.fillText('Subtle organic recoil on every interactive touch', 26, 184)

      ctx.fillStyle = '#8578a3'
      ctx.font = '11px ui-monospace, monospace'
      ctx.fillText('Fast, tactile, respectful of user focus', 18, 220)
    })
    addPinnedArtifact(5.15, 0.65, 0.95, 0.81, -0.02, texDesignCraft)

    // 15. Product Velocity Sticky Note
    const texProductVelocity = createArtifactTexture(240, 240, (ctx) => {
      ctx.fillStyle = '#dff0d8'
      ctx.fillRect(0, 0, 240, 240)

      ctx.fillStyle = '#416335'
      ctx.font = 'bold 11px ui-monospace, monospace'
      ctx.fillText('0 → 1 SHIPPED METRICS', 18, 28)

      ctx.fillStyle = '#14290e'
      ctx.font = 'bold 17px Georgia, serif'
      ctx.fillText('"Ship early to listen', 18, 58)
      ctx.fillText('to real user reality."', 18, 80)

      const milestones = [
        '✓ Concept to Beta: 6 Weeks',
        '✓ 10k+ organic users',
        '✓ ₹450 unit creator margin',
        '✓ Vector recall P95 < 450ms',
      ]
      milestones.forEach((m, idx) => {
        ctx.fillStyle = '#214217'
        ctx.font = 'bold 12px -apple-system, sans-serif'
        ctx.fillText(m, 18, 116 + idx * 24)
      })

      ctx.fillStyle = '#3a662d'
      ctx.font = 'italic 11px Georgia, serif'
      ctx.fillText('Built with extreme craftsmanship', 18, 218)
    })
    addPinnedArtifact(4.15, -0.68, 0.80, 0.80, 0.04, texProductVelocity)

    // --- Workshop Stool (Anchored in place on studio floor) ---
    const stoolGroup = new THREE.Group()
    stoolGroup.position.set(1.25, 0, 0.85)
    stoolGroup.scale.set(0.6, 0.6, 0.6)
    scene.add(stoolGroup)

    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x27221c,
      roughness: 0.72,
      metalness: 0.08,
    })

    const stoolSeat = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, 0.045, 24),
      woodMat
    )
    stoolSeat.position.set(0, 0.58, 0)
    stoolSeat.castShadow = true
    stoolGroup.add(stoolSeat)

    const stoolLegGeo = new THREE.CylinderGeometry(0.016, 0.012, 0.59, 12)
    const legPositions: [number, number, number, number][] = [
      [-0.14, 0.29, -0.14, 0.08],
      [0.14, 0.29, -0.14, -0.08],
      [-0.14, 0.29, 0.14, 0.08],
      [0.14, 0.29, 0.14, -0.08],
    ]
    legPositions.forEach(([lx, ly, lz, rotZ]) => {
      const leg = new THREE.Mesh(stoolLegGeo, woodMat)
      leg.position.set(lx, ly, lz)
      leg.rotation.z = rotZ
      leg.castShadow = true
      stoolGroup.add(leg)
    })

    const rung = new THREE.Mesh(
      new THREE.TorusGeometry(0.14, 0.008, 8, 24),
      woodMat
    )
    rung.rotation.x = Math.PI / 2
    rung.position.set(0, 0.22, 0)
    stoolGroup.add(rung)

    // --- The Interactive Thinker / Builder (Stands up & paces along the thinking wall) ---
    const characterGroup = new THREE.Group()
    characterGroup.position.set(1.25, 0, 0.85)
    characterGroup.scale.set(0.6, 0.6, 0.6)
    scene.add(characterGroup)

    // Character Silhouette Materials (Dark studio palette tailored for silhouette reading)
    const jacketMat = new THREE.MeshStandardMaterial({
      color: 0x222621,
      roughness: 0.88,
      metalness: 0.04,
    })
    const pantsMat = new THREE.MeshStandardMaterial({
      color: 0x181a17,
      roughness: 0.92,
      metalness: 0.03,
    })
    const bootMat = new THREE.MeshStandardMaterial({
      color: 0x1b1916,
      roughness: 0.75,
      metalness: 0.06,
    })

    // Left Leg Hierarchical Joint Chain (Hip -> Knee -> Boot)
    const leftLegGroup = new THREE.Group()
    leftLegGroup.position.set(-0.13, 0.58, 0)
    leftLegGroup.rotation.x = 1.48
    characterGroup.add(leftLegGroup)

    const leftThigh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.085, 0.072, 0.32, 12),
      pantsMat
    )
    leftThigh.position.set(0, -0.16, 0)
    leftThigh.castShadow = true
    leftLegGroup.add(leftThigh)

    const leftKneeGroup = new THREE.Group()
    leftKneeGroup.position.set(0, -0.32, 0)
    leftKneeGroup.rotation.x = -1.48
    leftLegGroup.add(leftKneeGroup)

    const leftCalf = new THREE.Mesh(
      new THREE.CylinderGeometry(0.072, 0.058, 0.30, 12),
      pantsMat
    )
    leftCalf.position.set(0, -0.15, 0)
    leftCalf.castShadow = true
    leftKneeGroup.add(leftCalf)

    const leftBoot = new THREE.Mesh(
      new THREE.BoxGeometry(0.09, 0.07, 0.16),
      bootMat
    )
    leftBoot.position.set(0, -0.30, 0.035)
    leftBoot.castShadow = true
    leftKneeGroup.add(leftBoot)

    // Right Leg Hierarchical Joint Chain (Hip -> Knee -> Boot)
    const rightLegGroup = new THREE.Group()
    rightLegGroup.position.set(0.13, 0.58, 0)
    rightLegGroup.rotation.x = 1.48
    characterGroup.add(rightLegGroup)

    const rightThigh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.085, 0.072, 0.32, 12),
      pantsMat
    )
    rightThigh.position.set(0, -0.16, 0)
    rightThigh.castShadow = true
    rightLegGroup.add(rightThigh)

    const rightKneeGroup = new THREE.Group()
    rightKneeGroup.position.set(0, -0.32, 0)
    rightKneeGroup.rotation.x = -1.48
    rightLegGroup.add(rightKneeGroup)

    const rightCalf = new THREE.Mesh(
      new THREE.CylinderGeometry(0.072, 0.058, 0.30, 12),
      pantsMat
    )
    rightCalf.position.set(0, -0.15, 0)
    rightCalf.castShadow = true
    rightKneeGroup.add(rightCalf)

    const rightBoot = new THREE.Mesh(
      new THREE.BoxGeometry(0.09, 0.07, 0.16),
      bootMat
    )
    rightBoot.position.set(0, -0.30, 0.035)
    rightBoot.castShadow = true
    rightKneeGroup.add(rightBoot)

    // Torso / Back & Upper Body
    const torsoGroup = new THREE.Group()
    torsoGroup.position.set(0, 0.60, 0)
    characterGroup.add(torsoGroup)

    const torso = new THREE.Mesh(
      new THREE.CylinderGeometry(0.21, 0.17, 0.46, 16),
      jacketMat
    )
    torso.position.set(0, 0.24, -0.03)
    torso.rotation.x = 0.12
    torso.castShadow = true
    torsoGroup.add(torso)

    const shoulders = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 16, 16),
      jacketMat
    )
    shoulders.scale.set(1.22, 0.64, 0.8)
    shoulders.position.set(0, 0.45, -0.05)
    shoulders.castShadow = true
    torsoGroup.add(shoulders)

    // Left Arm Chain (Shoulder -> Elbow)
    const leftArmGroup = new THREE.Group()
    leftArmGroup.position.set(-0.24, 0.40, -0.03)
    leftArmGroup.rotation.x = 0.12
    torsoGroup.add(leftArmGroup)

    const leftUpperArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.052, 0.044, 0.28, 12),
      jacketMat
    )
    leftUpperArm.position.set(0, -0.14, 0)
    leftUpperArm.castShadow = true
    leftArmGroup.add(leftUpperArm)

    const leftForearmGroup = new THREE.Group()
    leftForearmGroup.position.set(0, -0.28, 0)
    leftForearmGroup.rotation.x = 0.22
    leftArmGroup.add(leftForearmGroup)

    const leftForearm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.044, 0.036, 0.26, 12),
      jacketMat
    )
    leftForearm.position.set(0, -0.13, 0.02)
    leftForearm.castShadow = true
    leftForearmGroup.add(leftForearm)

    // Right Arm Chain (Shoulder -> Elbow)
    const rightArmGroup = new THREE.Group()
    rightArmGroup.position.set(0.24, 0.40, -0.03)
    rightArmGroup.rotation.x = 0.12
    torsoGroup.add(rightArmGroup)

    const rightUpperArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.052, 0.044, 0.28, 12),
      jacketMat
    )
    rightUpperArm.position.set(0, -0.14, 0)
    rightUpperArm.castShadow = true
    rightArmGroup.add(rightUpperArm)

    const rightForearmGroup = new THREE.Group()
    rightForearmGroup.position.set(0, -0.28, 0)
    rightForearmGroup.rotation.x = 0.22
    rightArmGroup.add(rightForearmGroup)

    const rightForearm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.044, 0.036, 0.26, 12),
      jacketMat
    )
    rightForearm.position.set(0, -0.13, 0.02)
    rightForearm.castShadow = true
    rightForearmGroup.add(rightForearm)

    // Head & Neck Group (ONLY the head and neck respond to cursor tracking)
    const headGroup = new THREE.Group()
    headGroup.position.set(0, 0.58, -0.07)
    torsoGroup.add(headGroup)

    const neck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.062, 0.076, 0.11, 12),
      jacketMat
    )
    neck.position.set(0, 0.055, 0)
    headGroup.add(neck)

    // Base Skull Form
    const skullGeo = new THREE.SphereGeometry(0.12, 16, 16)
    skullGeo.scale(0.92, 1.05, 0.98)
    const skull = new THREE.Mesh(skullGeo, jacketMat)
    skull.position.set(0, 0.165, 0)
    skull.castShadow = true
    headGroup.add(skull)

    // Stylized Sculpted Hair (low-poly natural volume, recognizable rear human silhouette)
    const hairGroup = new THREE.Group()
    headGroup.add(hairGroup)

    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x121411,
      roughness: 0.92,
      flatShading: true,
    })

    // Main back/sides hair volume with faceted low-poly planes
    const mainHairGeo = new THREE.IcosahedronGeometry(0.138, 1)
    mainHairGeo.scale(0.95, 1.08, 1.05)
    const mainHair = new THREE.Mesh(mainHairGeo, hairMat)
    mainHair.position.set(0, 0.175, 0.015)
    mainHair.castShadow = true
    hairGroup.add(mainHair)

    // Crown volume (adds stylized height and messy natural profile on top)
    const crownGeo = new THREE.DodecahedronGeometry(0.09, 0)
    crownGeo.scale(1.2, 0.7, 1.1)
    const crown = new THREE.Mesh(crownGeo, hairMat)
    crown.position.set(-0.01, 0.27, -0.01)
    crown.rotation.set(0.1, 0.2, -0.15)
    crown.castShadow = true
    hairGroup.add(crown)

    // Sculpted hair tufts on top (slightly uneven, natural silhouette)
    const tuftGeo1 = new THREE.ConeGeometry(0.035, 0.07, 5)
    const tuft1 = new THREE.Mesh(tuftGeo1, hairMat)
    tuft1.position.set(-0.045, 0.30, 0.02)
    tuft1.rotation.set(0.3, 0.2, -0.35)
    hairGroup.add(tuft1)

    const tuftGeo2 = new THREE.ConeGeometry(0.03, 0.065, 5)
    const tuft2 = new THREE.Mesh(tuftGeo2, hairMat)
    tuft2.position.set(0.05, 0.295, -0.02)
    tuft2.rotation.set(0.15, -0.3, 0.4)
    hairGroup.add(tuft2)

    // Left side/temple clump
    const sideClumpL = new THREE.Mesh(new THREE.DodecahedronGeometry(0.05, 0), hairMat)
    sideClumpL.position.set(-0.115, 0.17, -0.01)
    sideClumpL.rotation.set(0.2, 0.4, -0.1)
    hairGroup.add(sideClumpL)

    // Right side/temple clump (subtle asymmetry)
    const sideClumpR = new THREE.Mesh(new THREE.DodecahedronGeometry(0.048, 0), hairMat)
    sideClumpR.position.set(0.118, 0.175, 0.01)
    sideClumpR.rotation.set(-0.1, -0.3, 0.2)
    hairGroup.add(sideClumpR)

    // Nape taper (clean transition down to the neck viewed from behind)
    const napeGeo = new THREE.CylinderGeometry(0.072, 0.058, 0.085, 7)
    const nape = new THREE.Mesh(napeGeo, hairMat)
    nape.position.set(0, 0.08, 0.065)
    nape.rotation.x = -0.15
    hairGroup.add(nape)

    // Subtle stylized ears visible under hair sides
    const earMat = new THREE.MeshStandardMaterial({
      color: 0x1e201b,
      roughness: 0.88,
    })
    const earGeo = new THREE.SphereGeometry(0.028, 8, 8)
    earGeo.scale(0.6, 1.2, 0.8)

    const earL = new THREE.Mesh(earGeo, earMat)
    earL.position.set(-0.11, 0.15, -0.02)
    earL.rotation.z = -0.15
    headGroup.add(earL)

    const earR = new THREE.Mesh(earGeo, earMat)
    earR.position.set(0.11, 0.15, -0.02)
    earR.rotation.z = 0.15
    headGroup.add(earR)

    // --- Practical Workshop Desk Lamp (2 AM Warm Ambient Light) ---
    // A small, understated physical lamp beside and slightly behind the seated person (shifted with character)
    const lampGroup = new THREE.Group()
    lampGroup.position.set(0.87, 0, 0.98)
    lampGroup.scale.set(1.5, 1.5, 1.5)
    scene.add(lampGroup)

    const lampIronMat = new THREE.MeshStandardMaterial({
      color: 0x1e201b,
      roughness: 0.7,
      metalness: 0.35,
    })
    const lampBrassMat = new THREE.MeshStandardMaterial({
      color: 0x3d3527,
      roughness: 0.55,
      metalness: 0.45,
    })
    const shadeExtMat = new THREE.MeshStandardMaterial({
      color: 0x1f221d,
      roughness: 0.72,
      metalness: 0.15,
    })
    const shadeIntMat = new THREE.MeshStandardMaterial({
      color: 0x3d382d,
      roughness: 0.55,
      metalness: 0.2,
      side: THREE.BackSide,
    })

    // 1. Heavy circular weighted workshop base
    const lampBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.052, 0.058, 0.014, 24),
      lampIronMat
    )
    lampBase.position.set(0, 0.007, 0)
    lampBase.castShadow = true
    lampBase.receiveShadow = true
    lampGroup.add(lampBase)

    // Base collar
    const lampCollar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.014, 0.012, 12),
      lampBrassMat
    )
    lampCollar.position.set(0, 0.018, 0)
    lampGroup.add(lampCollar)

    // 2. Slender lower vertical stem
    const lowerStem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.005, 0.005, 0.24, 12),
      lampIronMat
    )
    lowerStem.position.set(0, 0.14, 0)
    lowerStem.castShadow = true
    lampGroup.add(lowerStem)

    // 3. Middle mechanical pivot hinge (workshop character)
    const midHinge = new THREE.Mesh(
      new THREE.SphereGeometry(0.01, 10, 10),
      lampBrassMat
    )
    midHinge.position.set(0, 0.26, 0)
    lampGroup.add(midHinge)

    const wingNut = new THREE.Mesh(
      new THREE.BoxGeometry(0.024, 0.006, 0.006),
      lampBrassMat
    )
    wingNut.position.set(0, 0.26, 0)
    lampGroup.add(wingNut)

    // 4. Upper angled arm (reaching gently toward the character)
    const upperArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.0045, 0.0045, 0.16, 10),
      lampIronMat
    )
    upperArm.position.set(0.035, 0.32, -0.025)
    upperArm.rotation.set(-0.22, 0, -0.42)
    upperArm.castShadow = true
    lampGroup.add(upperArm)

    // 5. Shade socket knuckle
    const socketKnuckle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.009, 0.008, 0.018, 12),
      lampBrassMat
    )
    socketKnuckle.position.set(0.07, 0.38, -0.05)
    lampGroup.add(socketKnuckle)

    // 6. Classical metal bell/cone shade (angled toward character's back & stool)
    const shadeGroup = new THREE.Group()
    shadeGroup.position.set(0.085, 0.37, -0.06)
    shadeGroup.rotation.set(0.32, 0.1, 0.62)
    lampGroup.add(shadeGroup)

    const shadeExterior = new THREE.Mesh(
      new THREE.CylinderGeometry(0.018, 0.046, 0.065, 18, 1, true),
      shadeExtMat
    )
    shadeExterior.castShadow = true
    shadeGroup.add(shadeExterior)

    const shadeInterior = new THREE.Mesh(
      new THREE.CylinderGeometry(0.0175, 0.0455, 0.064, 18, 1, true),
      shadeIntMat
    )
    shadeGroup.add(shadeInterior)

    // 7. Warm glowing bulb nestled inside the shade
    const bulbMat = new THREE.MeshStandardMaterial({
      color: 0xfff6e8,
      emissive: 0xfdeec9,
      emissiveIntensity: 0.85,
      roughness: 0.25,
    })
    const bulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.014, 12, 12),
      bulbMat
    )
    bulb.position.set(0, -0.01, 0)
    shadeGroup.add(bulb)

    // 8. Warm practical light source (ALWAYS on, softly revealing person, stool & floor)
    // 2800K warm incandescent glow with smooth physical falloff scaled with the scene
    const lampLight = new THREE.PointLight(0xfaecd5, 1.8, 3.0, 2.0)
    lampLight.position.set(0.095, 0.36, -0.07)
    lampGroup.add(lampLight)

    // --- The Architectural Ceiling Pendant Lamp ---
    // Drops down from the ceiling when light mode is activated to illuminate the 2 AM thinking room
    const ceilingLampAnchor = new THREE.Vector3(0.25, 5.5, 1.15)
    const ceilingLampGroup = new THREE.Group()
    ceilingLampGroup.position.set(ceilingLampAnchor.x, lightModeRef.current ? 2.45 : 5.25, ceilingLampAnchor.z)
    scene.add(ceilingLampGroup)

    // 1. Ceiling Canopy disc (mounted high on ceiling)
    const canopyMat = new THREE.MeshStandardMaterial({
      color: 0x181a17,
      roughness: 0.6,
      metalness: 0.5,
    })
    const canopy = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.07, 0.016, 24),
      canopyMat
    )
    canopy.position.set(ceilingLampAnchor.x, 5.48, ceilingLampAnchor.z)
    scene.add(canopy)

    // 2. Dynamic Braided Electrical Cable
    const cordGeo = new THREE.CylinderGeometry(0.0035, 0.0035, 1, 8)
    const cordMat = new THREE.MeshStandardMaterial({
      color: 0x121311,
      roughness: 0.9,
    })
    const cord = new THREE.Mesh(cordGeo, cordMat)
    scene.add(cord)

    // 3. Hanging Lamp Fixture & Shade Body (rotates around top attachment pivot)
    const lampBody = new THREE.Group()
    ceilingLampGroup.add(lampBody)

    // Strain relief knuckle & hanging ring at top of fixture
    const fixtureBrassMat = new THREE.MeshStandardMaterial({
      color: 0xcca352,
      roughness: 0.35,
      metalness: 0.75,
    })
    const fixtureKnuckle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.014, 0.014, 0.05, 16),
      fixtureBrassMat
    )
    fixtureKnuckle.position.set(0, 0.18, 0)
    lampBody.add(fixtureKnuckle)

    const loopRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.014, 0.004, 8, 16),
      fixtureBrassMat
    )
    loopRing.position.set(0, 0.21, 0)
    lampBody.add(loopRing)

    // Upper socket neck
    const socketNeck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.024, 0.028, 0.06, 20),
      fixtureBrassMat
    )
    socketNeck.position.set(0, 0.13, 0)
    lampBody.add(socketNeck)

    // Conical Mid-Century Industrial Pendant Shade
    const shadeMatExterior = new THREE.MeshStandardMaterial({
      color: 0x1a1c18,
      roughness: 0.65,
      metalness: 0.35,
      side: THREE.FrontSide,
    })
    const shadeMatInterior = new THREE.MeshStandardMaterial({
      color: 0xf2c463,
      roughness: 0.28,
      metalness: 0.85,
      side: THREE.BackSide,
    })

    const shadeExt = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.28, 0.20, 32, 1, true),
      shadeMatExterior
    )
    shadeExt.castShadow = true
    lampBody.add(shadeExt)

    const shadeInt = new THREE.Mesh(
      new THREE.CylinderGeometry(0.049, 0.279, 0.198, 32, 1, true),
      shadeMatInterior
    )
    lampBody.add(shadeInt)

    // Spun metal bottom rolled lip
    const shadeRim = new THREE.Mesh(
      new THREE.TorusGeometry(0.28, 0.008, 12, 36),
      fixtureBrassMat
    )
    shadeRim.position.set(0, -0.10, 0)
    shadeRim.rotation.x = Math.PI / 2
    lampBody.add(shadeRim)

    // Edison Exposed Filament Bulb
    const bulbGlassMat = new THREE.MeshStandardMaterial({
      color: 0xfff7e8,
      roughness: 0.12,
      metalness: 0.05,
      transparent: true,
      opacity: 0.55,
    })
    const bulbGlass = new THREE.Mesh(
      new THREE.SphereGeometry(0.044, 20, 20),
      bulbGlassMat
    )
    bulbGlass.scale.set(0.92, 1.25, 0.92)
    bulbGlass.position.set(0, -0.045, 0)
    lampBody.add(bulbGlass)

    // Glowing Filament Coil
    const filamentMat = new THREE.MeshStandardMaterial({
      color: 0xfff0c2,
      emissive: 0xffc44d,
      emissiveIntensity: lightModeRef.current ? 4.8 : 0,
      roughness: 0.2,
    })
    const filament = new THREE.Mesh(
      new THREE.TorusGeometry(0.016, 0.0035, 8, 16),
      filamentMat
    )
    filament.position.set(0, -0.038, 0)
    filament.rotation.x = Math.PI / 2
    lampBody.add(filament)

    // Pull Chain with brass bead dangling down past the shade
    const pullChainGroup = new THREE.Group()
    pullChainGroup.position.set(0.075, 0.06, 0.04)
    lampBody.add(pullChainGroup)

    const beadGeo = new THREE.SphereGeometry(0.0035, 8, 8)
    for (let b = 0; b < 6; b++) {
      const bead = new THREE.Mesh(beadGeo, fixtureBrassMat)
      bead.position.set(0, -b * 0.035, 0)
      pullChainGroup.add(bead)
    }
    const pullFob = new THREE.Mesh(
      new THREE.CylinderGeometry(0.002, 0.0065, 0.024, 10),
      fixtureBrassMat
    )
    pullFob.position.set(0, -6 * 0.035 - 0.012, 0)
    pullChainGroup.add(pullFob)

    // Hit box for clicking/pulling the lamp directly
    const hitSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.34, 8, 8),
      new THREE.MeshBasicMaterial({ visible: false })
    )
    hitSphere.position.set(0, -0.02, 0)
    lampBody.add(hitSphere)

    // --- Ceiling Lamp Lights (Illuminate the Room) ---
    // 1. Broad omnidirectional room point light
    const pendantPointLight = new THREE.PointLight(0xffeed4, lightModeRef.current ? 4.8 : 0, 16, 1.4)
    pendantPointLight.position.set(0, -0.05, 0)
    pendantPointLight.castShadow = true
    pendantPointLight.shadow.bias = -0.001
    pendantPointLight.shadow.mapSize.set(512, 512)
    lampBody.add(pendantPointLight)

    // 2. Focused downward spotlight pooling light on floor and desk
    const spotTarget = new THREE.Object3D()
    spotTarget.position.set(0, -4.0, 0)
    lampBody.add(spotTarget)

    const pendantDownSpot = new THREE.SpotLight(0xfff6e6, lightModeRef.current ? 6.8 : 0, 12, Math.PI / 2.5, 0.65, 1.2)
    pendantDownSpot.position.set(0, 0.02, 0)
    pendantDownSpot.target = spotTarget
    pendantDownSpot.castShadow = true
    lampBody.add(pendantDownSpot)

    // --- Locomotion & Thinker State ---
    let standFactor = 0.0           // 0 = seated on stool, 1 = standing & exploring
    let hasStartedExploring = false // set true when user begins exploring the wall
    let stoolBaseX = 1.25           // base anchor for the stool on the studio floor
    let characterTargetX = 1.25     // horizontal target position for character
    let characterSpeedX = 0         // current horizontal movement speed
    let walkCycle = 0               // radian phase for walking stride
    let isWalking = false
    let idleTimer = 0               // time in seconds since user last moved mouse
    let lastPointerX = 0
    let lastPointerY = 0
    let mouseMovedDistance = 0

    // --- Composition Layout: Shift character + lamp 20% to the right ---
    const updateCompositionPosition = () => {
      const d = camera.position.z - 0.85
      const vFovRad = THREE.MathUtils.degToRad(camera.fov)
      const halfHeight = d * Math.tan(vFovRad / 2)
      const halfWidth = halfHeight * camera.aspect
      // Exact 20% of hero viewport width toward the right
      const deltaX = halfWidth * 0.40
      stoolBaseX = deltaX

      stoolGroup.position.set(stoolBaseX, 0, 0.85)
      lampGroup.position.set(stoolBaseX - 0.38, 0, 0.98)

      if (!hasStartedExploring) {
        characterGroup.position.set(stoolBaseX, 0, 0.85)
        characterTargetX = stoolBaseX
      }

      const ceilingLampX = deltaX * 0.45 - 0.15
      ceilingLampAnchor.set(ceilingLampX, 5.5, 1.15)
      canopy.position.x = ceilingLampX
      ceilingLampGroup.position.x = ceilingLampX
    }
    updateCompositionPosition()

    // --- Interaction: Smooth Mouse & Touch Raycasting ---
    const mouseNorm = { x: 0, y: 0 }
    const targetBoardPos = new THREE.Vector3(0, 1.6, 0)
    const currentBoardPos = new THREE.Vector3(0, 1.6, 0)
    const raycaster = new THREE.Raycaster()
    const boardPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)

    const onPointerMove = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect()
      mouseNorm.x = ((clientX - rect.left) / rect.width) * 2 - 1
      mouseNorm.y = -(((clientY - rect.top) / rect.height) * 2 - 1)

      // Accumulate pointer movement to trigger standing up once user starts exploring
      const dxPointer = clientX - lastPointerX
      const dyPointer = clientY - lastPointerY
      const moveDelta = Math.sqrt(dxPointer * dxPointer + dyPointer * dyPointer)
      lastPointerX = clientX
      lastPointerY = clientY

      idleTimer = 0

      if (!hasStartedExploring && lastPointerX !== 0) {
        mouseMovedDistance += moveDelta
        if (mouseMovedDistance > 35) {
          hasStartedExploring = true
        }
      }

      // Raycast against the board plane (z = 0)
      raycaster.setFromCamera(new THREE.Vector2(mouseNorm.x, mouseNorm.y), camera)
      const hit = new THREE.Vector3()
      if (raycaster.ray.intersectPlane(boardPlane, hit)) {
        // Dynamic full-breadth clamping across the expanded studio wall
        const d = camera.position.z
        const vFovRad = THREE.MathUtils.degToRad(camera.fov)
        const halfHeight = d * Math.tan(vFovRad / 2)
        const halfWidth = halfHeight * camera.aspect
        const maxClampX = Math.min(Math.max(halfWidth * 0.98, 5.8), 6.5)
        hit.x = THREE.MathUtils.clamp(hit.x, -maxClampX, maxClampX)
        hit.y = THREE.MathUtils.clamp(hit.y, 0.25, 3.65)
        targetBoardPos.copy(hit)
      }

      // Check hover on lamp
      const lampHits = raycaster.intersectObjects([hitSphere, shadeExt, shadeRim, bulbGlass], true)
      if (lampHits.length > 0) {
        container.style.cursor = 'pointer'
      } else {
        container.style.cursor = ''
      }

      setHintVisible(false)
    }

    const handleMouseMove = (e: MouseEvent) => {
      onPointerMove(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        onPointerMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    // Direct Click / Tap on Lamp or Pull Chain
    const handleContainerClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const clickMouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -(((e.clientY - rect.top) / rect.height) * 2 - 1)
      )
      raycaster.setFromCamera(clickMouse, camera)
      const hits = raycaster.intersectObjects([hitSphere, shadeExt, shadeRim, bulbGlass], true)
      if (hits.length > 0) {
        swingVelZ += (Math.random() - 0.5) * 2.6
        swingVelX += 1.8
        onToggleTheme?.()
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    container.addEventListener('click', handleContainerClick)

    // --- Responsive Window Resize ---
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      adjustCamera()
      updateCompositionPosition()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    // --- Performance: Halt Loop When Scrolled Past Hero ---
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isRendering = entry.isIntersecting
          if (isRendering && !animationFrameId) {
            clock.start()
            tick()
          }
        })
      },
      { threshold: 0.05 }
    )
    observer.observe(container)

    // --- Physics and Animation State for Lamp & Illumination ---
    const DEPLOYED_Y = 2.45
    const RETRACTED_Y = 5.25
    let currentY = lightModeRef.current ? DEPLOYED_Y : RETRACTED_Y
    let velocityY = 0
    let rotZ = 0
    let rotX = 0
    let swingVelZ = 0
    let swingVelX = 0
    let lastLightState = lightModeRef.current
    let lightSwitchedOn = lightModeRef.current
    let sparkIntensity = 0
    let currentIllumination = lightModeRef.current ? 1.0 : 0
    let headLookUpImpulse = 0

    // --- Animation Loop ---
    const clock = new THREE.Clock()

    const tick = () => {
      if (!isRendering) {
        animationFrameId = null
        return
      }

      const delta = Math.min(clock.getDelta(), 0.05)
      const isLight = lightModeRef.current

      // Detect light mode toggle transitions
      if (isLight !== lastLightState) {
        lastLightState = isLight
        if (isLight) {
          // Fall from ceiling!
          currentY = Math.max(currentY, 4.95)
          velocityY = -2.8
          swingVelZ = -3.4
          swingVelX = 1.6
          lightSwitchedOn = false
          sparkIntensity = 0
        } else {
          // Retract back into ceiling!
          playLampClick(false)
          lightSwitchedOn = false
          sparkIntensity = 0
        }
      }

      // Physics integration for falling & spring bounce
      if (isLight) {
        const kSpring = 38
        const cSpring = 6.6
        const accelY = -kSpring * (currentY - DEPLOYED_Y) - cSpring * velocityY
        velocityY += accelY * delta
        currentY += velocityY * delta

        // Angular pendulum sway
        const kRot = 18
        const cRot = 3.2
        swingVelZ += (-kRot * rotZ - cRot * swingVelZ) * delta
        rotZ += swingVelZ * delta
        swingVelX += (-kRot * rotX - cRot * swingVelX) * delta
        rotX += swingVelX * delta

        // Switch on light as lamp reaches near the bottom of the drop
        if (currentY <= DEPLOYED_Y + 0.18 && !lightSwitchedOn) {
          lightSwitchedOn = true
          playLampClick(true)
          sparkIntensity = 1.4 // incandescent turn-on burst
          headLookUpImpulse = 0.24 // character reacts by glancing up!
        }
      } else {
        // Retracting upwards
        currentY = THREE.MathUtils.lerp(currentY, RETRACTED_Y, 0.075)
        velocityY = 0
        rotZ = THREE.MathUtils.lerp(rotZ, 0, 0.08)
        rotX = THREE.MathUtils.lerp(rotX, 0, 0.08)
        swingVelZ = 0
        swingVelX = 0
      }

      ceilingLampGroup.position.y = currentY
      lampBody.rotation.z = rotZ
      lampBody.rotation.x = rotX

      // Update Hanging Braided Cord Geometry
      const topP = ceilingLampAnchor
      const bottomP = new THREE.Vector3()
      fixtureKnuckle.getWorldPosition(bottomP)
      const cordVec = bottomP.clone().sub(topP)
      const cordLen = cordVec.length()
      cord.position.copy(topP.clone().addScaledVector(cordVec, 0.5))
      cord.scale.set(1, Math.max(0.01, cordLen), 1)
      cord.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), cordVec.normalize())

      // Room Illumination interpolation
      const targetIllum = lightSwitchedOn ? 1.0 : 0.0
      currentIllumination = THREE.MathUtils.lerp(currentIllumination, targetIllum, 0.075)

      sparkIntensity = THREE.MathUtils.lerp(sparkIntensity, 0, 0.12)
      const effectiveLight = Math.min(1.25, currentIllumination + sparkIntensity)

      // Lamp Bulb & Direct Lights
      pendantPointLight.intensity = effectiveLight * 4.8
      pendantDownSpot.intensity = effectiveLight * 6.8
      filamentMat.emissiveIntensity = effectiveLight * 4.8

      // Room Ambient & Rim Lights (Illuminating the entire room)
      ambientLight.intensity = THREE.MathUtils.lerp(0.6, 2.35, currentIllumination)
      ambientLight.color.lerpColors(new THREE.Color(0x20241e), new THREE.Color(0xfff7ea), currentIllumination)
      rimLight.intensity = THREE.MathUtils.lerp(0.7, 1.85, currentIllumination)
      rimLight.color.lerpColors(new THREE.Color(0x40483e), new THREE.Color(0xffeed6), currentIllumination)
      floorBounce.intensity = THREE.MathUtils.lerp(0.4, 1.15, currentIllumination)
      floorBounce.color.lerpColors(new THREE.Color(0x1a1c18), new THREE.Color(0xebe2d3), currentIllumination)

      // Fog, Background, Studio Materials
      sceneBgColor.lerpColors(new THREE.Color(0x090a09), new THREE.Color(0xede8dc), currentIllumination)
      sceneFog.color.lerpColors(new THREE.Color(0x090a09), new THREE.Color(0xede8dc), currentIllumination)
      sceneFog.density = THREE.MathUtils.lerp(0.055, 0.024, currentIllumination)
      wallMat.color.lerpColors(new THREE.Color(0x0e100e), new THREE.Color(0xe5ded2), currentIllumination)
      ceilingMat.color.lerpColors(new THREE.Color(0x0a0c0a), new THREE.Color(0xded7cb), currentIllumination)
      skirtingMat.color.lerpColors(new THREE.Color(0x161815), new THREE.Color(0x3a352d), currentIllumination)
      floorMat.color.lerpColors(new THREE.Color(0x0c0e0c), new THREE.Color(0x282c25), currentIllumination)
      boardMat.color.lerpColors(new THREE.Color(0x111311), new THREE.Color(0x2e332c), currentIllumination)

      // 1. Smoothly interpolate spotlight target toward cursor raycast hit
      currentBoardPos.lerp(targetBoardPos, 0.075)
      spotlightTarget.position.copy(currentBoardPos)

      // Move spotlight origin slightly to create dynamic shadows across artifacts
      spotlight.position.x = THREE.MathUtils.lerp(spotlight.position.x, currentBoardPos.x * 0.52, 0.06)
      spotlight.position.y = THREE.MathUtils.lerp(spotlight.position.y, currentBoardPos.y * 0.4 + 1.2, 0.06)

      // Spill light follows close behind
      spillLight.position.x = currentBoardPos.x
      spillLight.position.y = currentBoardPos.y

      // 2. Thinker Stand-up, Locomotion & Pacing Across the Studio Floor
      // Dynamic floor bounds for character movement along z = 0.85
      const dFloor = camera.position.z - 0.85
      const vFovRadFloor = THREE.MathUtils.degToRad(camera.fov)
      const halfWidthFloor = dFloor * Math.tan(vFovRadFloor / 2) * camera.aspect
      const maxCharX = Math.min(Math.max(halfWidthFloor * 0.84, 3.8), 5.2)

      // Idle return timer: if inactive for 14s, return to stool and sit
      if (hasStartedExploring) {
        idleTimer += delta
        if (idleTimer > 14.0) {
          characterTargetX = stoolBaseX
          if (Math.abs(characterGroup.position.x - stoolBaseX) < 0.08 && Math.abs(characterSpeedX) < 0.04) {
            hasStartedExploring = false
            mouseMovedDistance = 0
          }
        } else {
          // Follow spotlight X on the thinking wall with ergonomic offset so silhouette doesn't cover card
          const viewOffset = targetBoardPos.x > 0 ? -0.32 : 0.32
          characterTargetX = THREE.MathUtils.clamp(targetBoardPos.x * 0.86 + viewOffset, -maxCharX, maxCharX)
        }
      } else {
        characterTargetX = stoolBaseX
      }

      // Smoothly interpolate standFactor (0.0 = seated on stool, 1.0 = fully standing)
      const targetStand = hasStartedExploring ? 1.0 : 0.0
      const standSpeed = hasStartedExploring ? 0.032 : 0.022
      standFactor = THREE.MathUtils.lerp(standFactor, targetStand, standSpeed)

      // Slow, contemplative pacing physics across studio floor
      const distX = characterTargetX - characterGroup.position.x
      const absDist = Math.abs(distX)

      if (standFactor > 0.65 && absDist > 0.22) {
        const walkDirection = Math.sign(distX)
        const maxWalkSpeed = 0.48 // Calm, slow, contemplative studio walk
        // Gradual acceleration with smooth deceleration as he approaches the card
        const targetSpeed = Math.min(maxWalkSpeed, absDist * 0.65) * walkDirection
        characterSpeedX = THREE.MathUtils.lerp(characterSpeedX, targetSpeed, 0.045)
        characterGroup.position.x += characterSpeedX * delta
        isWalking = Math.abs(characterSpeedX) > 0.04
      } else {
        characterSpeedX = THREE.MathUtils.lerp(characterSpeedX, 0, 0.08)
        characterGroup.position.x += characterSpeedX * delta
        isWalking = false
      }

      // When seated, pin character cleanly at stool position
      if (standFactor < 0.05 && !hasStartedExploring) {
        characterGroup.position.x = THREE.MathUtils.lerp(characterGroup.position.x, stoolBaseX, 0.08)
      }

      // Stride / Walk Cycle phase (scaled to slow pacing cadence)
      if (isWalking) {
        const paceCadence = 3.6 // Slow, deliberate steps
        walkCycle += delta * paceCadence * Math.min(1.0, Math.abs(characterSpeedX) / 0.35)
      } else {
        // Relax stride smoothly to neutral stance
        walkCycle = THREE.MathUtils.lerp(walkCycle, Math.round(walkCycle / Math.PI) * Math.PI, 0.06)
      }

      const stridePhase = walkCycle
      const strideMagnitude = isWalking ? Math.min(0.28, Math.abs(characterSpeedX) * 0.65) : 0

      // Leg Angles (Hip & Knee Joint Math)
      // Seated angles: thigh forward (+1.48 rad ~ 85°), calf down (-1.48 rad)
      const seatedHipX = 1.48
      const seatedKneeX = -1.48
      // Walking swing on hip & knee
      const walkHipL = Math.sin(stridePhase) * strideMagnitude
      const walkHipR = -Math.sin(stridePhase) * strideMagnitude
      const walkKneeL = Math.max(0, -Math.sin(stridePhase)) * strideMagnitude * 0.8
      const walkKneeR = Math.max(0, Math.sin(stridePhase)) * strideMagnitude * 0.8

      leftLegGroup.rotation.x = THREE.MathUtils.lerp(seatedHipX, walkHipL, standFactor)
      rightLegGroup.rotation.x = THREE.MathUtils.lerp(seatedHipX, walkHipR, standFactor)
      leftKneeGroup.rotation.x = THREE.MathUtils.lerp(seatedKneeX, -walkKneeL, standFactor)
      rightKneeGroup.rotation.x = THREE.MathUtils.lerp(seatedKneeX, -walkKneeR, standFactor)

      // Vertical hip & torso height interpolation
      const stepBob = isWalking ? Math.abs(Math.sin(stridePhase * 2)) * 0.016 : 0
      const currentHipY = THREE.MathUtils.lerp(0.58, 0.68, standFactor)
      const currentTorsoY = THREE.MathUtils.lerp(0.60, 0.70, standFactor) + stepBob

      leftLegGroup.position.y = currentHipY
      rightLegGroup.position.y = currentHipY
      torsoGroup.position.y = currentTorsoY

      // Torso posture & lateral sway
      const torsoSeatedLean = 0.12
      const torsoStandLean = 0.02
      const torsoWalkLean = characterSpeedX * 0.025 // subtle lean in travel direction
      torso.rotation.x = THREE.MathUtils.lerp(torsoSeatedLean, torsoStandLean + torsoWalkLean, standFactor)
      torso.rotation.z = -characterSpeedX * 0.025 // gentle weight transfer sway

      // Natural counter-arm swings
      const armSwingL = -Math.sin(stridePhase) * strideMagnitude * 0.65
      const armSwingR = Math.sin(stridePhase) * strideMagnitude * 0.65
      leftArmGroup.rotation.x = THREE.MathUtils.lerp(0.12, armSwingL, standFactor)
      rightArmGroup.rotation.x = THREE.MathUtils.lerp(0.12, armSwingR, standFactor)
      leftForearmGroup.rotation.x = THREE.MathUtils.lerp(0.22, Math.max(0, -armSwingL * 0.35), standFactor)
      rightForearmGroup.rotation.x = THREE.MathUtils.lerp(0.22, Math.max(0, -armSwingR * 0.35), standFactor)

      // Gentle body turn towards walking direction
      const targetFacingY = isWalking ? (characterSpeedX > 0 ? -0.18 : 0.18) : 0.0
      characterGroup.rotation.y = THREE.MathUtils.lerp(characterGroup.rotation.y, targetFacingY, 0.045)

      // 3. Dynamic Head & Neck Tracking (relative to character's current world position)
      const dx = currentBoardPos.x - characterGroup.position.x
      const dy = currentBoardPos.y - 1.8 // relative to board eye-line gaze

      const maxYaw = 0.45
      const maxPitch = 0.22

      const targetYaw = THREE.MathUtils.clamp(-dx * 0.16, -maxYaw, maxYaw)
      const targetPitch = THREE.MathUtils.clamp(dy * 0.14, -maxPitch, maxPitch)

      // Character reacts to falling lamp with a brief upward glance
      headLookUpImpulse = THREE.MathUtils.lerp(headLookUpImpulse, 0, 0.04)
      const targetPitchWithReaction = targetPitch + headLookUpImpulse

      // Smooth, deliberate gaze interpolation
      headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, targetYaw, 0.038)
      headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, targetPitchWithReaction, 0.038)

      neck.rotation.y = headGroup.rotation.y * 0.25
      neck.rotation.x = headGroup.rotation.x * 0.25

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(tick)
    }

    tick()

    // --- Cleanup ---
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      themeObserver.disconnect()
      container.removeEventListener('click', handleContainerClick)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
      renderer.dispose()
      scene.clear()
    }
  }, [])

  return (
    <div className="hero-3d-viewport" ref={containerRef} aria-hidden="true">
      {/* Subtle discovery hint that fades once interaction starts */}
      <div className={`hero-3d-hint ${hintVisible ? 'is-visible' : ''}`}>
        <span>Explore the board</span>
      </div>
    </div>
  )
}
