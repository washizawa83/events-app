type Props = {
  text: string
}

export const TextHighLight = ({ text }: Props) => {
  return (
    <span className="rounded-md bg-indigo-500/[.8] p-1">
      <p>{text}</p>
    </span>
  )
}
