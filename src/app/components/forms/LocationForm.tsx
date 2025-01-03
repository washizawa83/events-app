import { SelectBox } from './SelectBox'

type Props = {
  label: string
}

export const LocationForm = ({ label }: Props) => {
  return (
    <div className="flex flex-wrap flex-col w-full">
      <label className="text-sm" htmlFor={label}>
        {label}
      </label>
      <div className="flex items-center">
        <div className="mr-2 w-1/2">
          <SelectBox options={[{ label: '北海道', value: '01' }]} />
        </div>
        <div className="w-1/2">
          <SelectBox options={[{ label: '札幌', value: '0101' }]} />
        </div>
      </div>
    </div>
  )
}
