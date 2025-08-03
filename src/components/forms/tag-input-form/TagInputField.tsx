import { Tag } from '@/components/forms/tag-input-form/Tag'
import { useRef, useState } from 'react'

const MAX_TAGS = 10

type Props = {
  errorMessage?: string[]
}

export const TagInputField = ({ errorMessage }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [tags, setTags] = useState<string[]>([])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return
    if (e.key === 'Enter') {
      if (!inputRef.current?.value) return

      setTags([...tags, inputRef.current.value])
      inputRef.current!.value = ''
    }
  }

  const removeTag = (index: number) => {
    setTags((currentTags) => currentTags.filter((_, i) => i !== index))
  }

  return (
    <div>
      <label className="text-sm text-gray-300">
        タグ（{MAX_TAGS}個まで入力可能）
      </label>
      {/* Hidden input for form submission */}
      <input type="hidden" name="tags" value={JSON.stringify(tags)} />
      <div className="mb-2 w-full items-center overflow-hidden rounded-md focus-within:outline focus-within:outline-2 focus-within:outline-accent">
        <input
          ref={inputRef}
          type="text"
          className={`h-8 w-full grow px-2 text-black outline-none ${tags.length >= MAX_TAGS ? 'bg-disabled' : 'bg-white'}`}
          placeholder="花火大会"
          onKeyDown={handleKeyDown}
          disabled={tags.length >= MAX_TAGS}
        />
      </div>
      <div
        className={`flex items-center justify-end text-sm ${tags.length > MAX_TAGS ? 'text-red-500' : 'text-gray-300'}`}
      >
        <span>{tags.length}</span>
        <span>/</span>
        <span>{MAX_TAGS}</span>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        {tags.map((tag, index) => (
          <Tag key={index} name={tag} index={index} removeTag={removeTag} />
        ))}
      </div>
      {errorMessage && errorMessage.length > 0 && (
        <div className="mt-1 text-sm text-red-500">{errorMessage[0]}</div>
      )}
    </div>
  )
}
