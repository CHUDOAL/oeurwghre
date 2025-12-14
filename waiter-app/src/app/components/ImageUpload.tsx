'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Upload, X } from 'lucide-react'

type ImageUploadProps = {
  itemId: string
  currentImageUrl?: string
  onUploadComplete: (url: string) => void
}

export default function ImageUpload({ itemId, currentImageUrl, onUploadComplete }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      setError(null)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${itemId}-${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('menu-images')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage.from('menu-images').getPublicUrl(filePath)
      
      // Update the database record
      const { error: dbError } = await supabase
        .from('menu_items')
        .update({ image_url: data.publicUrl })
        .eq('id', itemId)

      if (dbError) throw dbError

      onUploadComplete(data.publicUrl)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="mt-2">
      <label className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100">
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <Upload className="mb-2 h-6 w-6 text-gray-500" />
          <p className="text-xs text-gray-500">
            {uploading ? 'Uploading...' : 'Click to upload photo'}
          </p>
        </div>
        <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
      </label>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}

