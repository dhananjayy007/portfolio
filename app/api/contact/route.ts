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

    // Forward to FormSubmit to deliver the message directly to dhananjayy6397@gmail.com
    const response = await fetch('https://formsubmit.co/ajax/dhananjayy6397@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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

    const data = await response.json()

    // FormSubmit returns success: "true" (or true) when active and delivered
    if (data.success === 'true' || data.success === true) {
      return NextResponse.json({ success: true, message: 'Message sent successfully.' })
    }

    // Check if FormSubmit is requesting domain activation
    if (data.message && data.message.toLowerCase().includes('activation')) {
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
      { error: data.message || 'Failed to dispatch email.' },
      { status: 500 }
    )
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { error: 'Internal server error while sending message.' },
      { status: 500 }
    )
  }
}
