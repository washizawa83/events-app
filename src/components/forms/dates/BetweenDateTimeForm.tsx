import { DateTimeForm } from '@/components/forms/dates/DateTimeForm'

type Props = {
  label: string
}

export const BetweenDateTimeForm = ({ label }: Props) => {
  return (
    <div className="flex flex-col flex-wrap">
      <label className="text-sm" htmlFor="">
        {label}
      </label>
      <div className="flex items-center">
        <DateTimeForm name="startDateTime" />
        <span className="mx-2 text-lg">~</span>
        <DateTimeForm name="endDateTime" />
      </div>
    </div>
  )
}
