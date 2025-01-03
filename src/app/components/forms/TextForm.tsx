import { TextField } from './TextField'

type Props = {
  label: string
}

export const TextForm = ({ label }: Props) => {
  return (
    <div className="flex flex-wrap flex-col">
      <label className="text-sm" htmlFor={label}>
        {label}
      </label>
      <TextField />
    </div>
  )
}
