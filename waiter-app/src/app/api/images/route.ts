import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const imagesDir = path.join(process.cwd(), 'public/menu-images')
  
  try {
    const files = fs.readdirSync(imagesDir)
    const images = files.filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
    return NextResponse.json(images)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to list images' }, { status: 500 })
  }
}



