type Props = {
  label: string
}

export const DateTimeForm = ({ label }: Props) => {
  return (
    <div className="flex flex-col flex-wrap">
      <label className="text-sm" htmlFor="">
        {label}
      </label>
      <div className="flex items-center">
        <input
          className="h-8 w-1/2 rounded-lg p-2 text-gray-800 outline-none"
          type="time"
        />
        <span className="mx-2 text-lg">~</span>
        <input
          className="h-8 w-1/2 rounded-lg p-2 text-gray-800 outline-none"
          type="time"
        />
      </div>
    </div>
  )
}
