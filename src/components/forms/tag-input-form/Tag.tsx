import { XMarkIcon } from '@heroicons/react/20/solid'

export const Tag = ({
  name,
  index,
  removeTag,
}: {
  name: string
  index: number
  removeTag: (index: number) => void
}) => {
  return (
    <div className="flex items-center gap-2 rounded-md border border-accent bg-accent/[.6] px-2 py-1">
      <span>{name}</span>
      <button type="button" onClick={() => removeTag(index)}>
        <XMarkIcon className="h-4 w-4" />
      </button>
    </div>
  )
}
