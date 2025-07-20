import { SelectBox } from './SelectBox'

type Props = {
  label: string
  errorMessage?: {
    prefecture?: string[]
    city?: string[]
  }
}

export const LocationForm = ({ label, errorMessage }: Props) => {
  return (
    <div className="flex w-full flex-col flex-wrap">
      <label className="text-sm" htmlFor={label}>
        {label}
      </label>
      <div className="flex items-center">
        <div className="mr-2 w-1/2">
          <SelectBox
            options={[{ label: '北海道', value: '01' }]}
            name="prefecture"
          />
        </div>
        <div className="w-1/2">
          <SelectBox options={[{ label: '札幌', value: '0101' }]} name="city" />
        </div>
      </div>
    </div>
  )
}
