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

    // Forward to FormSubmit to deliver the message directly to dhananjayy6397@gmail.com
    const response = await fetch('https://formsubmit.co/ajax/dhananjayy6397@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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

    // FormSubmit returns success: "true" (or true)
    if (response.ok && (data.success === 'true' || data.success === true || data.message)) {
      return NextResponse.json({ success: true, message: 'Message sent successfully.' })
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
