'use client'

import Link from 'next/link'

type Props = {
  label: string
  buttonLabels: string[]
  selected: number
  hrefs: string[]
}

export const SelectLinkButtons = ({
  label,
  buttonLabels,
  selected,
  hrefs,
}: Props) => {
  return (
    <div className="flex flex-col flex-wrap">
      <label className="text-sm" htmlFor="">
        {label}
      </label>
      <div className="flex">
        {buttonLabels.map((label, index) => (
          <Link
            key={index}
            replace
            href={hrefs[index]}
            className={`${selected === index ? 'border bg-valiantDark' : 'bg-secondary'} overflow-hidden border-accent first-of-type:rounded-l-lg last-of-type:rounded-r-lg`}
          >
            <button className={`h-8 min-w-24 px-2`}>
              <span className="text-sm">{label}</span>
            </button>
          </Link>
        ))}
      </div>
    </div>
  )
}
