import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    const { image, filename } = await req.json()

    if (!image || !filename) {
      return NextResponse.json({ error: 'Missing image or filename' }, { status: 400 })
    }

    // Remove header data:image/png;base64,
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')

    const filePath = path.join(process.cwd(), 'public/menu-images', filename)
    
    fs.writeFileSync(filePath, buffer)

    return NextResponse.json({ success: true, path: `/menu-images/${filename}` })
  } catch (error) {
    console.error('Save error:', error)
    return NextResponse.json({ error: 'Failed to save image' }, { status: 500 })
  }
}

