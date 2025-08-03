type Props = {
  label: string
  name: string
  items: {
    label: string
    value: string
  }[]
  defaultChecked?: string
  errorMessage?: string[]
  handleChange: (value: string) => void
}

export const RadioButtonGroup = ({
  label,
  name,
  items,
  defaultChecked,
  errorMessage,
  handleChange,
}: Props) => {
  return (
    <div>
      <label className="text-sm">{label}</label>
      <fieldset className="flex flex-wrap gap-4">
        {items.map((item) => (
          <div key={item.value} className="flex items-center gap-1">
            <input
              type="radio"
              id={item.value}
              name={name}
              value={item.value}
              defaultChecked={defaultChecked === item.value}
              className="scale-125 accent-accent"
              onChange={(e) => handleChange(e.target.value)}
            />
            <label htmlFor={item.value}>{item.label}</label>
          </div>
        ))}
      </fieldset>
      <div className="text-sm text-red-500">{errorMessage}</div>
    </div>
  )
}
