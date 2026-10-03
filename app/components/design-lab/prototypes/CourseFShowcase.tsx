'use client'

import React, { useState } from 'react'

interface CourseItem {
  id: string
  title: string
  category: string
  lessons: number
  progress: number
  status: 'active' | 'completed'
  color: string
}

const INITIAL_COURSES: CourseItem[] = [
  {
    id: 'c1',
    title: 'Multimodal AI Product Architecture',
    category: 'Product & AI',
    lessons: 18,
    progress: 78,
    status: 'active',
    color: '#6366f1',
  },
  {
    id: 'c2',
    title: '0→1 Customer Discovery & Validation',
    category: 'Startup Execution',
    lessons: 12,
    progress: 100,
    status: 'completed',
    color: '#10b981',
  },
  {
    id: 'c3',
    title: 'Figma to Code: Design Systems at Scale',
    category: 'UX Engineering',
    lessons: 24,
    progress: 45,
    status: 'active',
    color: '#8b5cf6',
  },
]

export default function CourseFShowcase() {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all')
  const [activeNav, setActiveNav] = useState('Overview')
  const [hoveredPoint, setHoveredPoint] = useState<{ day: string; value: number; x: number; y: number } | null>(null)
  const [courses, setCourses] = useState<CourseItem[]>(INITIAL_COURSES)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const weeklyData = [
    { day: 'Mon', value: 2.4, x: 20, y: 70 },
    { day: 'Tue', value: 3.8, x: 75, y: 48 },
    { day: 'Wed', value: 3.1, x: 130, y: 58 },
    { day: 'Thu', value: 5.2, x: 185, y: 25 },
    { day: 'Fri', value: 4.6, x: 240, y: 35 },
    { day: 'Sat', value: 6.0, x: 295, y: 15 },
    { day: 'Sun', value: 5.5, x: 350, y: 22 },
  ]

  const filteredCourses = courses.filter((c) => {
    if (activeTab === 'all') return true
    return c.status === activeTab
  })

  const toggleCourseStatus = (id: string) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === 'active' ? 'completed' : 'active'
          const nextProgress = nextStatus === 'completed' ? 100 : 50
          return { ...c, status: nextStatus, progress: nextProgress }
        }
        return c
      })
    )
    setToastMessage('✓ Course progress updated!')
    setTimeout(() => setToastMessage(null), 2200)
  }

  return (
    <div className="course-f-app">
      {/* Dark Sidebar matching Figma */}
      <aside className="course-f-sidebar">
        <div className="sidebar-brand">
          <div className="brand-gem-icon">✦</div>
          <span className="brand-title">Course-F</span>
        </div>

        <nav className="sidebar-nav">
          {['Overview', 'Courses', 'Analytics', 'Schedule', 'Settings'].map((item) => (
            <button
              key={item}
              type="button"
              className={`sidebar-nav-item ${activeNav === item ? 'is-active' : ''}`}
              onClick={() => setActiveNav(item)}
            >
              <span className="nav-bullet" />
              <span>{item}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-user-card">
          <div className="user-avatar-circle">DC</div>
          <div className="user-details">
            <strong>Dhananjay C.</strong>
            <small>Pro Learner</small>
          </div>
        </div>
      </aside>

      {/* Main SaaS Dashboard Surface */}
      <main className="course-f-main">
        {/* Top Search & Profile Bar */}
        <header className="course-f-header">
          <div className="header-search-wrap">
            <span className="search-glyph">🔍</span>
            <input
              type="text"
              placeholder="Search courses, modules, case studies..."
              className="header-search-input"
            />
          </div>

          <div className="header-actions">
            <span className="notification-bell">🔔<i className="badge-dot" /></span>
            <span className="header-status-pill">Active Session</span>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="course-f-content">
          {/* Welcome Banner with 3D Illustration */}
          <div className="welcome-banner-card">
            <div className="banner-copy">
              <span className="banner-tag">SPRING SEMESTER</span>
              <h2>Welcome back, Dhananjay!</h2>
              <p>
                You&apos;ve completed 78% of your weekly learning goals. Complete 1 more module to maintain your 14-day streak.
              </p>
            </div>
            <div className="banner-visual-box">
              <img
                src="/images/designs/course_f_hero_illustration.jpg"
                alt="3D Dashboard Illustration"
                className="banner-illustration-img"
              />
            </div>
          </div>

          {/* Metrics & Analytics Row */}
          <div className="dashboard-metrics-row">
            {/* SVG Weekly Activity Chart */}
            <div className="metric-card chart-card">
              <div className="card-header-flex">
                <div>
                  <h3>Learning Velocity</h3>
                  <small>Weekly Hours Spent</small>
                </div>
                <span className="trend-green-pill">+18.4% vs last week</span>
              </div>

              <div className="svg-chart-container">
                <svg viewBox="0 0 380 90" className="activity-spline-svg">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Area fill */}
                  <path
                    d="M 20 70 C 50 55, 60 50, 75 48 C 95 45, 110 60, 130 58 C 150 55, 165 30, 185 25 C 205 20, 220 40, 240 35 C 260 30, 275 18, 295 15 C 315 12, 330 25, 350 22 L 350 85 L 20 85 Z"
                    fill="url(#chartGradient)"
                  />

                  {/* Line path */}
                  <path
                    d="M 20 70 C 50 55, 60 50, 75 48 C 95 45, 110 60, 130 58 C 150 55, 165 30, 185 25 C 205 20, 220 40, 240 35 C 260 30, 275 18, 295 15 C 315 12, 330 25, 350 22"
                    fill="none"
                    stroke="#6366f1"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Interactive Nodes */}
                  {weeklyData.map((d) => (
                    <circle
                      key={d.day}
                      cx={d.x}
                      cy={d.y}
                      r={hoveredPoint?.day === d.day ? 6 : 4}
                      fill="#ffffff"
                      stroke="#6366f1"
                      strokeWidth="2.5"
                      style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={() => setHoveredPoint(d)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  ))}
                </svg>

                {/* Hover Tooltip */}
                {hoveredPoint && (
                  <div
                    className="chart-hover-tooltip"
                    style={{ left: `${(hoveredPoint.x / 380) * 100}%` }}
                  >
                    <span>{hoveredPoint.day}: {hoveredPoint.value} hrs</span>
                  </div>
                )}
              </div>
            </div>

            {/* Radial Completion Gauge Card */}
            <div className="metric-card radial-card">
              <div className="radial-lockup">
                <svg viewBox="0 0 100 100" className="radial-svg">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset="55.2"
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                  <text
                    x="50"
                    y="55"
                    textAnchor="middle"
                    className="radial-percent-text"
                  >
                    78%
                  </text>
                </svg>
                <div className="radial-text-box">
                  <strong>Course Mastery</strong>
                  <small>4 of 5 modules completed</small>
                </div>
              </div>
            </div>
          </div>

          {/* Courses List Section */}
          <div className="course-roster-section">
            <div className="roster-header">
              <h3>Enrolled Curriculum</h3>
              <div className="filter-pill-group">
                {(['all', 'active', 'completed'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`filter-btn ${activeTab === tab ? 'is-active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="course-cards-stack">
              {filteredCourses.map((c) => (
                <div key={c.id} className="course-item-row">
                  <div className="course-status-indicator" style={{ backgroundColor: c.color }} />
                  <div className="course-title-col">
                    <span className="course-cat-tag">{c.category}</span>
                    <h4>{c.title}</h4>
                  </div>
                  <div className="course-progress-col">
                    <div className="progress-track-bar">
                      <div
                        className="progress-fill-bar"
                        style={{
                          width: `${c.progress}%`,
                          backgroundColor: c.status === 'completed' ? '#10b981' : '#6366f1',
                        }}
                      />
                    </div>
                    <small>{c.progress}% · {c.lessons} Lessons</small>
                  </div>
                  <button
                    type="button"
                    className="course-action-btn"
                    onClick={() => toggleCourseStatus(c.id)}
                  >
                    {c.status === 'completed' ? '✓ Completed' : 'Continue →'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {toastMessage && (
          <div className="course-f-toast">
            <span>{toastMessage}</span>
          </div>
        )}
      </main>
    </div>
  )
}
