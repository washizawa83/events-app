'use client'

import { useState } from 'react'

type Props = {
  label: string
  buttonLabels: string[]
  selected: number
}

export const SelectButtons = ({ label, buttonLabels, selected }: Props) => {
  const [selectedButton, setSelectedButton] = useState(selected)
  return (
    <div className="flex flex-wrap flex-col">
      <label className="text-sm" htmlFor="">
        {label}
      </label>
      <div>
        {buttonLabels.map((label, index) => (
          <button
            key={index}
            className={`min-w-24 h-8 px-2 first-of-type:rounded-l-lg last-of-type:rounded-r-lg ${selectedButton === index ? 'bg-valiant border border-accent' : 'bg-secondary'}`}
            onClick={() => setSelectedButton(index)}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
