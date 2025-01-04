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
      <div className="flex items-center justify-center min-w-24 h-6 bg-accent px-4 rounded-l-xl">
        <p className="text-sm">{label}</p>
      </div>
      <div className="min-w-11 h-6 bg-secondary rounded-r-xl">
        <p>{convertKiloForCount(count)}</p>
      </div>
    </div>
  )
}
