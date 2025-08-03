import { TextField } from './TextField'

type Props = {
  label: string
}

export const TextForm = ({ label }: Props) => {
  return (
    <div className="flex flex-col flex-wrap">
      <label className="text-sm" htmlFor={label}>
        {label}
      </label>
      <TextField />
    </div>
  )
}
