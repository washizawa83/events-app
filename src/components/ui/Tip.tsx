type Props = {
  label: string
}

export const Tip = ({ label }: Props) => {
  return (
    <div className="min-w-20 rounded-xl bg-accent px-4 text-center">
      <p className="text-sm text-white">{label}</p>
    </div>
  )
}
