'use client'

import React, { useState } from 'react'

interface CourseItem {
  id: string
  title: string
  category: string
  lessons: number
  students: number
  progress: number // percentage
  status: 'active' | 'completed' | 'draft'
  color: string
}

const COURSES: CourseItem[] = [
  {
    id: 'c1',
    title: 'Advanced Multimodal AI Product Design',
    category: 'Product & AI',
    lessons: 18,
    students: 1420,
    progress: 78,
    status: 'active',
    color: '#3b82f6',
  },
  {
    id: 'c2',
    title: '0→1 Customer Discovery & Problem Validation',
    category: 'Startup Execution',
    lessons: 12,
    students: 2890,
    progress: 100,
    status: 'completed',
    color: '#10b981',
  },
  {
    id: 'c3',
    title: 'Figma to Code: Design Systems at Scale',
    category: 'UX Engineering',
    lessons: 24,
    students: 3100,
    progress: 45,
    status: 'active',
    color: '#8b5cf6',
  },
  {
    id: 'c4',
    title: 'Behavioral Economics for Product Growth',
    category: 'Growth & Funnels',
    lessons: 15,
    students: 980,
    progress: 92,
    status: 'active',
    color: '#f59e0b',
  },
]

export default function CourseFShowcase() {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all')
  const [activeNav, setActiveNav] = useState('Overview')
  const [hoveredDataPoint, setHoveredDataPoint] = useState<{ day: string; value: number } | null>(null)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [courseList, setCourseList] = useState<CourseItem[]>(COURSES)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const chartData = [
    { day: 'Mon', value: 38 },
    { day: 'Tue', value: 52 },
    { day: 'Wed', value: 46 },
    { day: 'Thu', value: 74 },
    { day: 'Fri', value: 68 },
    { day: 'Sat', value: 89 },
    { day: 'Sun', value: 95 },
  ]

  const filteredCourses = courseList.filter((c) => {
    if (activeTab === 'all') return true
    return c.status === activeTab
  })

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim()) return

    const newCourse: CourseItem = {
      id: `c-${Date.now()}`,
      title: newTitle,
      category: 'Product Strategy',
      lessons: 10,
      students: 1,
      progress: 0,
      status: 'active',
      color: '#06b6d4',
    }

    setCourseList([newCourse, ...courseList])
    setNewTitle('')
    setCreateModalOpen(false)
    setToastMessage(`✓ Course "${newTitle}" created successfully!`)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // SVG Chart path calculation
  const maxVal = 100
  const chartHeight = 120
  const chartWidth = 360
  const points = chartData.map((d, i) => {
    const x = (i / (chartData.length - 1)) * chartWidth
    const y = chartHeight - (d.value / maxVal) * chartHeight
    return { x, y, day: d.day, value: d.value }
  })
  const pathD = `M ${points.map((p) => `${p.x} ${p.y}`).join(' L ')}`
  const areaD = `${pathD} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`

  return (
    <div className="course-f-container">
      {/* Dark Sidebar Navigation */}
      <aside className="course-f-sidebar">
        <div className="sidebar-brand">
          <span className="brand-logo">⌘</span>
          <span className="brand-name">CourseF</span>
        </div>

        <nav className="sidebar-nav">
          {['Overview', 'Courses', 'Students', 'Analytics', 'Settings'].map((item) => (
            <button
              key={item}
              type="button"
              className={`sidebar-nav-item ${activeNav === item ? 'is-active' : ''}`}
              onClick={() => setActiveNav(item)}
            >
              <span className="nav-icon">
                {item === 'Overview' && '📊'}
                {item === 'Courses' && '📚'}
                {item === 'Students' && '👥'}
                {item === 'Analytics' && '📈'}
                {item === 'Settings' && '⚙️'}
              </span>
              <span className="nav-label">{item}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="instructor-card">
            <span className="avatar-chip">DC</span>
            <div className="instructor-meta">
              <strong>Dhananjay C.</strong>
              <small>Lead Instructor</small>
            </div>
          </div>
        </div>
      </aside>

      {/* Main SaaS Content Viewport */}
      <main className="course-f-main">
        {/* Top Header Bar */}
        <header className="course-f-topbar">
          <div className="topbar-search">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search curriculum, assignments, analytics..." />
          </div>

          <div className="topbar-actions">
            <button
              type="button"
              className="create-course-btn"
              onClick={() => setCreateModalOpen(true)}
            >
              + New Course
            </button>
          </div>
        </header>

        {/* Dashboard Metrics Row */}
        <div className="metrics-grid">
          <div className="metric-card">
            <span className="metric-title">TOTAL LEARNERS</span>
            <div className="metric-val-row">
              <strong className="metric-number">12,840</strong>
              <span className="metric-trend up">+14.2%</span>
            </div>
            <span className="metric-sub">Across 4 shipped academies</span>
          </div>

          <div className="metric-card">
            <span className="metric-title">COMPLETION RATE</span>
            <div className="metric-val-row">
              <strong className="metric-number">88.4%</strong>
              {/* Radial Progress Ring */}
              <div className="completion-ring-box">
                <svg width="44" height="44" viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r="17" className="ring-bg" />
                  <circle
                    cx="22"
                    cy="22"
                    r="17"
                    className="ring-bar"
                    strokeDasharray={106.8}
                    strokeDashoffset={106.8 * (1 - 0.884)}
                  />
                </svg>
              </div>
            </div>
            <span className="metric-sub">P90 cohort retention</span>
          </div>

          <div className="metric-card chart-card">
            <div className="chart-header">
              <span className="metric-title">WEEKLY ENGAGEMENT</span>
              {hoveredDataPoint && (
                <span className="hover-badge">
                  {hoveredDataPoint.day}: {hoveredDataPoint.value}k active
                </span>
              )}
            </div>

            {/* Live Interactive SVG Graph */}
            <div className="svg-chart-wrapper">
              <svg width="100%" height="80" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d={areaD} fill="url(#chartGradient)" />
                <path d={pathD} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                {points.map((p) => (
                  <circle
                    key={p.day}
                    cx={p.x}
                    cy={p.y}
                    r={hoveredDataPoint?.day === p.day ? 6 : 4}
                    fill="#3b82f6"
                    className="chart-dot"
                    onMouseEnter={() => setHoveredDataPoint({ day: p.day, value: p.value })}
                    onMouseLeave={() => setHoveredDataPoint(null)}
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* Course Directory Section */}
        <section className="course-directory">
          <div className="directory-header">
            <h3>Active Curriculums</h3>

            {/* Filter Tabs */}
            <div className="filter-tabs">
              <button
                type="button"
                className={`tab-btn ${activeTab === 'all' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All ({courseList.length})
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'active' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('active')}
              >
                In Progress
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'completed' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('completed')}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="courses-grid">
            {filteredCourses.map((c) => (
              <div key={c.id} className="course-card">
                <div className="course-top">
                  <span className="category-pill" style={{ color: c.color, borderColor: `${c.color}40` }}>
                    {c.category}
                  </span>
                  <span className={`status-pill ${c.status}`}>
                    {c.status === 'completed' ? '✓ Completed' : `${c.progress}% done`}
                  </span>
                </div>

                <h4 className="course-title">{c.title}</h4>

                <div className="course-progress-track">
                  <div
                    className="course-progress-fill"
                    style={{ width: `${c.progress}%`, backgroundColor: c.color }}
                  />
                </div>

                <div className="course-meta-row">
                  <span>{c.lessons} Lessons</span>
                  <span>{c.students.toLocaleString()} Students</span>
                </div>

                <button
                  type="button"
                  className="resume-course-btn"
                  onClick={() => setToastMessage(`▶ Opened module: ${c.title}`)}
                >
                  {c.status === 'completed' ? 'Review Course ↗' : 'Resume Module →'}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Create Course Modal */}
      {createModalOpen && (
        <div className="course-modal-backdrop" onClick={() => setCreateModalOpen(false)}>
          <div className="course-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Curriculum</h3>
              <button type="button" className="close-btn" onClick={() => setCreateModalOpen(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="modal-form">
              <label>
                <span>Curriculum Title</span>
                <input
                  type="text"
                  required
                  placeholder="e.g. LLM Evaluation & Grounded Prompts"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </label>

              <div className="modal-buttons">
                <button type="button" className="cancel-btn" onClick={() => setCreateModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Publish to Dashboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="course-f-toast" role="status">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
