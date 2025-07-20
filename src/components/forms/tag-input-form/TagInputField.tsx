import { Tag } from '@/components/forms/tag-input-form/Tag'
import { useRef, useState } from 'react'

export const TagInputField = () => {
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
      <label className="text-sm text-gray-300">タグ（複数入力可）</label>
      <div className="mb-2 w-full items-center overflow-hidden rounded-md focus-within:outline focus-within:outline-2 focus-within:outline-accent">
        <input
          ref={inputRef}
          type="text"
          className="h-8 w-full grow bg-white px-2 text-black outline-none"
          placeholder="花火大会"
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        {tags.map((tag, index) => (
          <Tag key={index} name={tag} index={index} removeTag={removeTag} />
        ))}
      </div>
    </div>
  )
}
