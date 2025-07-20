type Props = {
  label?: string
  name: string
  errorMessage?: string[]
}

export const DateTimeForm = ({ label, name, errorMessage }: Props) => {
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
        name={name}
      />
      <div className="text-sm text-red-500">{errorMessage}</div>
    </div>
  )
}
