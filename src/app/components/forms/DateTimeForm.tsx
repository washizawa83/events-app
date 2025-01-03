type Props = {
  label: string
}

export const DateTimeForm = ({ label }: Props) => {
  return (
    <div className="flex flex-wrap flex-col">
      <label className="text-sm" htmlFor="">
        {label}
      </label>
      <div className="flex items-center">
        <input
          className="h-8 rounded-lg text-gray-800 p-2 w-1/2 outline-none"
          type="time"
        />
        <span className="mx-2 text-lg">~</span>
        <input
          className="h-8 rounded-lg text-gray-800 p-2 w-1/2 outline-none"
          type="time"
        />
      </div>
    </div>
  )
}
