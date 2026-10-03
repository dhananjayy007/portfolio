import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please provide your name, email, and message.' },
        { status: 400 }
      )
    }

    const clientOrigin = req.headers.get('origin') || 'https://dhananjayyy.vercel.app'
    const clientReferer = req.headers.get('referer') || 'https://dhananjayyy.vercel.app/'

    // Forward to FormSubmit with browser User-Agent so Cloudflare does not block serverless fetch
    const response = await fetch('https://formsubmit.co/ajax/dhananjayy6397@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Origin': clientOrigin.includes('localhost') ? 'https://dhananjayyy.vercel.app' : clientOrigin,
        'Referer': clientReferer.includes('localhost') ? 'https://dhananjayyy.vercel.app/' : clientReferer,
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `Portfolio Message from ${name} (${email})`,
        _captcha: 'false',
        _template: 'table',
      }),
    })

    const text = await response.text()
    let data: Record<string, unknown> = {}
    try {
      data = JSON.parse(text)
    } catch {
      if (text.includes('success') || text.includes('submitted')) {
        return NextResponse.json({ success: true, message: 'Message sent successfully.' })
      }
    }

    // FormSubmit returns success: "true" (or true) when active and delivered
    if (data.success === 'true' || data.success === true) {
      return NextResponse.json({ success: true, message: 'Message sent successfully.' })
    }

    // Check if FormSubmit is requesting domain activation
    const msg = typeof data.message === 'string' ? data.message : ''
    if (msg && msg.toLowerCase().includes('activation')) {
      return NextResponse.json(
        {
          success: false,
          isActivation: true,
          error:
            "Activation needed: FormSubmit sent an activation email to dhananjayy6397@gmail.com. Please click 'Activate Form' in your inbox to enable submissions from https://dhananjayyy.vercel.app/.",
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      { error: msg || 'Failed to dispatch email.' },
      { status: response.status >= 400 ? response.status : 500 }
    )
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Internal server error while sending message.' },
      { status: 500 }
    )
  }
}
