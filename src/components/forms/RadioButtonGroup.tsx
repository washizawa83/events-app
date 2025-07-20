type Props = {
  label: string
  name: string
  items: {
    label: string
    value: string
  }[]
  errorMessage?: string[]
}

export const RadioButtonGroup = ({
  label,
  name,
  items,
  errorMessage,
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
              className="scale-125 accent-accent"
            />
            <label htmlFor={item.value}>{item.label}</label>
          </div>
        ))}
      </fieldset>
      <div className="text-sm text-red-500">{errorMessage}</div>
    </div>
  )
}
