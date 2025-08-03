import { deleteImage, extractS3KeyFromUrl, uploadImage } from '@/lib/aws/s3'
import { useState } from 'react'
import { IconContext } from 'react-icons'
import { IoCloseOutline, IoCloudUploadOutline } from 'react-icons/io5'

const MAX_UPLOAD_COUNT = 5

export const FileInputField = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const file = files?.[0]
    try {
      if (file) {
        setIsUploading(true)
        const uploadUrl = await uploadImage(file, file.name)
        setImageUrls([...imageUrls, uploadUrl])
        setIsUploading(false)
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      setIsUploading(false)
    }
  }

  const handleDeleteImage = async (index: number) => {
    const imageUrl = imageUrls[index]

    try {
      const key = extractS3KeyFromUrl(imageUrl)
      await deleteImage(key)
      setImageUrls(imageUrls.filter((_, i) => i !== index))
    } catch (error) {
      console.error('画像の削除に失敗しました:', error)
      // エラーハンドリング - ユーザーに通知
      alert('画像の削除に失敗しました')
    }
  }

  return (
    <div>
      <label className="text-sm text-gray-300">
        画像（{MAX_UPLOAD_COUNT}枚まで追加可能）
      </label>
      <div className="flex h-32 w-full flex-col items-center justify-center rounded-md border border-dotted">
        <div className="mb-2 flex flex-col items-center justify-center gap-2">
          <IconContext.Provider value={{ size: '3rem' }}>
            <IoCloudUploadOutline />
          </IconContext.Provider>
          <p className="text-sm text-gray-300">
            ドラッグ&ドロップで画像をアップロード
          </p>
        </div>
        <input
          type="hidden"
          name="imageUrls"
          value={JSON.stringify(imageUrls)}
        />
        <input
          type="file"
          multiple
          accept="image/*,.svg"
          className="w-48 text-xs"
          onChange={handleUploadImage}
          disabled={isUploading || imageUrls.length >= MAX_UPLOAD_COUNT}
        />
      </div>
      {/* ローディングアニメーション */}
      {isUploading && (
        <div className="mt-3 flex items-center justify-center">
          <div className="flex items-center gap-2">
            {/* スピナーアニメーション */}
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
            <span className="text-sm text-blue-500">アップロード中...</span>
          </div>
        </div>
      )}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {imageUrls.map((imageUrl, index) => (
          <div
            key={imageUrl}
            className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-md bg-neutral-900"
          >
            <button
              className="absolute right-0 top-0 rounded-full bg-neutral-500/[.5]"
              onClick={() => handleDeleteImage(index)}
              type="button"
            >
              <IconContext.Provider value={{ size: '1.2rem' }}>
                <IoCloseOutline />
              </IconContext.Provider>
            </button>
            <img className="object-cover" src={imageUrl} alt="uploaded" />
          </div>
        ))}
      </div>
    </div>
  )
}
