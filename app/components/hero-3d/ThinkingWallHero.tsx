'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export default function ThinkingWallHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hintVisible, setHintVisible] = useState(true)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animationFrameId: number | null = null
    let isRendering = true

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x090a09)
    scene.fog = new THREE.FogExp2(0x090a09, 0.08)

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
    spotlight.angle = Math.PI / 6.2
    spotlight.penumbra = 0.85
    spotlight.decay = 1.35
    spotlight.distance = 6.5
    spotlight.castShadow = true
    spotlight.shadow.mapSize.width = 1024
    spotlight.shadow.mapSize.height = 1024
    spotlight.shadow.camera.near = 0.5
    spotlight.shadow.camera.far = 6.5
    spotlight.shadow.bias = -0.001
    scene.add(spotlight)

    // Subtle localized fill point light following the spotlight for smooth radial falloff
    const spillLight = new THREE.PointLight(0xf7f0dd, 0.45, 1.8, 2.0)
    spillLight.position.set(0, 1.6, 0.55)
    scene.add(spillLight)

    // --- Studio Architecture (Floor & Back Wall) ---
    // Dark matte studio floor with subtle plank perspective
    const floorGeo = new THREE.PlaneGeometry(16, 16)
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0c0e0c,
      roughness: 0.88,
      metalness: 0.05,
    })
    const floor = new THREE.Mesh(floorGeo, floorMat)
    floor.rotation.x = -Math.PI / 2
    floor.position.y = 0
    floor.receiveShadow = true
    scene.add(floor)

    // Subtle floor plank lines
    const gridHelper = new THREE.GridHelper(16, 24, 0x161815, 0x121411)
    gridHelper.position.y = 0.005
    scene.add(gridHelper)

    // --- The Thinking Board (The Centerpiece of Mind) ---
    const boardWidth = 6.6
    const boardHeight = 3.6
    const boardGroup = new THREE.Group()
    boardGroup.position.set(0, 1.8, 0)
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

    // --- The Seated Figure (The Builder / Thinker) ---
    // Scaled to occupy ~25% of the hero's visual height, positioned 20% to the right
    const characterGroup = new THREE.Group()
    characterGroup.position.set(1.25, 0, 0.85)
    characterGroup.scale.set(0.6, 0.6, 0.6)
    scene.add(characterGroup)

    // Stool: simple 4-legged wooden workshop stool (understated, stable)
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
    characterGroup.add(stoolSeat)

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
      characterGroup.add(leg)
    })

    // Stool rung
    const rung = new THREE.Mesh(
      new THREE.TorusGeometry(0.14, 0.008, 8, 24),
      woodMat
    )
    rung.rotation.x = Math.PI / 2
    rung.position.set(0, 0.22, 0)
    characterGroup.add(rung)

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

    // Feet / Boots firmly planted on the studio floor
    const leftBoot = new THREE.Mesh(
      new THREE.BoxGeometry(0.09, 0.07, 0.16),
      bootMat
    )
    leftBoot.position.set(-0.13, 0.035, -0.12)
    leftBoot.rotation.y = 0.12
    leftBoot.castShadow = true
    characterGroup.add(leftBoot)

    const rightBoot = new THREE.Mesh(
      new THREE.BoxGeometry(0.09, 0.07, 0.16),
      bootMat
    )
    rightBoot.position.set(0.13, 0.035, -0.12)
    rightBoot.rotation.y = -0.12
    rightBoot.castShadow = true
    characterGroup.add(rightBoot)

    // Both Legs seated naturally on the stool (stable, no movement)
    // Thighs extending slightly forward from seat
    const leftThigh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.085, 0.072, 0.32, 12),
      pantsMat
    )
    leftThigh.position.set(-0.13, 0.46, -0.09)
    leftThigh.rotation.set(0.65, 0, -0.06)
    leftThigh.castShadow = true
    characterGroup.add(leftThigh)

    const rightThigh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.085, 0.072, 0.32, 12),
      pantsMat
    )
    rightThigh.position.set(0.13, 0.46, -0.09)
    rightThigh.rotation.set(0.65, 0, 0.06)
    rightThigh.castShadow = true
    characterGroup.add(rightThigh)

    // Calves descending from knees to boots
    const leftCalf = new THREE.Mesh(
      new THREE.CylinderGeometry(0.072, 0.058, 0.32, 12),
      pantsMat
    )
    leftCalf.position.set(-0.13, 0.18, -0.14)
    leftCalf.rotation.set(-0.15, 0, -0.04)
    leftCalf.castShadow = true
    characterGroup.add(leftCalf)

    const rightCalf = new THREE.Mesh(
      new THREE.CylinderGeometry(0.072, 0.058, 0.32, 12),
      pantsMat
    )
    rightCalf.position.set(0.13, 0.18, -0.14)
    rightCalf.rotation.set(-0.15, 0, 0.04)
    rightCalf.castShadow = true
    characterGroup.add(rightCalf)

    // Torso / Back (completely stable, quiet seated posture with slight forward contemplation)
    const torsoGroup = new THREE.Group()
    torsoGroup.position.set(0, 0.60, 0)
    characterGroup.add(torsoGroup)

    const torso = new THREE.Mesh(
      new THREE.CylinderGeometry(0.21, 0.17, 0.46, 16),
      jacketMat
    )
    torso.position.set(0, 0.24, -0.03)
    torso.rotation.x = 0.12 // slight natural lean forward
    torso.castShadow = true
    torsoGroup.add(torso)

    // Shoulders (smooth rounded width, completely stable)
    const shoulders = new THREE.Mesh(
      new THREE.SphereGeometry(0.24, 16, 16),
      jacketMat
    )
    shoulders.scale.set(1.22, 0.64, 0.8)
    shoulders.position.set(0, 0.45, -0.05)
    shoulders.castShadow = true
    torsoGroup.add(shoulders)

    // Both Arms resting forward toward knees (completely stable, no movement)
    const leftUpperArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.052, 0.044, 0.28, 12),
      jacketMat
    )
    leftUpperArm.position.set(-0.24, 0.34, 0.0)
    leftUpperArm.rotation.set(0.38, 0.05, 0.20)
    leftUpperArm.castShadow = true
    torsoGroup.add(leftUpperArm)

    const rightUpperArm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.052, 0.044, 0.28, 12),
      jacketMat
    )
    rightUpperArm.position.set(0.24, 0.34, 0.0)
    rightUpperArm.rotation.set(0.38, -0.05, -0.20)
    rightUpperArm.castShadow = true
    torsoGroup.add(rightUpperArm)

    const leftForearm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.044, 0.036, 0.26, 12),
      jacketMat
    )
    leftForearm.position.set(-0.21, 0.18, -0.10)
    leftForearm.rotation.set(0.85, 0.10, 0.22)
    leftForearm.castShadow = true
    torsoGroup.add(leftForearm)

    const rightForearm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.044, 0.036, 0.26, 12),
      jacketMat
    )
    rightForearm.position.set(0.21, 0.18, -0.10)
    rightForearm.rotation.set(0.85, -0.10, -0.22)
    rightForearm.castShadow = true
    torsoGroup.add(rightForearm)

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

    // --- Composition Layout: Shift character + lamp 20% to the right ---
    const updateCompositionPosition = () => {
      const d = camera.position.z - 0.85
      const vFovRad = THREE.MathUtils.degToRad(camera.fov)
      const halfHeight = d * Math.tan(vFovRad / 2)
      const halfWidth = halfHeight * camera.aspect
      // Exact 20% of hero viewport width toward the right
      const deltaX = halfWidth * 0.40

      characterGroup.position.set(deltaX, 0, 0.85)
      lampGroup.position.set(deltaX - 0.38, 0, 0.98)
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

      // Raycast against the board plane (z = 0)
      raycaster.setFromCamera(new THREE.Vector2(mouseNorm.x, mouseNorm.y), camera)
      const hit = new THREE.Vector3()
      if (raycaster.ray.intersectPlane(boardPlane, hit)) {
        // Clamp to board perimeter
        hit.x = THREE.MathUtils.clamp(hit.x, -2.8, 2.8)
        hit.y = THREE.MathUtils.clamp(hit.y, 0.4, 3.2)
        targetBoardPos.copy(hit)
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

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

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

    // --- Animation Loop ---
    const clock = new THREE.Clock()

    const tick = () => {
      if (!isRendering) {
        animationFrameId = null
        return
      }

      const elapsed = clock.getElapsedTime()

      // 1. Smoothly interpolate spotlight target toward cursor raycast hit
      currentBoardPos.lerp(targetBoardPos, 0.075)
      spotlightTarget.position.copy(currentBoardPos)

      // Move spotlight origin slightly to create dynamic shadows across artifacts
      spotlight.position.x = THREE.MathUtils.lerp(spotlight.position.x, currentBoardPos.x * 0.45, 0.06)
      spotlight.position.y = THREE.MathUtils.lerp(spotlight.position.y, currentBoardPos.y * 0.4 + 1.2, 0.06)

      // Spill light follows close behind
      spillLight.position.x = currentBoardPos.x
      spillLight.position.y = currentBoardPos.y

      // 2. Character Head Tracking:
      // Only the head and a slight amount of neck react. Torso, shoulders, stool, arms, and legs remain completely stable.
      const dx = currentBoardPos.x - characterGroup.position.x
      const dy = currentBoardPos.y - 1.8 // relative to board center gaze

      // Yaw: ±18° (±0.314 rad), Pitch: ±10° (±0.174 rad)
      const maxYaw = 0.314
      const maxPitch = 0.174

      // Cursor moves left (dx < 0) -> head turns left (targetYaw > 0)
      // Cursor moves right (dx > 0) -> head turns right (targetYaw < 0)
      // Cursor moves upward (dy > 0) -> head tilts upward (targetPitch > 0)
      // Cursor moves downward (dy < 0) -> head tilts downward (targetPitch < 0)
      const targetYaw = THREE.MathUtils.clamp(-dx * 0.125, -maxYaw, maxYaw)
      const targetPitch = THREE.MathUtils.clamp(dy * 0.12, -maxPitch, maxPitch)

      // Smooth human interpolation / gentle catch-up delay
      headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, targetYaw, 0.045)
      headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, targetPitch, 0.045)

      neck.rotation.y = headGroup.rotation.y * 0.22
      neck.rotation.x = headGroup.rotation.x * 0.22

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(tick)
    }

    tick()

    // --- Cleanup ---
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
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
