'use client'

import { useRef, useState } from 'react'
import Cropper, { type Area } from 'react-easy-crop'
import { X, Upload, Trash2, ZoomIn } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Props = {
  open: boolean
  onClose: () => void
  photo: string
  onSave: (dataUrl: string) => void
  onRemove: () => void
}

/* Upload + crop + remove modal for the resume photo. Crops client-side via
 * a hidden canvas (react-easy-crop only reports the crop rectangle, it
 * doesn't rasterize) and hands back a JPEG data-URL, same shape data.photo
 * already expects. */
export function PhotoEditor({ open, onClose, photo, onSave, onRemove }: Props) {
  const [rawImage, setRawImage] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [saving, setSaving] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  if (!open) return null

  const image = rawImage ?? (photo || null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setRawImage(String(reader.result))
      setCrop({ x: 0, y: 0 })
      setZoom(1)
      setCroppedAreaPixels(null)
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleClose = () => {
    setRawImage(null)
    onClose()
  }

  const handleSave = async () => {
    if (!image) return
    setSaving(true)
    try {
      const cropped = croppedAreaPixels ? await getCroppedImage(image, croppedAreaPixels) : image
      onSave(cropped)
      handleClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
      onClick={handleClose}
      role="dialog"
      aria-label="Edit photo"
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-border bg-popover p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold">Photo</h3>
          <Button variant="ghost" size="icon" onClick={handleClose} aria-label="Close">
            <X className="size-4" />
          </Button>
        </div>

        {image ? (
          <div className="relative h-64 w-full overflow-hidden rounded-xl bg-black">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_, areaPixels) => setCroppedAreaPixels(areaPixels)}
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex h-64 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <Upload className="size-6" />
            <span className="text-sm">Upload a photo</span>
          </button>
        )}

        {image && (
          <div className="mt-4 flex items-center gap-2">
            <ZoomIn className="size-4 shrink-0 text-muted-foreground" />
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-primary"
              aria-label="Zoom"
            />
          </div>
        )}

        <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={handleFile} />

        <div className="mt-5 flex items-center justify-between gap-2">
          <Button variant="outline" onClick={() => fileRef.current?.click()}>
            {image ? 'Replace' : 'Choose file'}
          </Button>
          <div className="flex items-center gap-2">
            {photo && (
              <Button
                variant="ghost"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => {
                  onRemove()
                  handleClose()
                }}
              >
                <Trash2 className="size-4" />
                Remove
              </Button>
            )}
            <Button onClick={handleSave} disabled={!image || saving}>
              {saving ? 'Saving…' : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function getCroppedImage(src: string, area: Area): Promise<string> {
  return loadImage(src).then((img) => {
    const canvas = document.createElement('canvas')
    canvas.width = area.width
    canvas.height = area.height
    const ctx = canvas.getContext('2d')
    if (!ctx) return src
    ctx.drawImage(img, area.x, area.y, area.width, area.height, 0, 0, area.width, area.height)
    return canvas.toDataURL('image/jpeg', 0.92)
  })
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener('load', () => resolve(img))
    img.addEventListener('error', reject)
    img.src = src
  })
}
