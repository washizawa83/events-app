type Props = {
  label?: string
}

export const DateTimeForm = ({ label }: Props) => {
  return (
    <div className="flex flex-col flex-wrap">
      {label && (
        <label className="text-sm" htmlFor="">
          {label}
        </label>
      )}
      <input
        className="h-8 rounded-lg p-2 text-gray-800 outline-none"
        type="time"
      />
    </div>
  )
}
