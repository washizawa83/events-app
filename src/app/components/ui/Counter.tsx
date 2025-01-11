type Props = {
  label: string
  count: number
}

export const Counter = ({ label, count }: Props) => {
  const convertKiloForCount = (targetCount: number): string => {
    const DivideByThousand = targetCount / 1000
    if (DivideByThousand < 1) return `${targetCount}`

    if (Number.isInteger(DivideByThousand))
      return `${Math.round(DivideByThousand)}k`
    return `${Math.round(DivideByThousand)}k+`
  }

  return (
    <div className="flex items-center text-center">
      <div className="flex h-6 min-w-24 items-center justify-center rounded-l-xl bg-accent px-4">
        <p className="text-sm">{label}</p>
      </div>
      <div className="h-6 min-w-11 rounded-r-xl bg-secondary">
        <p>{convertKiloForCount(count)}</p>
      </div>
    </div>
  )
}
