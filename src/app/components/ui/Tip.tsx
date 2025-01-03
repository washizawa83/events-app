type Props = {
  label: string
}

export const Tip = ({ label }: Props) => {
  return (
    <div className="min-w-20 px-4 bg-accent rounded-xl text-center">
      <p className="text-sm text-white">{label}</p>
    </div>
  )
}
