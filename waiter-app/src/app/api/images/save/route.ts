import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const { image, filename } = await req.json()

    if (!image || !filename) {
      return NextResponse.json({ error: 'Missing image or filename' }, { status: 400 })
    }

    // Remove header data:image/png;base64,
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')

    // Upload to Supabase Storage
    const { data, error } = await supabase
      .storage
      .from('menu-images')
      .upload(filename, buffer, {
        contentType: 'image/jpeg',
        upsert: true
      })

    if (error) {
      console.error('Supabase storage upload error:', error)
      return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
    }

    // Get Public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('menu-images')
      .getPublicUrl(filename)

    return NextResponse.json({ success: true, path: publicUrl })
  } catch (error) {
    console.error('Save error:', error)
    return NextResponse.json({ error: 'Failed to save image' }, { status: 500 })
  }
}
