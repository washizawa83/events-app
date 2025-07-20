import { IconContext } from 'react-icons'
import { IoCloudUploadOutline } from 'react-icons/io5'

export const FileInputField = () => {
  return (
    <div>
      <label className="text-sm text-gray-300">画像（複数選択可）</label>
      <div className="flex h-32 w-full flex-col items-center justify-center rounded-md border border-dotted">
        <div className="mb-2 flex flex-col items-center justify-center gap-2">
          <IconContext.Provider value={{ size: '3rem' }}>
            <IoCloudUploadOutline />
          </IconContext.Provider>
          <p className="text-sm text-gray-300">
            ドラッグ&ドロップで画像をアップロード
          </p>
        </div>
        <input type="file" multiple accept="image/*" className="w-48 text-xs" />
      </div>
    </div>
  )
}
